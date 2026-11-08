import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { registerPageTransition, registerSharedTransition } from '../../lib/pageTransition'
import { canShareCard, runSharedCaseTransition } from '../../lib/sharedCaseTransition'
import { firstScreenImages, waitForPage } from '../../lib/pageSwap'
import { coverPage, revealPage } from '../../lib/pageReveal'
import { playPageExit } from '../../lib/pageExit'
import { lockScroll, prefersReducedMotion, unlockScroll } from '../../lib/scroll'

gsap.registerPlugin(ScrollTrigger)

// Each panel wipes over the screen, and off it again, in this long; the second
// panel follows the first this much later (and leaves this much before it).
const DURATION = 1
const STAGGER = 0.075
const EASE = 'expo.inOut'
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
 * Project cards on the home page use a shared-image transition instead
 * (lib/sharedCaseTransition.ts).
 */
export function PageTransition() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const pathnameRef = useRef(pathname)
  const loaderRef = useRef<HTMLDivElement>(null)
  const veilRef = useRef<HTMLDivElement>(null)
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
      lockScroll()
      coverPage()
      document.documentElement.classList.add('is-page-transitioning')
      gsap.set(loader, { autoAlpha: 1 })

      // 1. The panels rise from below and open up to cover the screen.
      await gsap.fromTo(
        panels,
        { yPercent: 25, clipPath: 'inset(75% 0% 0% 0%)' },
        { yPercent: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: DURATION, ease: EASE, stagger: STAGGER },
      )

      // 2. Change the page under them, and wait for its first screen.
      const previous = shell.querySelector(':scope > .global-layout > main')
      navigate(href)
      const main = await waitForPage(shell, previous)
      window.scrollTo(0, 0)
      await firstScreenImages(main, window.innerHeight)

      // 3. The panels rise on off the top, the dark one first. The new page's entrance
      // starts as they begin to uncover it.
      gsap.delayedCall(0.3, revealPage)
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
      unlockScroll()
      ScrollTrigger.refresh()
      runningRef.current = false
    }

    // The logo: no wipe panels. The page's content leaves (text slides up out of its masks,
    // images close to their centre, the rest fades; lib/pageExit.ts), the route changes while
    // the page is empty, and the new page comes in (the home page with its own entrance, any
    // other with a rise). Same sequence as a link in the menu.
    const runContent = async (href: string) => {
      if (runningRef.current) return
      if (prefersReducedMotion()) {
        navigate(href)
        return
      }
      runningRef.current = true
      lockScroll()
      coverPage()
      document.documentElement.classList.add('is-page-transitioning')
      const layout = shell.querySelector(':scope > .global-layout')

      // 1. Out: the text slides away, the images close, the rest fades.
      const restore = layout ? await playPageExit(layout) : () => {}
      // Whatever page is mounted next stays hidden until it is brought in below. The old
      // one's DOM is put back first (its text was split into lines), hidden by that class.
      document.documentElement.classList.add('is-content-swapping')
      restore()

      // 2. Change the page while nothing is showing, and wait for its first screen.
      const previous = shell.querySelector(':scope > .global-layout > main')
      navigate(href)
      const main = await waitForPage(shell, previous)
      window.scrollTo(0, 0)
      await firstScreenImages(main, window.innerHeight)

      // 3. In: the page with its own entrance (the home page's hero) plays that; any other
      // page's content rises in. The footer fades in with it.
      const footer = shell.querySelector<HTMLElement>(':scope > .global-layout > .site-footer')
      const ownEntrance = Boolean(main?.matches('[data-page-entrance]') || main?.querySelector('[data-page-entrance]'))
      if (main && !ownEntrance) gsap.set(main, { autoAlpha: 0, y: 48 })
      if (footer) gsap.set(footer, { autoAlpha: 0 })
      document.documentElement.classList.remove('is-content-swapping')
      revealPage()
      if (main && !ownEntrance) {
        gsap.to(main, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', clearProps: 'transform,opacity,visibility' })
      }
      if (footer) {
        gsap.to(footer, { autoAlpha: 1, duration: 0.9, delay: 0.3, ease: 'power2.out', clearProps: 'opacity,visibility' })
      }
      await new Promise((resolve) => setTimeout(resolve, 900))

      document.documentElement.classList.remove('is-page-transitioning')
      unlockScroll()
      ScrollTrigger.refresh()
      runningRef.current = false
    }

    // A project card on the home page: its image grows into the case page's
    // hero instead of the panels wiping over the page.
    const runShared = async (href: string, card: HTMLElement) => {
      const veil = veilRef.current
      if (runningRef.current || !veil) return
      runningRef.current = true
      lockScroll()
      document.documentElement.classList.add('is-page-transitioning')
      // Starts loading the case page's code while the card leaves.
      void import('../../pages/CaseDetailPage')
      try {
        await runSharedCaseTransition(card, veil, async () => {
          const previous = shell.querySelector(':scope > .global-layout > main')
          navigate(href)
          const main = await waitForPage(shell, previous)
          window.scrollTo(0, 0)
          await firstScreenImages(main, window.innerHeight)
          return main
        })
      } finally {
        document.documentElement.classList.remove('is-page-transitioning')
        unlockScroll()
        ScrollTrigger.refresh()
        runningRef.current = false
      }
    }

    const onClick = (event: MouseEvent) => {
      const href = transitionHref(event, pathnameRef.current)
      if (!href) return
      event.preventDefault()
      // The menu is already taking the page somewhere (Navbar): ignore other links meanwhile.
      if (document.documentElement.classList.contains('menu-leaving')) return
      // The home page's project cards, or the "next project" card on a case page.
      const card = (event.target as Element).closest<HTMLElement>('.case-card, .case-detail-next')
      if (card && canShareCard(card) && !prefersReducedMotion()) void runShared(href, card)
      else if ((event.target as Element).closest('.site-header-logo')) void runContent(href)
      else void run(href)
    }

    // Capture phase: runs before React Router's <Link> handler, which then sees
    // the default prevented and leaves the navigation to the transition.
    document.addEventListener('click', onClick, true)
    registerPageTransition((href) => void run(href))
    registerSharedTransition((href, card) => {
      if (canShareCard(card) && !prefersReducedMotion()) void runShared(href, card)
      else void run(href)
    })
    return () => {
      document.removeEventListener('click', onClick, true)
      registerPageTransition(null)
      registerSharedTransition(null)
    }
  }, [navigate])

  return (
    <>
      <div ref={veilRef} className="page-transition-veil" aria-hidden="true" />
      <div ref={loaderRef} className="page-transition" aria-hidden="true">
        <div className="page-transition-panel page-transition-panel--accent" />
        <div className="page-transition-panel page-transition-panel--dark" />
      </div>
    </>
  )
}
