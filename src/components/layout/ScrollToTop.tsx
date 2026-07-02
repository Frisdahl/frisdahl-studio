import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { resetWindowScroll } from '../../lib/scroll'

export function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    resetWindowScroll()
  }, [pathname])

  return null
}
