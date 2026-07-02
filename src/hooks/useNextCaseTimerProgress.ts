import { type RefObject, useEffect, useState } from 'react'

const TIMER_DURATION_MS = 5000
const VISIBLE_THRESHOLD_RATIO = 0.8
const REVEAL_COMPLETE_THRESHOLD = 0.98
const DISPLAY_DECAY_PER_MS = 0.0025

function getScrollRevealProgress(rect: DOMRect, viewportHeight: number, imageHeight: number) {
  if (imageHeight <= 0) return 0
  if (rect.bottom <= 0) return 1
  if (rect.top >= viewportHeight) return 0

  return Math.min(1, Math.max(0, (viewportHeight - rect.top) / imageHeight))
}

function getVisibleRatio(rect: DOMRect, viewportHeight: number, imageHeight: number) {
  if (imageHeight <= 0) return 0

  const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0)

  return Math.min(1, Math.max(0, visibleHeight / imageHeight))
}

function isOverImage(rect: DOMRect, viewportHeight: number) {
  return rect.bottom > 0 && rect.top < viewportHeight
}

export interface NextCaseTimerState {
  progress: number
  displayProgress: number
  revealProgress: number
  isRevealed: boolean
}

export function useNextCaseTimerProgress(
  mediaRef: RefObject<HTMLElement | null>,
  shouldReduceMotion: boolean | null,
): NextCaseTimerState {
  const [progress, setProgress] = useState(0)
  const [displayProgress, setDisplayProgress] = useState(0)
  const [revealProgress, setRevealProgress] = useState(0)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    let rafId = 0
    let displayRafId = 0
    let timerStart: number | null = null
    let thresholdReached = false
    let lastTargetProgress = 0
    let lastDisplayProgress = 0
    let lastRevealProgress = 0
    let lastFrameTime = performance.now()
    let lastRevealed = false

    const resetTimer = () => {
      timerStart = null
      thresholdReached = false
    }

    const tick = () => {
      const media = mediaRef.current

      if (!media) {
        resetTimer()
        lastTargetProgress = 0
        lastRevealProgress = 0
        setProgress(0)
        setRevealProgress(0)
        if (lastRevealed) {
          lastRevealed = false
          setIsRevealed(false)
        }
        return
      }

      const rect = media.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const imageHeight = media.offsetHeight

      const nextReveal = shouldReduceMotion
        ? isOverImage(rect, viewportHeight)
          ? 1
          : 0
        : getScrollRevealProgress(rect, viewportHeight, imageHeight)

      if (Math.abs(nextReveal - lastRevealProgress) > 0.001) {
        lastRevealProgress = nextReveal
        setRevealProgress(nextReveal)
      }

      const revealed = lastRevealProgress >= REVEAL_COMPLETE_THRESHOLD

      if (revealed !== lastRevealed) {
        lastRevealed = revealed
        setIsRevealed(revealed)
      }

      if (!isOverImage(rect, viewportHeight)) {
        resetTimer()
        lastTargetProgress = 0
        setProgress(0)
        return
      }

      const visibleRatio = getVisibleRatio(rect, viewportHeight, imageHeight)

      if (!thresholdReached) {
        if (!revealed || visibleRatio < VISIBLE_THRESHOLD_RATIO) {
          if (lastTargetProgress !== 0) {
            lastTargetProgress = 0
            setProgress(0)
          }
          return
        }

        thresholdReached = true
        timerStart = performance.now()
      } else if (!revealed || visibleRatio < VISIBLE_THRESHOLD_RATIO) {
        resetTimer()
        lastTargetProgress = 0
        setProgress(0)
        return
      }

      const elapsed = performance.now() - (timerStart ?? performance.now())
      const nextProgress = Math.min(1, elapsed / TIMER_DURATION_MS)

      if (Math.abs(nextProgress - lastTargetProgress) > 0.001) {
        lastTargetProgress = nextProgress
        setProgress(nextProgress)
      }

      if (nextProgress < 1) {
        rafId = requestAnimationFrame(tick)
      }
    }

    const animateDisplay = (now: number) => {
      const delta = now - lastFrameTime
      lastFrameTime = now

      if (lastDisplayProgress < lastTargetProgress) {
        lastDisplayProgress = lastTargetProgress
      } else if (lastDisplayProgress > lastTargetProgress) {
        const step = delta * DISPLAY_DECAY_PER_MS
        lastDisplayProgress = Math.max(lastTargetProgress, lastDisplayProgress - step)
      }

      setDisplayProgress(lastDisplayProgress)
      displayRafId = requestAnimationFrame(animateDisplay)
    }

    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(tick)
    }

    lastFrameTime = performance.now()
    tick()
    displayRafId = requestAnimationFrame(animateDisplay)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(rafId)
      cancelAnimationFrame(displayRafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [mediaRef, shouldReduceMotion])

  return { progress, displayProgress, revealProgress, isRevealed }
}
