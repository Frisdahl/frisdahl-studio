import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from 'react'

const DEFAULT_DRAG_THRESHOLD_PX = 6
const DEFAULT_SNAP_RATIO = 0.5
const DEFAULT_AXIS_LOCK_RATIO = 1
const MOMENTUM_MS = 220
const TRACK_TRANSITION = 'transform 1100ms cubic-bezier(0.22, 1, 0.36, 1)'

interface DragState {
  pointerId: number
  startX: number
  startY: number
  startIndex: number
  axis: 'x' | 'y' | null
  lastX: number
  lastTime: number
  velocityX: number
}

interface UseHorizontalDragSliderOptions {
  slideCount: number
  slidesPerView?: number
  enabled?: boolean
  dragThresholdPx?: number
  snapRatio?: number
  axisLockRatio?: number
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function resolveSnapIndex(
  startIndex: number,
  deltaX: number,
  stepValue: number,
  maxIndex: number,
  snapRatio: number,
  velocityX = 0,
) {
  const projectedDelta = deltaX + velocityX * MOMENTUM_MS
  const movedSlides = -projectedDelta / stepValue

  if (Math.abs(movedSlides) < snapRatio) {
    return clamp(startIndex, 0, maxIndex)
  }

  const direction = movedSlides > 0 ? 1 : -1
  const slideDelta = Math.max(1, Math.round(Math.abs(movedSlides)))

  return clamp(startIndex + direction * slideDelta, 0, maxIndex)
}

function readSliderMetrics(
  track: HTMLElement | null,
  viewport: HTMLElement | null,
  slider: HTMLElement | null,
  slidesPerView: number,
) {
  const firstSlide = track?.firstElementChild as HTMLElement | null
  let slideWidth = firstSlide?.getBoundingClientRect().width ?? 0

  const trackStyles = track ? getComputedStyle(track) : null
  const sliderStyles = slider ? getComputedStyle(slider) : null
  const gapValue = trackStyles?.columnGap || trackStyles?.gap || sliderStyles?.getPropertyValue('--slide-gap')
  const slideGap = Number.parseFloat(gapValue ?? '') || 20

  if (slideWidth === 0 && viewport && slidesPerView > 0) {
    slideWidth = (viewport.clientWidth - slideGap * (slidesPerView - 1)) / slidesPerView
  }

  return {
    step: slideWidth + slideGap,
  }
}

export function useHorizontalDragSlider({
  slideCount,
  slidesPerView = 1,
  enabled = true,
  dragThresholdPx = DEFAULT_DRAG_THRESHOLD_PX,
  snapRatio = DEFAULT_SNAP_RATIO,
  axisLockRatio = DEFAULT_AXIS_LOCK_RATIO,
}: UseHorizontalDragSliderOptions) {
  const sliderRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const dragStateRef = useRef<DragState | null>(null)
  const didDragRef = useRef(false)
  const stepRef = useRef(0)
  const activeIndexRef = useRef(0)

  const [activeIndex, setActiveIndex] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [step, setStep] = useState(0)

  const maxIndex = Math.max(0, slideCount - slidesPerView)

  const clampIndex = useCallback(
    (index: number) => Math.max(0, Math.min(maxIndex, index)),
    [maxIndex],
  )

  activeIndexRef.current = activeIndex

  const goToPrevious = useCallback(() => {
    setActiveIndex((index) => clampIndex(index - 1))
  }, [clampIndex])

  const goToNext = useCallback(() => {
    setActiveIndex((index) => clampIndex(index + 1))
  }, [clampIndex])

  useEffect(() => {
    setActiveIndex((index) => clampIndex(index))
  }, [clampIndex, slideCount, slidesPerView])

  useLayoutEffect(() => {
    const track = trackRef.current
    const slider = sliderRef.current
    const viewport = viewportRef.current
    if (!track || !slider || !viewport) return

    const syncSlideStep = () => {
      const metrics = readSliderMetrics(track, viewport, slider, slidesPerView)
      stepRef.current = metrics.step
      setStep(metrics.step)
    }

    syncSlideStep()

    const observer = new ResizeObserver(syncSlideStep)
    observer.observe(track)
    observer.observe(slider)
    observer.observe(viewport)

    return () => observer.disconnect()
  }, [slideCount, slidesPerView])

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport || !enabled) return

    const resetDrag = () => {
      dragStateRef.current = null
      setDragOffset(0)
      setIsDragging(false)
    }

    const settleDrag = (
      startIndex: number,
      deltaX: number,
      stepValue: number,
      velocityX: number,
    ) => {
      const nextIndex = resolveSnapIndex(
        startIndex,
        deltaX,
        stepValue,
        maxIndex,
        snapRatio,
        velocityX,
      )
      const releaseOffset = deltaX + (nextIndex - startIndex) * stepValue

      dragStateRef.current = null
      setActiveIndex(nextIndex)
      setIsDragging(false)
      setDragOffset(releaseOffset)

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setDragOffset(0)
        })
      })
    }

    const finishDrag = (event: PointerEvent) => {
      const dragState = dragStateRef.current
      if (!dragState || dragState.pointerId !== event.pointerId) return

      if (viewport.hasPointerCapture(event.pointerId)) {
        viewport.releasePointerCapture(event.pointerId)
      }

      if (dragState.axis === 'x') {
        const deltaX = event.clientX - dragState.startX
        const stepValue = stepRef.current

        if (stepValue > 0) {
          settleDrag(dragState.startIndex, deltaX, stepValue, dragState.velocityX)
        } else {
          resetDrag()
        }
      } else {
        didDragRef.current = false
        resetDrag()
      }
    }

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0 || slideCount <= slidesPerView) return

      didDragRef.current = false
      dragStateRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        startIndex: activeIndexRef.current,
        axis: null,
        lastX: event.clientX,
        lastTime: performance.now(),
        velocityX: 0,
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      const dragState = dragStateRef.current
      if (!dragState || dragState.pointerId !== event.pointerId) return

      const deltaX = event.clientX - dragState.startX
      const deltaY = event.clientY - dragState.startY

      if (dragState.axis === null) {
        if (Math.abs(deltaX) < dragThresholdPx && Math.abs(deltaY) < dragThresholdPx) {
          return
        }

        if (
          Math.abs(deltaY) > Math.abs(deltaX) * axisLockRatio &&
          Math.abs(deltaY) > dragThresholdPx * 2
        ) {
          resetDrag()
          return
        }

        dragState.axis = 'x'
        setIsDragging(true)
        viewport.setPointerCapture(event.pointerId)
      }

      if (dragState.axis !== 'x') return

      const now = performance.now()
      const elapsed = now - dragState.lastTime

      if (elapsed > 0) {
        dragState.velocityX = (event.clientX - dragState.lastX) / elapsed
      }

      dragState.lastX = event.clientX
      dragState.lastTime = now

      if (!didDragRef.current && Math.abs(deltaX) > dragThresholdPx) {
        didDragRef.current = true
      }

      if (didDragRef.current) {
        event.preventDefault()
      }

      const stepValue = stepRef.current
      const maxDragRight = dragState.startIndex * stepValue
      const maxDragLeft = (maxIndex - dragState.startIndex) * stepValue
      setDragOffset(clamp(deltaX, -maxDragLeft, maxDragRight))
    }

    const onClickCapture = (event: MouseEvent) => {
      if (!didDragRef.current) return

      event.preventDefault()
      event.stopPropagation()
      didDragRef.current = false
    }

    viewport.addEventListener('pointerdown', onPointerDown)
    viewport.addEventListener('pointermove', onPointerMove, { passive: false })
    viewport.addEventListener('pointerup', finishDrag)
    viewport.addEventListener('pointercancel', finishDrag)
    viewport.addEventListener('click', onClickCapture, true)

    return () => {
      viewport.removeEventListener('pointerdown', onPointerDown)
      viewport.removeEventListener('pointermove', onPointerMove)
      viewport.removeEventListener('pointerup', finishDrag)
      viewport.removeEventListener('pointercancel', finishDrag)
      viewport.removeEventListener('click', onClickCapture, true)
    }
  }, [axisLockRatio, clampIndex, dragThresholdPx, enabled, maxIndex, slideCount, slidesPerView, snapRatio])

  const translateX = -activeIndex * step + dragOffset

  const scrollUnit =
    step > 0 ? clamp(activeIndex - dragOffset / step, 0, maxIndex) : activeIndex

  const pageCount = maxIndex + 1
  const progress =
    pageCount > 0 ? ((scrollUnit + 1) / pageCount) * 100 : 100

  const indicatorIndex = Math.round(scrollUnit)

  const trackStyle = {
    transform: `translate3d(${translateX}px, 0, 0)`,
    transition: isDragging ? 'none' : TRACK_TRANSITION,
  } as CSSProperties

  return {
    sliderRef: sliderRef as RefObject<HTMLDivElement>,
    viewportRef: viewportRef as RefObject<HTMLDivElement>,
    trackRef: trackRef as RefObject<HTMLDivElement>,
    activeIndex,
    setActiveIndex,
    isDragging,
    isFirstSlide: activeIndex === 0,
    isLastSlide: activeIndex >= maxIndex,
    progress,
    indicatorIndex,
    trackStyle,
    goToPrevious,
    goToNext,
    pageCount: maxIndex + 1,
  }
}
