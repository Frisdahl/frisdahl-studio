import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { setTransitionLagSmoothing } from './scroll'

gsap.registerPlugin(SplitText)

/**
 * Home page project card to case page, as one continuous scene instead of a
 * page change: the card's text slides up out of its masks, the rest of the page
 * fades to the page colour, and the clicked image grows (a transform, so it stays
 * on the compositor) until it is exactly the case page's hero image. The case
 * page's text then slides up into place, the same line-by-line rise the home page
 * uses. PageTransition decides when to use this and does the routing (`loadPage`).
 *
 * It works for the home page's project cards and for the "next project" card at
 * the end of a case page (`.case-detail-next`), whose text sits on top of the
 * image under a dark overlay: the text leaves first, then the overlay fades as
 * the image grows.
 */

// Leaving: the card settles back to rest (its hover is switched off) before the
// image is lifted out, then the page fades under it.
const SETTLE = 0.4
// The next-project card: its text sits on the image, so the ghost (which would
// cover it) is only lifted out once the text has mostly left.
const NEXT_SETTLE = 0.5
const NEXT_EXIT_TEXT_DURATION = 0.4
const NEXT_VEIL_DURATION = 0.25
const NEXT_OVERLAY_FADE = 0.8
// The case page's text starts this long before the picture has fully landed (s).
const ENTER_OVERLAP = 0.25
// The card's zoom is gone by NEXT_ZOOM_SETTLE; only then is the real hero picture faded in.
const NEXT_ZOOM_SETTLE = 0.75
const NEXT_SWAP_AT = 0.9
// A project card's parallax (enlarged, drifted picture) is gone by PARALLAX_SETTLE; only then
// is the real hero picture faded in, so the two line up exactly.
const PARALLAX_SETTLE = 0.75
const PARALLAX_SWAP_AT = 0.8
// The longest the transition waits for the case page's hero picture (ms).
const HERO_WAIT = 800
const EXIT_TEXT_DURATION = 0.65
const VEIL_DURATION = 0.45
// The image grows to the hero's place; the page appears under it as it lands.
const GROW_DURATION = 1.1
const GROW_EASE = 'power3.inOut'
// The picture first slides to the hero's place at its own size, then changes size there: it
// never gets taller or shorter while it travels. The size change starts a little before the
// slide has quite stopped, so the two read as one movement.
const SLIDE_DURATION = 0.55
const RESIZE_AT = 0.45
const SWAP_AT = 0.4
const VEIL_OUT_AT = 0.65
// The case page's text rising in.
const ENTER_EASE = 'power3.out'
// The heading goes first; the meta columns (Type, Rolle, ...) start this far into it
// (seconds), all at the same time (a stagger of 0 would be one after another from left to right).
const HEADING_LEAD = 0.45
const COLUMN_STAGGER = 0
// The longer ease-out tail on the values reads as smooth.
const COLUMN_EASE = 'power4.out'
const COLUMN_LABEL_DURATION = 0.9
const COLUMN_VALUE_DURATION = 1.1
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
  return Boolean(card.querySelector<HTMLImageElement>('.case-card-image, .case-detail-next-image')?.currentSrc)
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
    // Each picture gets its own layer, so the ghost's rounded, clipped frame is only a mask
    // over finished textures and nothing is repainted while it grows.
    willChange: 'transform, opacity',
    transform: 'translateZ(0)',
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
  const isNext = card.classList.contains('case-detail-next')
  const media = isNext ? card : card.querySelector<HTMLElement>('.case-card-media')!
  const cardImage = card.querySelector<HTMLImageElement>('.case-card-image, .case-detail-next-image')!
  const texts = [
    ...card.querySelectorAll<HTMLElement>(
      isNext ? '.case-detail-next-label, .case-detail-next-name' : '.case-card-client, .case-card-keywords',
    ),
  ]
  const bar = isNext ? card.querySelector<HTMLElement>('.case-detail-next-bar') : null
  const settle = isNext ? NEXT_SETTLE : SETTLE

  // The case page's hero is hidden from the moment it mounts (see index.css).
  root.classList.add('is-shared-transition', 'is-shared-image')
  if (isNext) root.classList.add('is-shared-next')
  card.classList.add('is-transition-source')

  const from = media.getBoundingClientRect()
  const ghost = document.createElement('div')
  const topImage = coverImage(null)
  topImage.style.opacity = '0'
  const fromImage = coverImage(cardImage.currentSrc)
  let overlay: HTMLDivElement | null = null
  // A home project card's picture sits enlarged and drifts inside its frame (the
  // parallax in CasesSection). The ghost starts in that exact pose, so lifting it
  // out changes nothing on screen, and it settles to the plain picture as it grows.
  // Offsets are percentages of the picture's own box (the frame), so they stay
  // right when the ghost is resized to the hero below; the frame and the hero are
  // both 16:9.
  let parallaxPose = false
  if (!isNext) {
    const pose = new DOMMatrix(getComputedStyle(cardImage).transform)
    const [originX, originY] = getComputedStyle(cardImage).transformOrigin.split(' ').map(parseFloat)
    parallaxPose = Math.abs(pose.a - 1) > 0.001 || Math.abs(pose.e) > 0.01 || Math.abs(pose.f) > 0.01
    if (parallaxPose) {
      gsap.set(fromImage, {
        scale: pose.a,
        xPercent: (pose.e / from.width) * 100,
        yPercent: (pose.f / from.height) * 100,
        transformOrigin: `${(originX / from.width) * 100}% ${(originY / from.height) * 100}%`,
      })
    }
  }
  if (isNext) {
    // Start in the card's own pose: zoomed in by the scroll, under its dark overlay.
    fromImage.style.objectPosition = '50% 5%'
    gsap.set(fromImage, { scale: new DOMMatrix(getComputedStyle(cardImage).transform).a, transformOrigin: '50% 65%' })
    const cardOverlay = card.querySelector<HTMLElement>('.case-detail-next-overlay')
    overlay = document.createElement('div')
    Object.assign(overlay.style, {
      position: 'absolute',
      inset: '0',
      pointerEvents: 'none',
      willChange: 'opacity',
      backgroundColor: cardOverlay ? getComputedStyle(cardOverlay).backgroundColor : 'transparent',
    })
  }
  ghost.append(fromImage, topImage, ...(overlay ? [overlay] : []))
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
    // A slow frame must not make the motion skip ahead (see setTransitionLagSmoothing); undone in `finally`.
    setTransitionLagSmoothing(true)

    // 1. Leave: the text slides up out of the card, the card settles to rest,
    //    then the image is lifted out into the ghost and the page fades under it.
    await new Promise<void>((resolve) => {
      const leave = gsap.timeline({ onComplete: resolve })
      leave.to(split.lines, { yPercent: -125, duration: isNext ? NEXT_EXIT_TEXT_DURATION : EXIT_TEXT_DURATION, ease: isNext ? 'power2.in' : 'power3.in', stagger: isNext ? 0.03 : 0.05 }, 0)
      if (bar) leave.to(bar, { autoAlpha: 0, duration: 0.4, ease: 'power2.out' }, 0)
      leave.call(() => document.body.append(ghost), [], settle)
      leave.to(veil, { autoAlpha: 1, duration: isNext ? NEXT_VEIL_DURATION : VEIL_DURATION, ease: 'power2.inOut' }, settle)
    })

    // The next-project card is the same DOM on the next case's page (one route component), so
    // React rewrites its name when the route changes. Its text must be put back to normal
    // first: reverting the split afterwards would write the old project's name back over it.
    // The page is under the veil, so nothing shows.
    if (isNext) split.revert()

    // 2. Go to the case page (hidden under the veil) and measure where its image is.
    const main = await loadPage()
    const hero = main?.querySelector<HTMLElement>('.case-detail-hero-image') ?? null
    const heroImage = hero?.querySelector<HTMLImageElement>('img') ?? null
    if (!main || !hero || !heroImage) {
      await gsap.to([veil, ghost], { autoAlpha: 0, duration: 0.5, ease: 'power2.out' })
      return
    }
    await document.fonts.ready
    // The page is covered, so a lazy hero would never start loading: load it now, but
    // never hold the transition for long.
    heroImage.loading = 'eager'
    await Promise.race([heroImage.decode().catch(() => {}), new Promise((resolve) => setTimeout(resolve, HERO_WAIT))])
    const to = hero.getBoundingClientRect()
    const radius = parseFloat(getComputedStyle(hero).borderTopLeftRadius) || 0
    topImage.src = heroImage.currentSrc || heroImage.src
    // Decoded before it fades in, so the swap never waits on the picture.
    await Promise.race([topImage.decode().catch(() => {}), new Promise((resolve) => setTimeout(resolve, HERO_WAIT))])

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
    // A card that isn't 16:9 shows only the top part of the picture: the ghost
    // is cut to that and opens up to the full picture as it grows.
    const crop = isNext ? Math.max(0, to.height - from.height / startScale) : 0
    const cropped = crop > 0.5
    gsap.set(ghost, {
      width: to.width,
      height: to.height,
      scale: startScale,
      x: from.left,
      y: from.top,
      borderRadius: fromRadius / startScale,
      clipPath: cropped ? `inset(0px 0px ${crop}px 0px)` : 'none',
    })
    // The text starts a moment before the picture lands, so it doesn't wait for the hand-over.
    let enter: gsap.core.Timeline | null = null
    const entered = new Promise<void>((resolve) => {
      enter = gsap.timeline({ paused: true, onComplete: resolve, defaults: { ease: ENTER_EASE } })
      // The heading rises first; once it is mostly in, the meta row follows, all
      // columns together (each label fades in, each value rises).
      if (nameSplit) enter!.to(nameSplit.lines, { yPercent: 0, duration: 1, stagger: 0.08 }, 0)
      const columnsAt = nameSplit ? HEADING_LEAD : 0
      metaItems.forEach((item, index) => {
        const at = columnsAt + index * COLUMN_STAGGER
        const label = item.querySelector('.case-detail-hero-meta-label')
        const value = item.querySelector('.case-detail-hero-meta-value')
        if (label) enter!.to(label, { opacity: 1, duration: COLUMN_LABEL_DURATION, ease: 'sine.out' }, at)
        if (value) enter!.to(value, { yPercent: 0, duration: COLUMN_VALUE_DURATION, ease: COLUMN_EASE }, at + 0.08)
      })
    })
    // Revealing the case page under the veil is the heaviest frame of the whole transition (style,
    // layout, paint). Let it happen now, so it is not spent inside the grow and cut the start off.
    await nextFrames(2)
    await new Promise<void>((resolve) => {
      const grow = gsap.timeline({ onComplete: resolve, defaults: { ease: GROW_EASE } })
      // 1. Slide: the ghost's top left corner (its transform origin) travels to the hero's, size unchanged.
      grow.to(ghost, { x: to.left, y: to.top, duration: SLIDE_DURATION }, 0)
      // 2. Resize: from that corner out to the hero's width and height.
      grow.to(ghost, { scale: 1, borderRadius: radius, duration: GROW_DURATION - RESIZE_AT }, RESIZE_AT)
      if (cropped) grow.to(ghost, { clipPath: 'inset(0px 0px 0px 0px)', duration: GROW_DURATION - RESIZE_AT }, RESIZE_AT)
      if (isNext) {
        // The zoom settles and the dark overlay lifts, so the hero's picture is plain.
        // Fully settled before the swap below, so the two pictures line up exactly.
        grow.to(fromImage, { scale: 1, duration: NEXT_ZOOM_SETTLE, ease: 'power2.out' }, 0)
        if (overlay) grow.to(overlay, { opacity: 0, duration: NEXT_OVERLAY_FADE, ease: 'power1.inOut' }, 0)
      }
      if (parallaxPose) {
        // The card's enlargement and drift settle, so the plain picture is what the
        // hero's picture replaces.
        grow.to(fromImage, { scale: 1, xPercent: 0, yPercent: 0, duration: PARALLAX_SETTLE, ease: 'power2.out' }, 0)
      }
      const swapAt = isNext ? NEXT_SWAP_AT : parallaxPose ? PARALLAX_SWAP_AT : SWAP_AT
      grow.to(topImage, { opacity: 1, duration: isNext ? 0.15 : parallaxPose ? 0.3 : 0.5, ease: 'power1.inOut' }, swapAt)
      grow.to(veil, { autoAlpha: 0, duration: 0.4, ease: 'power2.out' }, VEIL_OUT_AT)
      grow.call(() => void enter?.play(), [], GROW_DURATION - ENTER_OVERLAP)
    })

    // 4. Hand over: the real image takes the ghost's place, then the text rises.
    root.classList.remove('is-shared-image', 'is-shared-next')
    await nextFrames(2)
    ghost.remove()

    await entered
  } finally {
    setTransitionLagSmoothing(false)
    ghost.remove()
    split.revert()
    nameSplit?.revert()
    if (metaValues.length) gsap.set(metaValues, { clearProps: 'transform' })
    if (metaLabels.length) gsap.set(metaLabels, { clearProps: 'opacity' })
    if (metaItems.length) gsap.set(metaItems, { clearProps: 'overflow,paddingBottom,marginBottom' })
    if (bar) gsap.set(bar, { clearProps: 'opacity,visibility' })
    gsap.set(veil, { autoAlpha: 0 })
    root.classList.remove('is-shared-transition', 'is-shared-image', 'is-shared-next')
  }
}
