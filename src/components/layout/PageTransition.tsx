import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { registerPageTransition } from '../../lib/pageTransition'
import { getSmoothScroll, prefersReducedMotion } from '../../lib/smoothScroll'

gsap.registerPlugin(ScrollTrigger)

// Each panel wipes over the screen, and off it again, in this long; the second
// panel follows the first this much later (and leaves this much before it).
const DURATION = 1
const STAGGER = 0.075
const EASE = 'expo.inOut'
// The longest the new page waits for its first screen's images before it shows.
const IMAGE_WAIT = 1000

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
 * IMAGE_WAIT), so none pop in as the panels uncover it. Lazy images would not
 * start on their own: the page is covered until then.
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
 * Wipe page transition: two panels (accent, then dark) rise up over the page
 * one just after the other, the route changes under them, and they rise on
 * off the top in reverse order (dark first) to uncover the new page. Handles
 * in-app link clicks anywhere on the site; reduced motion navigates directly.
 */
export function PageTransition() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const pathnameRef = useRef(pathname)
  const loaderRef = useRef<HTMLDivElement>(null)
  const runningRef = useRef(false)

  useEffect(() => {
    pathnameRef.current = pathname
  }, [pathname])

  useEffect(() => {
    const loader = loaderRef.current
    const shell = document.querySelector<HTMLElement>('.page-shell')
    if (!loader || !shell) return
    const panels = gsap.utils.toArray<HTMLElement>('.page-transition-panel', loader)

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
      gsap.set(loader, { autoAlpha: 1 })

      // 1. The panels rise from below and open up to cover the screen.
      await gsap.fromTo(
        panels,
        { yPercent: 25, clipPath: 'inset(75% 0% 0% 0%)' },
        { yPercent: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: DURATION, ease: EASE, stagger: STAGGER },
      )

      // 2. Change the page under them, and wait for its first screen.
      const previous = shell.querySelector(':scope > main')
      navigate(href)
      const main = await waitForPage(shell, previous)
      window.scrollTo(0, 0)
      lenis?.scrollTo(0, { immediate: true, force: true })
      await firstScreenImages(main, window.innerHeight)

      // 3. The panels rise on off the top, the dark one first.
      await gsap.to(panels, {
        yPercent: -25,
        clipPath: 'inset(0% 0% 75% 0%)',
        duration: DURATION,
        ease: EASE,
        stagger: { from: 'end', each: STAGGER },
      })

      gsap.set(loader, { autoAlpha: 0 })
      gsap.set(panels, { clearProps: 'transform,clipPath' })
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
    <div ref={loaderRef} className="page-transition" aria-hidden="true">
      <div className="page-transition-panel page-transition-panel--accent" />
      <div className="page-transition-panel page-transition-panel--dark" />
    </div>
  )
}
