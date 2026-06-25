import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { resetPageTheme, resetWindowScroll } from '../../lib/scroll'

export function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    resetWindowScroll()
    resetPageTheme()
  }, [pathname])

  return null
}
