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

// Shrinking into the stack: soft at both ends.
const EASE = 'power2.inOut'
const SCALE_DURATION = 0.6
// The new page growing from the back of the stack to full size.
const GROW_EASE = 'power3.inOut'
const GROW_DURATION = 0.7
// Once the new page fills the screen, its corners square off, as the last step.
const CORNER_DURATION = 0.3
// The page and the red card leave down off the screen: a slow start, then
// fast (they are off the screen before they would slow down again).
const LEAVE_EASE = 'power3.inOut'
const LEAVE_DURATION = 0.9
// The page starts sliding off this long before it has finished shrinking.
const OVERLAP = 0.05
// The red card starts down this long after the page, so it trails a little
// behind it instead of moving with it.
const FOLLOW = 0.12
// The longest the new page waits for its first screen's images before it shows.
const IMAGE_WAIT = 1000
// The front card's size, as a share of the screen; each card further back is
// this much smaller, so the stack steps in.
const FRONT_SCALE = 0.95
const STACK_STEP = 0.075
// The back card's top, and how much lower each card in front of it sits, as
// shares of the screen height. The back card is centred; the cards in front
// run off the bottom of the screen.
const BACK_TOP = 0.1
const STACK_RISE = 0.06
// Card corners, in screen pixels (the red card's border-radius matches).
const RADIUS = 16

type Viewport = { width: number; height: number }

// The cards in the stack: the page, the red card and the next page.
const STACK_SIZE = 3

/** A stacked card's edges on screen: 0 is the front card, 1 the one behind it, and so on. */
function cardEdges(depth: number, { width, height }: Viewport) {
  const scale = FRONT_SCALE - depth * STACK_STEP
  const top = height * (BACK_TOP + (STACK_SIZE - 1 - depth) * STACK_RISE)
  const side = (width * (1 - scale)) / 2
  return { top, bottom: height * (1 - scale) - top, left: side, right: side }
}

/** The page's scale and offset to sit at a depth in the stack (the page scales about the screen centre). */
function pageAt(depth: number, viewport: Viewport) {
  const { top, left } = cardEdges(depth, viewport)
  const scale = (viewport.width - 2 * left) / viewport.width
  return { scale, y: top - (viewport.height * (1 - scale)) / 2 }
}

// A card's edges at full screen, where every card starts and the new page ends.
const FULL_SCREEN = { top: 0, bottom: 0, left: 0, right: 0 }

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
 * Stacked-cards page transition: the current page, the red card and the next
 * page's card shrink together into a stack, each card further back smaller
 * and higher. The page slides down off the screen with the red card a moment
 * behind it; the route changes once the page is off the screen, and the new
 * page takes the next card's place at the back and grows from there to full
 * size. Handles in-app link clicks anywhere on the site; reduced motion
 * navigates directly.
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
        `inset(${top}px 0px ${bottom}px 0px round ${radius / scale}px)`

      // 1. All three cards start full screen and shrink together into the
      //    stack: the current page (clipped to the screen it shows) in front,
      //    the red card behind it and the next page's card at the back, each
      //    smaller and higher than the one in front.
      // 2. The page slides down off the screen, and the red card follows a
      //    moment later at its own size; the next card stays at the back.
      const top = window.scrollY
      const bottom = shell.offsetHeight - top - viewport.height
      gsap.set(backdrop, { autoAlpha: 1 })
      gsap.set([red, next], { ...FULL_SCREEN, y: 0, autoAlpha: 1 })
      gsap.set(shell, {
        transformOrigin: `50% ${top + viewport.height / 2}px`,
        clipPath: clip(top, bottom, 1, 0),
      })
      shell.classList.add('is-card')
      const front = pageAt(0, viewport)
      const frontTop = cardEdges(0, viewport).top
      const leave = SCALE_DURATION - OVERLAP
      // Change the page as soon as the old one is off the screen, so the new
      // one loads while the red card leaves.
      let offScreen: () => void = () => {}
      const pageGone = new Promise<void>((resolve) => {
        offScreen = resolve
      })
      // The new page only grows once the red card is off the screen too, so it
      // never grows wider than a card still in front of it.
      const redTop = cardEdges(1, viewport).top
      let redOffScreen: () => void = () => {}
      const redGone = new Promise<void>((resolve) => {
        redOffScreen = resolve
      })
      const stack = gsap
        .timeline()
        .timeScale(1 / SLOW_MOTION)
        .to(
          shell,
          { scale: front.scale, y: front.y, clipPath: clip(top, bottom, front.scale), duration: SCALE_DURATION, ease: EASE },
          0,
        )
        .to(red, { ...cardEdges(1, viewport), duration: SCALE_DURATION, ease: EASE }, 0)
        .to(next, { ...cardEdges(2, viewport), duration: SCALE_DURATION, ease: EASE }, 0)
        .to(
          shell,
          {
            y: front.y + viewport.height,
            duration: LEAVE_DURATION,
            ease: LEAVE_EASE,
            onUpdate: () => {
              if (frontTop + Number(gsap.getProperty(shell, 'y')) - front.y >= viewport.height) offScreen()
            },
            onComplete: () => offScreen(),
          },
          leave,
        )
        .to(
          red,
          {
            y: viewport.height,
            duration: LEAVE_DURATION,
            ease: LEAVE_EASE,
            onUpdate: () => {
              if (redTop + Number(gsap.getProperty(red, 'y')) >= viewport.height) redOffScreen()
            },
            onComplete: () => redOffScreen(),
          },
          leave + FOLLOW,
        )

      await pageGone
      const previous = shell.querySelector(':scope > main')
      navigate(href)
      const main = await waitForPage(shell, previous)
      window.scrollTo(0, 0)
      lenis?.scrollTo(0, { immediate: true, force: true })
      await Promise.all([firstScreenImages(main, viewport.height), redGone])

      // 3. The new page takes the next card's place at the back of the stack,
      //    under it (the next card grows with it and fades, so the stand-in
      //    eases into the page instead of jumping), and grows straight from
      //    there to fill the screen. Its corners keep the cards' radius on
      //    screen all the way, and only square off once it fills the screen.
      const back = pageAt(STACK_SIZE - 1, viewport)
      const pageBottom = shell.offsetHeight - viewport.height
      const corner = { radius: RADIUS }
      const clipPage = () => {
        gsap.set(shell, {
          clipPath: clip(0, pageBottom, Number(gsap.getProperty(shell, 'scaleX')), corner.radius),
        })
      }
      // The old page's slide is still running (the page changed as it left the screen).
      gsap.killTweensOf(shell)
      gsap.set(shell, { ...back, transformOrigin: `50% ${viewport.height / 2}px` })
      clipPage()
      shell.classList.replace('is-card', 'is-behind')
      await Promise.all([
        gsap
          .timeline()
          .timeScale(1 / SLOW_MOTION)
          .to(next, { ...FULL_SCREEN, duration: GROW_DURATION, ease: GROW_EASE }, 0)
          .to(next, { autoAlpha: 0, duration: 0.2, ease: 'none' }, 0)
          .to(shell, { scale: 1, y: 0, duration: GROW_DURATION, ease: GROW_EASE, onUpdate: clipPage }, 0)
          .to(corner, { radius: 0, duration: CORNER_DURATION, ease: 'power2.out', onUpdate: clipPage }, GROW_DURATION)
          .then(),
        stack.then(),
      ])

      gsap.set([red, next], { autoAlpha: 0, clearProps: 'top,bottom,left,right,transform' })
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
