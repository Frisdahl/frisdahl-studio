import { useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { resetWindowScroll, scrollToTarget } from '../../lib/scroll'

export function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const previousPathname = useRef<string | null>(null)

  useLayoutEffect(() => {
    const changedPage = previousPathname.current !== pathname
    previousPathname.current = pathname

    // Links like "/#contact" scroll to that section: jump there on load or when
    // arriving from another page, glide there when already on the page.
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
    if (target) {
      if (changedPage) resetWindowScroll()
      const frame = requestAnimationFrame(() => {
        scrollToTarget(target, { immediate: changedPage })
      })
      return () => cancelAnimationFrame(frame)
    }

    if (changedPage || !hash) resetWindowScroll()
  }, [pathname, hash])

  return null
}
