import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  destroySmoothScroll,
  initSmoothScroll,
  prefersReducedMotion,
  runSmoothScrollFrame,
} from '../../lib/smoothScroll'

gsap.registerPlugin(ScrollTrigger)

export function SmoothScroll() {
  useEffect(() => {
    let onTick: ((time: number) => void) | null = null

    const start = () => {
      if (prefersReducedMotion()) return

      const instance = initSmoothScroll()
      if (!instance) return

      // Lenis runs on GSAP's ticker (first in each frame) instead of its own
      // requestAnimationFrame loop, so every scroll-driven animation reads the
      // scroll position Lenis set in the same frame. Two separate loops let
      // them land a frame behind, which showed as micro-stutter.
      onTick = (time) => {
        instance.raf(time * 1000)
        runSmoothScrollFrame(instance)
      }
      gsap.ticker.add(onTick, false, true)
      // No catch-up jumps after a slow frame; Lenis already eases.
      gsap.ticker.lagSmoothing(0)
      instance.on('scroll', ScrollTrigger.update)
    }

    const stop = () => {
      if (onTick) gsap.ticker.remove(onTick)
      onTick = null
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
