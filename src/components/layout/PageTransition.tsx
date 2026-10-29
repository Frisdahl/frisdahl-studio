import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { registerPageTransition } from '../../lib/pageTransition'
import { getSmoothScroll, prefersReducedMotion } from '../../lib/smoothScroll'

gsap.registerPlugin(ScrollTrigger)

// Temporary, while the design is worked out: plays the whole transition this
// many times slower. Set back to 1 before shipping.
const SLOW_MOTION = 4

// Shrinking to a card, and growing back to full size: soft at both ends.
const EASE = 'power2.inOut'
const SCALE_DURATION = 0.45
const GROW_DURATION = 0.6
// Once the new page fills the screen, its corners square off, as the last step.
const CORNER_DURATION = 0.3
// A card leaving the stack accelerates away (it is going off the screen, so
// it never slows down); a card moving forward decelerates into its place.
const LEAVE_EASE = 'power1.in'
const LEAVE_DURATION = 0.5
const FORWARD_EASE = 'power1.out'
// The page starts sliding off this long before it has finished shrinking.
const OVERLAP = 0.2
// The red card starts down this long after the page, so it trails a little
// behind it instead of moving with it.
const FOLLOW = 0.12
// The longest the new page waits for its first screen's images before it shows.
const IMAGE_WAIT = 1000
// The front card's size: this share of the screen. The whole stack (the front
// card plus the cards rising behind it) is centred on the screen.
const CARD_SCALE = 0.86
// Each card further back in the stack is this much taller (it rises above the
// card in front), in screen pixels.
const STACK_RISE = 24
// Every card is this much narrower on each side than CARD_SCALE gives, so all
// three share one width, in screen pixels.
const STACK_NARROW = 56
// Each card further back is this much darker, as if in the shadow of the stack.
const STACK_DIM = 0.2
// Card corners, in screen pixels (the red card's border-radius matches).
const RADIUS = 24

type Viewport = { width: number; height: number }

// The cards in the stack: the page, the red card and the next page.
const STACK_SIZE = 3

/** A stacked card's edges on screen: 0 is the front card, 1 the one behind it, and so on. */
function cardEdges(depth: number, { width, height }: Viewport) {
  const margin = (1 - CARD_SCALE) / 2
  const side = width * margin + STACK_NARROW
  // Shift the stack down by half the height the cards behind add, so it is centred.
  const shift = ((STACK_SIZE - 1) * STACK_RISE) / 2
  return {
    top: height * margin + shift - depth * STACK_RISE,
    bottom: height * margin - shift,
    left: side,
    right: side,
    filter: `brightness(${1 - depth * STACK_DIM})`,
  }
}

/**
 * The page's scale and offset to sit at a depth in the stack (the page scales
 * about the screen centre). It scales to the card's width, so the card is
 * taller than one screen of the page: `extra` is how much more of the page,
 * below the screen, it shows to fill the card's height, in page pixels.
 */
function pageAt(depth: number, viewport: Viewport) {
  const { top, bottom, left } = cardEdges(depth, viewport)
  const scale = (viewport.width - 2 * left) / viewport.width
  return {
    scale,
    y: top - (viewport.height * (1 - scale)) / 2,
    extra: (viewport.height - top - bottom) / scale - viewport.height,
  }
}

/** Resolves with the new route's <main> once it has replaced `previous` (lazy pages load first). */
function waitForPage(shell: HTMLElement, previous: Element | null) {
  return new Promise<Element | null>((resolve) => {
    const started = performance.now()
    const check = () => {
      const main = shell.querySelector(':scope > main')
      if ((main && main !== previous) || performance.now() - started > 4000) {
        resolve(main)
        return
      }
      requestAnimationFrame(check)
    }
    check()
  })
}

/** An element's distance from the top of the page, ignoring transforms. */
function pageTop(element: HTMLElement) {
  let top = 0
  for (let node: HTMLElement | null = element; node; node = node.offsetParent as HTMLElement | null) {
    top += node.offsetTop
  }
  return top
}

/**
 * Loads and decodes the images on the new page's first screen (at most
 * IMAGE_WAIT), so none pop in as it appears. Lazy images would not start on
 * their own: the page is off the screen behind the cards until then.
 */
async function firstScreenImages(main: Element | null, height: number) {
  if (!main) return
  const images = [...main.querySelectorAll('img')].filter((image) => pageTop(image) < height)
  for (const image of images) image.loading = 'eager'
  await Promise.race([
    Promise.all(images.map((image) => image.decode().catch(() => {}))),
    new Promise((resolve) => setTimeout(resolve, IMAGE_WAIT)),
  ])
}

/** An in-app link this transition should handle, or null to leave it alone. */
function transitionHref(event: MouseEvent, currentPath: string): string | null {
  if (event.defaultPrevented || event.button !== 0) return null
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return null
  const anchor = (event.target as Element | null)?.closest?.('a[href]')
  if (!(anchor instanceof HTMLAnchorElement)) return null
  // The menu runs its own close-then-go and calls the transition itself.
  if (anchor.closest('.menu-panel')) return null
  if (anchor.target && anchor.target !== '_self') return null
  if (anchor.hasAttribute('download')) return null
  const url = new URL(anchor.href, window.location.href)
  if (url.origin !== window.location.origin) return null
  // Same page (with or without a #section): the usual scroll, no transition.
  if (url.pathname === currentPath) return null
  return `${url.pathname}${url.search}${url.hash}`
}

/**
 * Stacked-cards page transition: as the current page shrinks to a card, the
 * stack behind it shows (the red card, and the next page behind that), each
 * card a little taller than the one in front. The page slides down off the
 * stack with the red card close behind it, and the next card moves to the
 * front; the route changes once the page is off the screen, and the new page
 * takes the next card's place and grows back to full size. Handles in-app
 * link clicks anywhere on the site;
 * reduced motion navigates directly.
 */
export function PageTransition() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const pathnameRef = useRef(pathname)
  const backdropRef = useRef<HTMLDivElement>(null)
  const redRef = useRef<HTMLDivElement>(null)
  const nextRef = useRef<HTMLDivElement>(null)
  const runningRef = useRef(false)

  useEffect(() => {
    pathnameRef.current = pathname
  }, [pathname])

  useEffect(() => {
    const backdrop = backdropRef.current
    const red = redRef.current
    const next = nextRef.current
    const shell = document.querySelector<HTMLElement>('.page-shell')
    if (!backdrop || !red || !next || !shell) return

    const run = async (href: string) => {
      if (runningRef.current) return
      if (prefersReducedMotion()) {
        navigate(href)
        return
      }
      runningRef.current = true
      const lenis = getSmoothScroll()
      lenis?.stop()
      document.documentElement.classList.add('is-page-transitioning')

      const viewport = { width: window.innerWidth, height: window.innerHeight }
      // The page's clip, with corners that look `radius` on screen at this scale.
      const clip = (top: number, bottom: number, scale: number, radius = RADIUS) =>
        `inset(${top}px 0px ${Math.max(0, bottom)}px 0px round ${radius / scale}px)`

      // 1. The current page becomes the front card: clipped to the screen it
      //    shows, it shrinks to card size and uncovers the stack behind it.
      // 2. Before it settles, it slides down off the stack with the red card
      //    close behind it (only the red card's top shows), while the next
      //    card moves forward to the front.
      const top = window.scrollY
      const bottom = shell.offsetHeight - top - viewport.height
      gsap.set(backdrop, { autoAlpha: 1 })
      gsap.set(red, { ...cardEdges(1, viewport), y: 0, autoAlpha: 1 })
      gsap.set(next, { ...cardEdges(2, viewport), autoAlpha: 1 })
      gsap.set(shell, {
        transformOrigin: `50% ${top + viewport.height / 2}px`,
        clipPath: clip(top, bottom, 1, 0),
      })
      shell.classList.add('is-card')
      const front = pageAt(0, viewport)
      const leave = SCALE_DURATION - OVERLAP
      const offScreen = leave + LEAVE_DURATION
      const stack = gsap
        .timeline()
        .timeScale(1 / SLOW_MOTION)
        .to(
          shell,
          {
            scale: front.scale,
            y: front.y,
            clipPath: clip(top, bottom - front.extra, front.scale),
            duration: SCALE_DURATION,
            ease: EASE,
          },
          0,
        )
        .to(shell, { y: viewport.height, duration: LEAVE_DURATION, ease: LEAVE_EASE }, leave)
        .to(
          red,
          { ...cardEdges(0, viewport), y: viewport.height, duration: LEAVE_DURATION, ease: LEAVE_EASE },
          leave + FOLLOW,
        )
        .to(next, { ...cardEdges(0, viewport), duration: LEAVE_DURATION - FOLLOW, ease: FORWARD_EASE }, leave + FOLLOW)

      // Change the page as soon as the old one is off the screen (the next card
      // is in front by then), so the new one loads while the red card leaves.
      await new Promise<void>((resolve) => {
        stack.call(resolve, undefined, offScreen)
      })
      const previous = shell.querySelector(':scope > main')
      navigate(href)
      const main = await waitForPage(shell, previous)
      window.scrollTo(0, 0)
      lenis?.scrollTo(0, { immediate: true, force: true })
      await firstScreenImages(main, viewport.height)

      // 3. The new page takes the next card's place at the front, under it
      //    (the next card grows with it and fades, so the stand-in eases into
      //    the page instead of jumping), and grows to fill the screen. Its
      //    corners keep the cards' radius on screen all the way, and only
      //    square off once it fills the screen.
      const pageBottom = shell.offsetHeight - viewport.height
      const corner = { radius: RADIUS, extra: front.extra }
      const clipPage = () => {
        gsap.set(shell, {
          clipPath: clip(0, pageBottom - corner.extra, Number(gsap.getProperty(shell, 'scaleX')), corner.radius),
        })
      }
      gsap.set(shell, { scale: front.scale, y: front.y, transformOrigin: `50% ${viewport.height / 2}px` })
      clipPage()
      shell.classList.replace('is-card', 'is-behind')
      await Promise.all([
        gsap
          .timeline()
          .timeScale(1 / SLOW_MOTION)
          .to(next, { top: 0, bottom: 0, left: 0, right: 0, duration: GROW_DURATION, ease: EASE }, 0)
          .to(next, { autoAlpha: 0, duration: 0.2, ease: 'none' }, 0)
          .to(corner, { extra: 0, duration: GROW_DURATION, ease: EASE }, 0)
          .to(shell, { scale: 1, y: 0, duration: GROW_DURATION, ease: EASE, onUpdate: clipPage }, 0)
          .to(corner, { radius: 0, duration: CORNER_DURATION, ease: 'power2.out', onUpdate: clipPage }, GROW_DURATION)
          .then(),
        stack.then(),
      ])

      gsap.set([red, next], { autoAlpha: 0, clearProps: 'top,bottom,left,right,transform,filter' })
      gsap.set(backdrop, { autoAlpha: 0 })
      gsap.set(shell, { clearProps: 'transform,transformOrigin,clipPath' })
      shell.classList.remove('is-behind')
      document.documentElement.classList.remove('is-page-transitioning')
      lenis?.start()
      ScrollTrigger.refresh()
      runningRef.current = false
    }

    const onClick = (event: MouseEvent) => {
      const href = transitionHref(event, pathnameRef.current)
      if (!href) return
      event.preventDefault()
      void run(href)
    }

    // Capture phase: runs before React Router's <Link> handler, which then sees
    // the default prevented and leaves the navigation to the transition.
    document.addEventListener('click', onClick, true)
    registerPageTransition((href) => void run(href))
    return () => {
      document.removeEventListener('click', onClick, true)
      registerPageTransition(null)
    }
  }, [navigate])

  return (
    <>
      {/* Separate layers (not one container), so the page can move between
          places in the stack. */}
      <div ref={backdropRef} className="page-transition-backdrop" aria-hidden="true" />
      <div ref={nextRef} className="page-transition-card page-transition-card--next" aria-hidden="true" />
      <div ref={redRef} className="page-transition-card" aria-hidden="true" />
    </>
  )
}
