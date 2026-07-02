import { animate, type AnimationPlaybackControls, useMotionValue } from 'framer-motion'
import {
  type RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react'
import {
  FEATURE_STEP_INDICATOR_TRANSITION,
  FEATURE_STEP_ROTATION,
} from '../lib/featureStepMotion'

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function useFeatureStepTimeline(
  shellRef: RefObject<HTMLElement | null>,
  stepRefs: RefObject<(HTMLElement | null)[]>,
  targetIndex: number,
  stepCount: number,
) {
  const indicatorRef = useRef<HTMLSpanElement>(null)
  const indicatorY = useMotionValue(0)
  const indicatorRotate = useMotionValue(0)
  const positionsRef = useRef<number[]>([])
  const animationsRef = useRef<AnimationPlaybackControls[]>([])
  const hasInitializedRef = useRef(false)
  const targetRef = useRef(targetIndex)

  targetRef.current = targetIndex

  const stopAnimations = useCallback(() => {
    animationsRef.current.forEach((animation) => animation.stop())
    animationsRef.current = []
  }, [])

  const measure = useCallback(() => {
    const shell = shellRef.current
    if (!shell) return []

    const shellRect = shell.getBoundingClientRect()
    return stepRefs.current.slice(0, stepCount).map((step) => {
      if (!step) return 0

      const title = step.querySelector<HTMLElement>('.feature-step-title')
      const anchor = step.querySelector<HTMLElement>('.feature-step-indicator-anchor')

      if (!title) {
        return step.getBoundingClientRect().top - shellRect.top
      }

      const titleRect = title.getBoundingClientRect()
      const indicatorSize = anchor?.offsetHeight ?? 0
      const lineHeight = Number.parseFloat(getComputedStyle(title).lineHeight) || titleRect.height
      const verticalOffset = Math.max(0, (lineHeight - indicatorSize) / 2)

      return titleRect.top - shellRect.top + verticalOffset
    })
  }, [shellRef, stepRefs, stepCount])

  const syncIndicator = useCallback(
    (index: number, animateMotion: boolean) => {
      const positions = positionsRef.current
      if (positions.length === 0) return

      const nextY = positions[index] ?? 0
      const nextRotation = index * FEATURE_STEP_ROTATION

      stopAnimations()

      if (prefersReducedMotion() || !animateMotion) {
        indicatorY.set(nextY)
        indicatorRotate.set(nextRotation)
        return
      }

      const yAnimation = animate(indicatorY, nextY, FEATURE_STEP_INDICATOR_TRANSITION)
      const rotateAnimation = animate(
        indicatorRotate,
        nextRotation,
        FEATURE_STEP_INDICATOR_TRANSITION,
      )
      animationsRef.current = [yAnimation, rotateAnimation]
    },
    [indicatorRotate, indicatorY, stopAnimations],
  )

  useLayoutEffect(() => {
    let frameId = 0

    const scheduleMeasure = () => {
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(() => {
        frameId = requestAnimationFrame(() => {
          positionsRef.current = measure()
          if (positionsRef.current.length === 0) return

          if (!hasInitializedRef.current) {
            hasInitializedRef.current = true
            syncIndicator(targetRef.current, false)
            return
          }

          syncIndicator(targetRef.current, !prefersReducedMotion())
        })
      })
    }

    scheduleMeasure()
    window.addEventListener('resize', scheduleMeasure)

    let resizeObserver: ResizeObserver | undefined
    if (shellRef.current && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(scheduleMeasure)
      resizeObserver.observe(shellRef.current)
    }

    if (document.fonts?.ready) {
      void document.fonts.ready.then(scheduleMeasure)
    }

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', scheduleMeasure)
      resizeObserver?.disconnect()
    }
  }, [measure, shellRef, stepCount, syncIndicator])

  useEffect(() => {
    if (!hasInitializedRef.current) return
    syncIndicator(targetIndex, !prefersReducedMotion())
  }, [syncIndicator, targetIndex])

  useEffect(() => stopAnimations, [stopAnimations])

  return {
    indicatorRef,
    indicatorY,
    indicatorRotate,
    remeasure: measure,
  }
}
