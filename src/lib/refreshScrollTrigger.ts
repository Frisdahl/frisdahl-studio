import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * ScrollTrigger.refresh() that cannot move the page.
 *
 * A refresh scrolls to the top to measure, then restores the scroll position ScrollTrigger recorded earlier.
 * After a page change that record can be the previous page's (a home page scrolled to 2108 px): the refresh at
 * the end of a page transition then threw the new page, which was at the top, down to it, a couple of seconds
 * after it had arrived. (ScrollTrigger.clearScrollMemory() did not clear it.) So: note where the page really is,
 * refresh, and put the page back if the refresh moved it.
 */
export function refreshScrollTrigger() {
  const y = window.scrollY
  ScrollTrigger.refresh()
  if (Math.abs(window.scrollY - y) > 1) window.scrollTo(0, y)
}
