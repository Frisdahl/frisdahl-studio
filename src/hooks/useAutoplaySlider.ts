import { useCallback, useEffect, useRef, useState } from 'react'

const DEFAULT_DURATION_MS = 6000

interface UseAutoplaySliderOptions {
  slideCount: number
  durationMs?: number
  paused?: boolean
}

export function useAutoplaySlider({
  slideCount,
  durationMs = DEFAULT_DURATION_MS,
  paused = false,
}: UseAutoplaySliderOptions) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [slideProgress, setSlideProgress] = useState(0)
  const activeIndexRef = useRef(activeIndex)

  useEffect(() => {
    activeIndexRef.current = activeIndex
  }, [activeIndex])

  const goToSlide = useCallback(
    (index: number) => {
      if (slideCount <= 0) return
      const nextIndex = ((index % slideCount) + slideCount) % slideCount
      setActiveIndex(nextIndex)
      setSlideProgress(0)
    },
    [slideCount],
  )

  const goToNext = useCallback(() => {
    goToSlide(activeIndexRef.current + 1)
  }, [goToSlide])

  const goToPrevious = useCallback(() => {
    goToSlide(activeIndexRef.current - 1)
  }, [goToSlide])

  useEffect(() => {
    if (slideCount <= 1 || paused) return

    let frameId = 0
    let startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(1, elapsed / durationMs)

      setSlideProgress(progress)

      if (progress >= 1) {
        setActiveIndex((index) => (index + 1) % slideCount)
        setSlideProgress(0)
        startTime = now
      }

      frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frameId)
  }, [activeIndex, durationMs, paused, slideCount])

  const totalProgress =
    slideCount > 0 ? ((activeIndex + slideProgress) / slideCount) * 100 : 0

  return {
    activeIndex,
    slideProgress,
    totalProgress,
    goToSlide,
    goToNext,
    goToPrevious,
  }
}
