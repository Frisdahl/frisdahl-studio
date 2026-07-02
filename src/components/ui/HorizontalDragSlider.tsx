import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from 'react'
import { useHorizontalDragSlider } from '../../hooks/useHorizontalDragSlider'

interface HorizontalDragSliderProps {
  ariaLabel: string
  prevLabel: string
  nextLabel: string
  statusTemplate: string
  slideCount: number
  slidesPerView?: number
  resetKey?: string | number
  className?: string
  dragThresholdPx?: number
  snapRatio?: number
  axisLockRatio?: number
  children: ReactNode
}

export function HorizontalDragSlider({
  ariaLabel,
  prevLabel,
  nextLabel,
  statusTemplate,
  slideCount,
  slidesPerView = 1,
  resetKey,
  className = '',
  dragThresholdPx,
  snapRatio,
  axisLockRatio,
  children,
}: HorizontalDragSliderProps) {
  const {
    sliderRef,
    viewportRef,
    trackRef,
    activeIndex,
    setActiveIndex,
    isDragging,
    isFirstSlide,
    isLastSlide,
    progress,
    indicatorIndex,
    trackStyle,
    goToPrevious,
    goToNext,
    pageCount,
  } = useHorizontalDragSlider({
    slideCount,
    slidesPerView,
    dragThresholdPx,
    snapRatio,
    axisLockRatio,
  })

  useEffect(() => {
    if (resetKey === undefined) return
    setActiveIndex(0)
  }, [resetKey, setActiveIndex])

  const sliderClassName = ['horizontal-drag-slider', className].filter(Boolean).join(' ')
  const viewportClassName = [
    'horizontal-drag-slider-viewport',
    isDragging ? 'horizontal-drag-slider-viewport-dragging' : '',
  ]
    .filter(Boolean)
    .join(' ')
  const trackClassName = [
    'horizontal-drag-slider-track',
    isDragging ? 'horizontal-drag-slider-track-dragging' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const statusLabel = statusTemplate
    .replace(
      '{current}',
      String(Math.min(indicatorIndex + slidesPerView, slideCount)),
    )
    .replace('{total}', String(slideCount))

  const progressFillClassName = [
    'horizontal-drag-slider-progress-fill',
    isDragging ? 'horizontal-drag-slider-progress-fill-dragging' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div ref={sliderRef} className={sliderClassName} aria-label={ariaLabel}>
      <div ref={viewportRef} className={viewportClassName}>
        <div ref={trackRef} className={trackClassName} style={trackStyle}>
          {Children.map(children, (child, index) => {
            if (!isValidElement(child)) return child

            return cloneElement(child as ReactElement<{ 'aria-hidden'?: boolean }>, {
              'aria-hidden':
                index < activeIndex || index >= activeIndex + slidesPerView,
            })
          })}
        </div>
      </div>

      <div className="horizontal-drag-slider-controls">
        <button
          type="button"
          className="horizontal-drag-slider-btn"
          onClick={goToPrevious}
          disabled={isFirstSlide}
        >
          {prevLabel}
        </button>

        <div className="horizontal-drag-slider-indicators" aria-hidden>
          {Array.from({ length: pageCount }, (_, index) => (
            <span
              key={index}
              className={`horizontal-drag-slider-indicator ${
                index === indicatorIndex ? 'horizontal-drag-slider-indicator-active' : ''
              }`.trim()}
            />
          ))}
        </div>

        <button
          type="button"
          className="horizontal-drag-slider-btn"
          onClick={goToNext}
          disabled={isLastSlide}
        >
          {nextLabel}
        </button>

        <div className="horizontal-drag-slider-progress" aria-hidden>
          <div
            className={progressFillClassName}
            style={{ '--progress': progress } as CSSProperties}
          />
        </div>
      </div>

      <p className="sr-only">{statusLabel}</p>
    </div>
  )
}
