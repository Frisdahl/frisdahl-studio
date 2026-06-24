import { useEffect, useRef, useState, type RefObject } from 'react'

const LERP_FACTOR = 0.085
const PROGRESS_EPSILON = 0.0008

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

function easeOutCubic(value: number) {
  return 1 - (1 - value) ** 3
}

/** Animation completes when the element center reaches this fraction of viewport height. */
const REVEAL_COMPLETE_VIEWPORT_RATIO = 0.62

function computeRevealProgress(element: HTMLElement) {
  const rect = element.getBoundingClientRect()
  const viewportHeight = window.innerHeight

  const startTop = viewportHeight
  const endTop = viewportHeight * REVEAL_COMPLETE_VIEWPORT_RATIO - rect.height / 2
  const range = startTop - endTop

  if (range <= 0) {
    return rect.top <= endTop ? 1 : 0
  }

  return easeOutCubic(clamp((startTop - rect.top) / range))
}

export function usePromoVideoReveal(frameRef: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0)
  const targetRef = useRef(0)
  const displayRef = useRef(0)
  const lockedProgressRef = useRef(0)
  const lastScrollYRef = useRef(0)
  const frameIdRef = useRef(0)

  useEffect(() => {
    const element = frameRef.current
    if (!element) return

    const updateTarget = () => {
      const scrollY = window.scrollY
      const scrollingDown = scrollY >= lastScrollYRef.current
      const target = computeRevealProgress(element)

      if (scrollingDown) {
        const next = Math.max(lockedProgressRef.current, target)
        lockedProgressRef.current = next
        targetRef.current = next
      } else {
        lockedProgressRef.current = target
        targetRef.current = target
      }

      lastScrollYRef.current = scrollY
    }

    const animate = () => {
      const delta = targetRef.current - displayRef.current

      if (Math.abs(delta) > PROGRESS_EPSILON) {
        displayRef.current += delta * LERP_FACTOR
        setProgress(displayRef.current)
        frameIdRef.current = requestAnimationFrame(animate)
        return
      }

      if (displayRef.current !== targetRef.current) {
        displayRef.current = targetRef.current
        setProgress(displayRef.current)
      }
    }

    const onScroll = () => {
      updateTarget()
      cancelAnimationFrame(frameIdRef.current)
      frameIdRef.current = requestAnimationFrame(animate)
    }

    lastScrollYRef.current = window.scrollY
    updateTarget()
    displayRef.current = targetRef.current
    setProgress(targetRef.current)
    frameIdRef.current = requestAnimationFrame(animate)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(frameIdRef.current)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [frameRef])

  return progress
}
