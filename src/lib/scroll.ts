export const ROUTE_SCROLL_RESET_EVENT = 'route-scroll-reset'

export function resetWindowScroll() {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }

  const html = document.documentElement
  const previousScrollBehavior = html.style.scrollBehavior

  html.style.scrollBehavior = 'auto'
  html.scrollTop = 0
  document.body.scrollTop = 0
  window.scrollTo(0, 0)
  html.style.scrollBehavior = previousScrollBehavior

  window.dispatchEvent(new Event('scroll'))
  window.dispatchEvent(new Event(ROUTE_SCROLL_RESET_EVENT))
}

export function resetPageTheme() {
  document.body.classList.remove('theme-dark')
  document.body.style.setProperty('--theme-progress', '0')
}
