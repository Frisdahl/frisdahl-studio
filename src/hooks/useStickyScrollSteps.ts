import { type RefObject, useEffect, useState } from 'react'

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export interface StickyScrollStepsState {
  activeIndex: number
  transitionProgress: number
  scrollProgress: number
}

export function useStickyScrollSteps(
  containerRef: RefObject<HTMLElement | null>,
  stepCount: number,
) {
  const [state, setState] = useState<StickyScrollStepsState>({
    activeIndex: 0,
    transitionProgress: 0,
    scrollProgress: 0,
  })

  useEffect(() => {
    if (stepCount <= 1) return

    let frameId = 0

    const update = () => {
      const element = containerRef.current
      if (!element) return

      const { top, height } = element.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const scrollable = height - viewportHeight

      if (scrollable <= 0) {
        setState({ activeIndex: 0, transitionProgress: 0, scrollProgress: 0 })
        return
      }

      const scrolled = clamp(-top, 0, scrollable)
      const progress = scrolled / scrollable
      const scaled = progress * (stepCount - 1)
      const activeIndex = Math.min(Math.floor(scaled + 1e-6), stepCount - 1)
      const transitionProgress = clamp(scaled - activeIndex, 0, 1)

      setState((current) => {
        if (
          current.activeIndex === activeIndex &&
          current.transitionProgress === transitionProgress &&
          current.scrollProgress === progress
        ) {
          return current
        }

        return { activeIndex, transitionProgress, scrollProgress: progress }
      })
    }

    const onScroll = () => {
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [containerRef, stepCount])

  return state
}
