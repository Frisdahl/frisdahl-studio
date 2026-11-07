import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { destroySmoothScroll, initSmoothScroll, prefersReducedMotion } from '../../lib/scroll'

/** Starts the light smooth scroll (see lib/scroll.ts) and keeps ScrollTrigger in step with it. */
export function SmoothScroll() {
  useEffect(() => {
    const start = () => {
      if (prefersReducedMotion()) return
      initSmoothScroll()?.on('scroll', ScrollTrigger.update)
    }

    start()

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onMotionPreferenceChange = () => {
      destroySmoothScroll()
      if (!mediaQuery.matches) start()
    }
    mediaQuery.addEventListener('change', onMotionPreferenceChange)

    return () => {
      mediaQuery.removeEventListener('change', onMotionPreferenceChange)
      destroySmoothScroll()
    }
  }, [])

  return null
}
