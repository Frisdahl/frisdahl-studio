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
import { DUR, EASE } from '../../lib/motion'

gsap.registerPlugin(ScrollTrigger)

/** The footer starts fading in this long after the page's content starts rising (s). */
const FOOTER_DELAY = 0.3
/**
 * A page with its own entrance (the home page's hero) plays it itself and offers nothing to wait
 * on, so scrolling comes back this long after the page is uncovered: the same time the other
 * pages' content rise takes.
 */
const OWN_ENTRANCE_HOLD_MS = DUR.rise * 1000
/**
 * The longest a transition waits for an animation to report that it is done. GSAP's ticker
 * pauses in a hidden tab, so a tween can sit unfinished with the scroll locked; this lets go.
 */
const SETTLE_LIMIT_MS = 3000

/** Resolves when the tween completes or is interrupted (killed), or after `limitMs`. */
function settled(tween: gsap.core.Tween, limitMs = SETTLE_LIMIT_MS) {
  return new Promise<void>((resolve) => {
    const timer = window.setTimeout(resolve, limitMs)
    const done = () => {
      window.clearTimeout(timer)
      resolve()
    }
    tween.eventCallback('onComplete', done)
    tween.eventCallback('onInterrupt', done)
  })
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
 * Page transition for in-app links anywhere on the site: the page's content leaves (text
 * slides up out of its masks, images close, the rest fades; lib/pageExit.ts), the route
 * changes while the page is empty, and the new page comes in with its own entrance. Reduced
 * motion navigates directly. Project cards on the home page and the "next project" card use
 * a shared-image transition instead (lib/sharedCaseTransition.ts).
 */
export function PageTransition() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const pathnameRef = useRef(pathname)
  const veilRef = useRef<HTMLDivElement>(null)
  const runningRef = useRef(false)
  // Where a content transition is: 'leaving' and 'swapping' are the stages during which the page
  // is covered and may still change; 'entering' is the new page coming in. 'card-leaving' is the
  // shared-image transition before it has changed the route.
  const phaseRef = useRef<'idle' | 'leaving' | 'swapping' | 'entering' | 'card-leaving'>('idle')
  // The browser's Back or Forward button was used before the transition changed the route: the
  // route has already changed, so the transition must not navigate on to its own target.
  const interruptedRef = useRef(false)

  useEffect(() => {
    pathnameRef.current = pathname
  }, [pathname])

  // Back or Forward while the page is covered: the router has already switched to the other
  // page. Hide it at once (it would otherwise show, half-covered, until the exit ends) and let
  // the transition bring that page in instead of going on to its own target. Once the new page
  // is coming in ('entering') the entrance simply carries on with whichever page is mounted.
  // Its own effect with no dependencies: the router re-renders on popstate (and `navigate`
  // changes with it), which would tear down and re-add a listener that is still waiting to run.
  useEffect(() => {
    const onPopState = () => {
      const phase = phaseRef.current
      if (phase === 'card-leaving') {
        // The shared-image transition has not navigated yet: it fades out instead (its own
        // path for a page that did not load) and leaves the page the browser went to.
        interruptedRef.current = true
        return
      }
      if (phase !== 'leaving' && phase !== 'swapping') return
      interruptedRef.current = true
      document.documentElement.classList.add('is-content-swapping')
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    const shell = document.querySelector<HTMLElement>('.page-shell')
    if (!shell) return

    // The page's content leaves (text slides up out of its masks,
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
      interruptedRef.current = false
      phaseRef.current = 'leaving'
      lockScroll()
      coverPage()
      document.documentElement.classList.add('is-page-transitioning')
      const layout = shell.querySelector(':scope > .global-layout')

      try {
        // 1. Out: the text slides away, the images close, the rest fades.
        const restore = layout ? await playPageExit(layout) : () => {}
        // Whatever page is mounted next stays hidden until it is brought in below. The old
        // one's DOM is put back first (its text was split into lines), hidden by that class.
        document.documentElement.classList.add('is-content-swapping')
        restore()

        // 2. Change the page while nothing is showing, and wait for its first screen. If Back or
        // Forward was used meanwhile, the route is already the new one: go on with that page.
        phaseRef.current = 'swapping'
        const previous = shell.querySelector(':scope > .global-layout > main')
        let main: Element | null
        if (interruptedRef.current) {
          main = previous
        } else {
          navigate(href)
          main = await waitForPage(shell, previous)
        }
        window.scrollTo(0, 0)
        await firstScreenImages(main, window.innerHeight)

        // 3. In: the page with its own entrance (the home page's hero) plays that; any other
        // page's content rises in. The footer fades in with it.
        const footer = shell.querySelector<HTMLElement>(':scope > .global-layout > .site-footer')
        const ownEntrance = Boolean(main?.matches('[data-page-entrance]') || main?.querySelector('[data-page-entrance]'))
        if (main && !ownEntrance) gsap.set(main, { autoAlpha: 0, y: 48 })
        if (footer) gsap.set(footer, { autoAlpha: 0 })
        phaseRef.current = 'entering'
        document.documentElement.classList.remove('is-content-swapping')
        revealPage()
        let rise: gsap.core.Tween | null = null
        if (main && !ownEntrance) {
          rise = gsap.to(main, { autoAlpha: 1, y: 0, duration: DUR.rise, ease: EASE.rise, clearProps: 'transform,opacity,visibility' })
        }
        if (footer) {
          gsap.to(footer, { autoAlpha: 1, duration: DUR.rise, delay: FOOTER_DELAY, ease: EASE.fade, clearProps: 'opacity,visibility' })
        }
        // Scrolling comes back once the content has risen into place.
        await (rise ? settled(rise) : new Promise((resolve) => setTimeout(resolve, OWN_ENTRANCE_HOLD_MS)))
      } finally {
        // Also on an error: never leave the page covered, hidden or locked.
        document.documentElement.classList.remove('is-content-swapping', 'is-page-transitioning')
        revealPage()
        unlockScroll()
        ScrollTrigger.refresh()
        interruptedRef.current = false
        phaseRef.current = 'idle'
        runningRef.current = false
      }
    }

    // A project card on the home page: its image grows into the case page's
    // hero instead of the panels wiping over the page.
    const runShared = async (href: string, card: HTMLElement) => {
      const veil = veilRef.current
      if (runningRef.current || !veil) return
      runningRef.current = true
      interruptedRef.current = false
      phaseRef.current = 'card-leaving'
      lockScroll()
      document.documentElement.classList.add('is-page-transitioning')
      // Starts loading the case page's code while the card leaves.
      void import('../../pages/CaseDetailPage')
      try {
        await runSharedCaseTransition(card, veil, async () => {
          // Back or Forward was used while the card was leaving: stay on the page it went to.
          if (interruptedRef.current) return null
          phaseRef.current = 'idle'
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
        interruptedRef.current = false
        phaseRef.current = 'idle'
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
      // Every other link: the content leaves and the new page comes in.
      else void runContent(href)
    }

    // Capture phase: runs before React Router's <Link> handler, which then sees
    // the default prevented and leaves the navigation to the transition.
    document.addEventListener('click', onClick, true)

    registerPageTransition((href) => void runContent(href))
    registerSharedTransition((href, card) => {
      if (canShareCard(card) && !prefersReducedMotion()) void runShared(href, card)
      else void runContent(href)
    })
    return () => {
      document.removeEventListener('click', onClick, true)
      registerPageTransition(null)
      registerSharedTransition(null)
    }
  }, [navigate])

  return (
    <div ref={veilRef} className="page-transition-veil" aria-hidden="true" />
  )
}
