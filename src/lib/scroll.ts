import Lenis from 'lenis'

export const ROUTE_SCROLL_RESET_EVENT = 'route-scroll-reset'

let lenis: Lenis | null = null

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * A light smooth scroll for mouse wheels: a high lerp, so the page follows the
 * wheel closely and only the steps between notches are softened. Touch and
 * reduced motion stay native.
 */
export function initSmoothScroll() {
  if (lenis || prefersReducedMotion()) return null

  lenis = new Lenis({
    lerp: 0.18,
    smoothWheel: true,
    syncTouch: false,
    autoRaf: true,
  })

  return lenis
}

export function destroySmoothScroll() {
  lenis?.destroy()
  lenis = null
}

export function getSmoothScroll() {
  return lenis
}

/** The real scroll position (Lenis's own while it is smoothing). */
export function getScrollY() {
  return lenis?.scroll ?? window.scrollY
}

/** Freezes page scrolling (open menu, page transition); see `html.scroll-locked` in index.css. */
export function lockScroll() {
  document.documentElement.classList.add('scroll-locked')
  lenis?.stop()
}

export function unlockScroll() {
  document.documentElement.classList.remove('scroll-locked')
  lenis?.start()
}

interface ScrollToOptions {
  immediate?: boolean
}

/** Scrolls to a position or element: a jump when `immediate`, a glide otherwise. */
export function scrollToTarget(target: number | HTMLElement, options?: ScrollToOptions) {
  const immediate = options?.immediate || prefersReducedMotion()

  if (lenis) {
    // force: also works while scrolling is stopped (menu open, page transition).
    lenis.scrollTo(target, { immediate, force: true })
    return
  }

  const behavior = immediate ? 'auto' : 'smooth'
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior })
    return
  }

  target.scrollIntoView({ behavior })
}

export function resetWindowScroll() {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }

  scrollToTarget(0, { immediate: true })

  window.dispatchEvent(new Event('scroll'))
  window.dispatchEvent(new Event(ROUTE_SCROLL_RESET_EVENT))
}
