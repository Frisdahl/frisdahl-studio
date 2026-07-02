import { type RefObject, useEffect, useRef } from 'react'
import type { ProcessSliderStep } from '../types/process'
import {
  buildTrackMetrics,
  getTrackOffsetFromProgress,
  getVisibleIndexFromOffset,
} from '../lib/processSliderTrack'
import { getSmoothScroll, onSmoothScrollFrame } from '../lib/smoothScroll'

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function getViewportWidthPx() {
  return document.documentElement.clientWidth / 100
}

function measureScrollable(element: HTMLElement) {
  const sticky = element.querySelector<HTMLElement>('.process-slider-sticky')
  const viewportHeight = sticky?.offsetHeight ?? window.innerHeight
  const scrollable = element.offsetHeight - viewportHeight

  return scrollable > 0 ? scrollable : 0
}

interface UseProcessSliderMotionOptions {
  scrollRef: RefObject<HTMLElement | null>
  trackRef: RefObject<HTMLElement | null>
  progressRef: RefObject<HTMLElement | null>
  statusRef: RefObject<HTMLElement | null>
  slideRefs: RefObject<(HTMLElement | null)[]>
  steps: readonly ProcessSliderStep[]
  statusTemplate: string
}

export function useProcessSliderMotion({
  scrollRef,
  trackRef,
  progressRef,
  statusRef,
  slideRefs,
  steps,
  statusTemplate,
}: UseProcessSliderMotionOptions) {
  const metricsRef = useRef(buildTrackMetrics(steps, getViewportWidthPx()))
  const scrollableRef = useRef(0)
  const lastOffsetPxRef = useRef(-1)
  const lastProgressRef = useRef(-1)
  const lastVisibleIndexRef = useRef(-1)

  useEffect(() => {
    const slideCount = steps.length
    if (slideCount <= 1) return

    let frameId = 0
    let isActive = true
    let unsubscribeFrame: (() => void) | undefined
    let resizeObserver: ResizeObserver | undefined

    const rebuildMetrics = () => {
      metricsRef.current = buildTrackMetrics(steps, getViewportWidthPx())
      lastOffsetPxRef.current = -1
      lastProgressRef.current = -1
    }

    const remeasureScrollable = () => {
      const element = scrollRef.current
      if (!element) return

      scrollableRef.current = measureScrollable(element)
    }

    const setVisibleSlide = (visibleIndex: number) => {
      if (visibleIndex === lastVisibleIndexRef.current) return

      const slides = slideRefs.current
      for (let index = 0; index < slideCount; index++) {
        slides[index]?.setAttribute('aria-hidden', index === visibleIndex ? 'false' : 'true')
      }

      const status = statusRef.current
      if (status) {
        status.textContent = statusTemplate
          .replace('{current}', String(visibleIndex + 1))
          .replace('{total}', String(slideCount))
      }

      lastVisibleIndexRef.current = visibleIndex
    }

    const update = () => {
      if (!isActive) return

      const element = scrollRef.current
      const track = trackRef.current
      if (!element || !track) return

      const scrollable = scrollableRef.current

      if (scrollable <= 0) {
        if (lastOffsetPxRef.current !== 0) {
          track.style.transform = 'translate3d(0, 0, 0)'
          lastOffsetPxRef.current = 0
        }

        const progressFill = progressRef.current
        if (progressFill && lastProgressRef.current !== 0) {
          progressFill.style.transform = 'scaleX(0)'
          lastProgressRef.current = 0
        }

        setVisibleSlide(0)
        return
      }

      const scrolled = clamp(-element.getBoundingClientRect().top, 0, scrollable)
      const progress = scrolled / scrollable
      const offsetPx = getTrackOffsetFromProgress(progress, metricsRef.current)

      track.style.transform = `translate3d(${-offsetPx}px, 0, 0)`
      lastOffsetPxRef.current = offsetPx

      const progressFill = progressRef.current
      if (progressFill) {
        progressFill.style.transform = `scaleX(${progress})`
        lastProgressRef.current = progress
      }

      setVisibleSlide(getVisibleIndexFromOffset(offsetPx, metricsRef.current))
    }

    const onResize = () => {
      rebuildMetrics()
      remeasureScrollable()
      update()
    }

    rebuildMetrics()
    remeasureScrollable()
    update()

    const syncAfterLayout = () => {
      remeasureScrollable()
      update()
    }

    requestAnimationFrame(syncAfterLayout)

    const element = scrollRef.current
    if (element && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        remeasureScrollable()
        update()
      })
      resizeObserver.observe(element)

      const sticky = element.querySelector('.process-slider-sticky')
      if (sticky) resizeObserver.observe(sticky)
    }

    const lenis = getSmoothScroll()
    if (lenis) {
      unsubscribeFrame = onSmoothScrollFrame(() => {
        update()
      })
    } else {
      const onScroll = () => {
        cancelAnimationFrame(frameId)
        frameId = requestAnimationFrame(update)
      }

      window.addEventListener('scroll', onScroll, { passive: true })
      unsubscribeFrame = () => {
        cancelAnimationFrame(frameId)
        window.removeEventListener('scroll', onScroll)
      }
    }

    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      isActive = false
      unsubscribeFrame?.()
      resizeObserver?.disconnect()
      window.removeEventListener('resize', onResize)
    }
  }, [scrollRef, trackRef, progressRef, statusRef, slideRefs, steps, statusTemplate])
}
