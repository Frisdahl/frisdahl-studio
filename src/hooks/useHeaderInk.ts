import { useEffect } from 'react'

/** Height of the strip at the top of the screen that counts as "under the header". */
const STRIP_PX = 48

/**
 * Sets data-header-ink="light" on the root while a [data-header-theme="dark"]
 * section is under the header, so the logo and burger stay readable without a
 * blend mode. Re-reads the page's sections whenever the route changes.
 *
 * A dark page can stay pinned while the footer slides up over it (the page under
 * the footer, see Footer.tsx), so the dark section is still "under" the header
 * when the light footer already is. The footer is watched in the same strip: once
 * its top edge is in the strip, the header goes back to the dark ink.
 */
export function useHeaderInk(pathname: string) {
  useEffect(() => {
    const root = document.documentElement
    const under = new Set<Element>()
    let footerCovers = false
    const apply = () => {
      if (under.size && !footerCovers) root.setAttribute('data-header-ink', 'light')
      else root.removeAttribute('data-header-ink')
    }

    let observer: IntersectionObserver | null = null
    const observe = () => {
      observer?.disconnect()
      under.clear()
      footerCovers = false
      apply()
      const sections = document.querySelectorAll('[data-header-theme="dark"]')
      if (!sections.length) return
      const footer = document.querySelector('footer.site-footer')
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.target === footer) footerCovers = entry.isIntersecting
            else if (entry.isIntersecting) under.add(entry.target)
            else under.delete(entry.target)
          }
          apply()
        },
        // Only the top strip of the screen counts.
        { rootMargin: `0px 0px -${Math.max(0, window.innerHeight - STRIP_PX)}px` },
      )
      sections.forEach((section) => observer!.observe(section))
      if (footer) observer.observe(footer)
    }

    // Wait a frame so the new route's sections are in the DOM.
    const frame = requestAnimationFrame(observe)
    const later = window.setTimeout(observe, 400)
    window.addEventListener('resize', observe)
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(later)
      window.removeEventListener('resize', observe)
      observer?.disconnect()
      root.removeAttribute('data-header-ink')
    }
  }, [pathname])
}
