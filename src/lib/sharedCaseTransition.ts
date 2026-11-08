import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

/**
 * Home page project card to case page, as one continuous scene instead of a
 * page change: the card's text slides up out of its masks, the rest of the page
 * fades to the page colour, and the clicked image grows (a transform, so it stays
 * on the compositor) until it is exactly the case page's hero image. The case
 * page's text then slides up into place, the same line-by-line rise the home page
 * uses. PageTransition decides when to use this and does the routing (`loadPage`).
 */

// Leaving: the card settles back to rest (its hover is switched off) before the
// image is lifted out, then the page fades under it.
const SETTLE = 0.4
const EXIT_TEXT_DURATION = 0.65
const VEIL_DURATION = 0.45
// The image grows to the hero's place; the page appears under it as it lands.
const GROW_DURATION = 1.1
const GROW_EASE = 'power3.inOut'
const SWAP_AT = 0.4
const VEIL_OUT_AT = 0.85
// The case page's text rising in.
const ENTER_EASE = 'power3.out'
// A mask clips at its line box, which cuts off descenders (g, y, comma); this
// much room is added below (and a little above) and taken back from the margin,
// so the layout does not change.
const MASK_ROOM_BOTTOM = '0.2em'
const MASK_ROOM_TOP = '0.1em'

/** Gives split-text masks room for descenders without moving anything. */
function roomInMasks(masks: Element[]) {
  gsap.set(masks, {
    paddingTop: MASK_ROOM_TOP,
    marginTop: `-${MASK_ROOM_TOP}`,
    paddingBottom: MASK_ROOM_BOTTOM,
    marginBottom: `-${MASK_ROOM_BOTTOM}`,
  })
}

/** True if the card has an image to carry over to the case page. */
export function canShareCard(card: HTMLElement) {
  return Boolean(card.querySelector<HTMLImageElement>('.case-card-image')?.currentSrc)
}

function nextFrames(count: number) {
  return new Promise<void>((resolve) => {
    const step = (left: number) => (left <= 0 ? resolve() : requestAnimationFrame(() => step(left - 1)))
    step(count)
  })
}

function coverImage(src: string | null) {
  const image = document.createElement('img')
  if (src) image.src = src
  image.alt = ''
  image.draggable = false
  Object.assign(image.style, {
    position: 'absolute',
    inset: '0',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  })
  return image
}

export async function runSharedCaseTransition(
  card: HTMLElement,
  veil: HTMLElement,
  /** Navigates to the case page and resolves with its <main> once it is ready, scrolled to the top. */
  loadPage: () => Promise<Element | null>,
) {
  const root = document.documentElement
  const media = card.querySelector<HTMLElement>('.case-card-media')!
  const cardImage = card.querySelector<HTMLImageElement>('.case-card-image')!
  const texts = [...card.querySelectorAll<HTMLElement>('.case-card-client, .case-card-keywords')]

  // The case page's hero is hidden from the moment it mounts (see index.css).
  root.classList.add('is-shared-transition', 'is-shared-image')
  card.classList.add('is-transition-source')

  const from = media.getBoundingClientRect()
  const ghost = document.createElement('div')
  const topImage = coverImage(null)
  topImage.style.opacity = '0'
  ghost.append(coverImage(cardImage.currentSrc), topImage)
  Object.assign(ghost.style, {
    position: 'fixed',
    left: '0',
    top: '0',
    zIndex: '45',
    overflow: 'hidden',
    pointerEvents: 'none',
    transformOrigin: '0 0',
    willChange: 'transform',
  })
  ghost.setAttribute('aria-hidden', 'true')
  const fromRadius = parseFloat(getComputedStyle(media).borderTopLeftRadius) || 0
  gsap.set(ghost, { width: from.width, height: from.height, x: from.left, y: from.top, borderRadius: fromRadius })

  const split = SplitText.create(texts, { type: 'lines', mask: 'lines' })
  roomInMasks(split.masks)
  let nameSplit: SplitText | null = null
  let metaValues: Element[] = []
  let metaLabels: Element[] = []
  let metaItems: HTMLElement[] = []

  try {
    // 1. Leave: the text slides up out of the card, the card settles to rest,
    //    then the image is lifted out into the ghost and the page fades under it.
    await new Promise<void>((resolve) => {
      const leave = gsap.timeline({ onComplete: resolve })
      leave.to(split.lines, { yPercent: -125, duration: EXIT_TEXT_DURATION, ease: 'power3.in', stagger: 0.05 }, 0)
      leave.call(() => document.body.append(ghost), [], SETTLE)
      leave.to(veil, { autoAlpha: 1, duration: VEIL_DURATION, ease: 'power2.inOut' }, SETTLE)
    })

    // 2. Go to the case page (hidden under the veil) and measure where its image is.
    const main = await loadPage()
    const hero = main?.querySelector<HTMLElement>('.case-detail-hero-image') ?? null
    const heroImage = hero?.querySelector<HTMLImageElement>('img') ?? null
    if (!main || !hero || !heroImage) {
      await gsap.to([veil, ghost], { autoAlpha: 0, duration: 0.5, ease: 'power2.out' })
      return
    }
    await document.fonts.ready
    await heroImage.decode().catch(() => {})
    const to = hero.getBoundingClientRect()
    const radius = parseFloat(getComputedStyle(hero).borderTopLeftRadius) || 0
    topImage.src = heroImage.currentSrc || heroImage.src

    // The case page's text waits in its masks, ready to rise.
    const name = main.querySelector<HTMLElement>('.case-detail-hero-name')
    if (name) {
      nameSplit = SplitText.create(name, { type: 'lines', mask: 'lines' })
      roomInMasks(nameSplit.masks)
      gsap.set(nameSplit.lines, { yPercent: 125 })
    }
    metaItems = [...main.querySelectorAll<HTMLElement>('.case-detail-hero-meta-item')]
    // The labels (Type, Rolle, ...) fade in where they stand; the values rise out of a mask.
    metaLabels = metaItems.flatMap((item) => [...item.querySelectorAll('.case-detail-hero-meta-label')])
    metaValues = metaItems.flatMap((item) => [...item.querySelectorAll('.case-detail-hero-meta-value')])
    gsap.set(metaLabels, { opacity: 0 })
    gsap.set(metaItems, { overflow: 'hidden', paddingBottom: MASK_ROOM_BOTTOM, marginBottom: `-${MASK_ROOM_BOTTOM}` })
    gsap.set(metaValues, { yPercent: 120 })
    root.classList.remove('is-shared-transition')

    // 3. Grow: the same picture at the hero's size, scaled down to the card's
    //    place, then scaled up and moved into the hero's. Both are 16:9, so the
    //    scale is uniform and the crop never changes.
    // Scaled down, so the corner is set in the ghost's own (larger) size to match the card's.
    const startScale = from.width / to.width
    gsap.set(ghost, { width: to.width, height: to.height, scale: startScale, x: from.left, y: from.top, borderRadius: fromRadius / startScale })
    await new Promise<void>((resolve) => {
      const grow = gsap.timeline({ onComplete: resolve, defaults: { ease: GROW_EASE } })
      grow.to(ghost, { x: to.left, y: to.top, scale: 1, borderRadius: radius, duration: GROW_DURATION }, 0)
      grow.to(topImage, { opacity: 1, duration: 0.5, ease: 'power1.inOut' }, SWAP_AT)
      grow.to(veil, { autoAlpha: 0, duration: 0.5, ease: 'power2.out' }, VEIL_OUT_AT)
    })

    // 4. Hand over: the real image takes the ghost's place, then the text rises.
    root.classList.remove('is-shared-image')
    await nextFrames(2)
    ghost.remove()

    await new Promise<void>((resolve) => {
      const enter = gsap.timeline({ onComplete: resolve, defaults: { ease: ENTER_EASE } })
      if (nameSplit) enter.to(nameSplit.lines, { yPercent: 0, duration: 1, stagger: 0.08 }, 0)
      if (metaLabels.length) enter.to(metaLabels, { opacity: 1, duration: 0.7, ease: 'power1.out', stagger: 0.06 }, 0)
      if (metaValues.length) enter.to(metaValues, { yPercent: 0, duration: 0.9, stagger: 0.06 }, 0.15)
    })
  } finally {
    ghost.remove()
    split.revert()
    nameSplit?.revert()
    if (metaValues.length) gsap.set(metaValues, { clearProps: 'transform' })
    if (metaLabels.length) gsap.set(metaLabels, { clearProps: 'opacity' })
    if (metaItems.length) gsap.set(metaItems, { clearProps: 'overflow,paddingBottom,marginBottom' })
    gsap.set(veil, { autoAlpha: 0 })
    root.classList.remove('is-shared-transition', 'is-shared-image')
  }
}
