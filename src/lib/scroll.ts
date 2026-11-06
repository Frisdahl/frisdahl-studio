export const ROUTE_SCROLL_RESET_EVENT = 'route-scroll-reset'

/** The page scrolls natively (no smooth-scroll library), so this is the real position. */
export function getScrollY() {
  return window.scrollY
}

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Freezes page scrolling (open menu, page transition); see `html.scroll-locked` in index.css. */
export function lockScroll() {
  document.documentElement.classList.add('scroll-locked')
}

export function unlockScroll() {
  document.documentElement.classList.remove('scroll-locked')
}

interface ScrollToOptions {
  immediate?: boolean
}

/** Scrolls to a position or element: a jump when `immediate`, a native glide otherwise. */
export function scrollToTarget(target: number | HTMLElement, options?: ScrollToOptions) {
  const behavior = options?.immediate || prefersReducedMotion() ? 'auto' : 'smooth'

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
