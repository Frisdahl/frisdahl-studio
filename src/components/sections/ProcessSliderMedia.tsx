import type { ProcessSliderStep } from '../../types/process'

export { getSlideLeadingGapVw, getSlideWidthVw, getTrackOffsetVw } from '../../lib/processSliderTrack'

interface ProcessSliderMediaProps {
  step: ProcessSliderStep
  loading: 'eager' | 'lazy'
}

export function ProcessSliderMedia({ step, loading }: ProcessSliderMediaProps) {
  const layout = step.layout ?? 'single'
  const mediaPosition = step.mediaPosition ?? 'right'

  if (layout === 'horizontal-reveal') {
    return (
      <div
        className="process-slider-media process-slider-media--horizontal-reveal"
        data-position={step.mediaPosition ?? 'right'}
      >
        <img
          src={step.imageSrc}
          alt={step.imageAlt}
          className="process-slider-image"
          loading={loading}
          decoding="async"
        />
      </div>
    )
  }

  if (layout === 'dual-portrait' && step.imageSrcSecondary && step.imageAltSecondary) {
    return (
      <div
        className="process-slider-media process-slider-media--dual"
        data-position={mediaPosition}
      >
        <img
          src={step.imageSrc}
          alt={step.imageAlt}
          className="process-slider-media-portrait process-slider-media-portrait--primary"
          loading={loading}
          decoding="async"
        />
        <img
          src={step.imageSrcSecondary}
          alt={step.imageAltSecondary}
          className="process-slider-media-portrait process-slider-media-portrait--secondary"
          loading="lazy"
          decoding="async"
        />
      </div>
    )
  }

  return (
    <div className="process-slider-media" data-position={mediaPosition}>
      <img
        src={step.imageSrc}
        alt={step.imageAlt}
        className="process-slider-image"
        loading={loading}
        decoding="async"
      />
    </div>
  )
}

export function getSlideClassName(step: ProcessSliderStep) {
  const layout = step.layout ?? 'single'
  const mediaPosition = step.mediaPosition ?? 'right'

  return [
    'process-slider-slide',
    layout !== 'single' ? `process-slider-slide--${layout}` : '',
    step.imageOnly ? 'process-slider-slide--image-only' : '',
    mediaPosition === 'left' ? 'process-slider-slide--media-left' : '',
  ]
    .filter(Boolean)
    .join(' ')
}
