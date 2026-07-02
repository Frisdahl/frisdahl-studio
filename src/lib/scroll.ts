import { smoothScrollTo } from './smoothScroll'

export const ROUTE_SCROLL_RESET_EVENT = 'route-scroll-reset'

export function resetWindowScroll() {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }

  smoothScrollTo(0, { immediate: true })

  window.dispatchEvent(new Event('scroll'))
  window.dispatchEvent(new Event(ROUTE_SCROLL_RESET_EVENT))
}

export function resetPageTheme() {
  document.body.classList.remove('theme-dark')
  document.body.style.setProperty('--theme-progress', '0')
}
