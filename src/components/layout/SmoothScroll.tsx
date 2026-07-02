import { useEffect } from 'react'
import {
  destroySmoothScroll,
  initSmoothScroll,
  prefersReducedMotion,
  runSmoothScrollFrame,
} from '../../lib/smoothScroll'

export function SmoothScroll() {
  useEffect(() => {
    let frameId = 0

    const start = () => {
      if (prefersReducedMotion()) return

      const instance = initSmoothScroll()
      if (!instance) return

      const onFrame = (time: number) => {
        instance.raf(time)
        runSmoothScrollFrame(instance)
        frameId = requestAnimationFrame(onFrame)
      }

      frameId = requestAnimationFrame(onFrame)
    }

    const stop = () => {
      cancelAnimationFrame(frameId)
      destroySmoothScroll()
    }

    start()

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onMotionPreferenceChange = () => {
      stop()
      if (!mediaQuery.matches) start()
    }

    mediaQuery.addEventListener('change', onMotionPreferenceChange)

    return () => {
      mediaQuery.removeEventListener('change', onMotionPreferenceChange)
      stop()
    }
  }, [])

  return null
}
