import type { ProcessSliderStep } from '../types/process'

const HORIZONTAL_REVEAL_SLIDE_VW = 150
const STANDARD_SLIDE_VW = 100
const GAP_AFTER_HORIZONTAL_VW = 8

export function getSlideLeadingGapVw(index: number, steps: readonly ProcessSliderStep[]) {
  if (index === 0) return 0

  const previous = steps[index - 1]
  const current = steps[index]

  if (previous?.layout === 'horizontal-reveal') {
    return GAP_AFTER_HORIZONTAL_VW
  }

  if (current?.layout === 'horizontal-reveal') {
    return GAP_AFTER_HORIZONTAL_VW
  }

  return 0
}

export function getSlideWidthVw(index: number, steps: readonly ProcessSliderStep[]) {
  const step = steps[index]

  if (step?.layout === 'horizontal-reveal' && !step.imageOnly) {
    return HORIZONTAL_REVEAL_SLIDE_VW
  }

  return STANDARD_SLIDE_VW
}

interface TrackMetrics {
  slideStartPx: number[]
  slideWidthPx: number[]
  maxOffsetPx: number
}

export function buildTrackMetrics(steps: readonly ProcessSliderStep[], vwPx: number): TrackMetrics {
  const slideStartPx: number[] = []
  const slideWidthPx: number[] = []
  let cursor = 0

  for (let index = 0; index < steps.length; index++) {
    const gapPx = getSlideLeadingGapVw(index, steps) * vwPx
    const widthPx = getSlideWidthVw(index, steps) * vwPx

    slideStartPx.push(cursor + gapPx)
    slideWidthPx.push(widthPx)
    cursor += gapPx + widthPx
  }

  const metrics = { slideStartPx, slideWidthPx, maxOffsetPx: 0 }
  metrics.maxOffsetPx =
    steps.length > 0 ? getTrackOffsetPx(steps.length - 1, 1, metrics) : 0

  return metrics
}

export function getTrackOffsetFromProgress(progress: number, metrics: TrackMetrics) {
  return metrics.maxOffsetPx * clamp01(progress)
}

export function getVisibleIndexFromOffset(offsetPx: number, metrics: TrackMetrics) {
  const { slideStartPx, slideWidthPx } = metrics
  const slideCount = slideStartPx.length

  if (slideCount === 0) return 0

  for (let index = slideCount - 1; index >= 0; index--) {
    const start = slideStartPx[index] ?? 0
    if (offsetPx + 1 >= start) {
      const width = slideWidthPx[index] ?? 1
      const transitionProgress = width > 0 ? (offsetPx - start) / width : 0
      return Math.min(slideCount - 1, index + Math.round(clamp01(transitionProgress)))
    }
  }

  return 0
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value))
}

export function getScrollProgressForSlideIndex(index: number, metrics: TrackMetrics) {
  if (metrics.maxOffsetPx <= 0) return 0
  return (metrics.slideStartPx[index] ?? 0) / metrics.maxOffsetPx
}

export function getTrackOffsetPx(
  activeIndex: number,
  transitionProgress: number,
  metrics: TrackMetrics,
) {
  const start = metrics.slideStartPx[activeIndex] ?? 0
  const width = metrics.slideWidthPx[activeIndex] ?? 0
  return start + width * transitionProgress
}

export function getTrackOffsetVw(
  activeIndex: number,
  transitionProgress: number,
  steps: readonly ProcessSliderStep[],
) {
  let offset = 0

  for (let index = 0; index < activeIndex; index++) {
    offset += getSlideLeadingGapVw(index, steps) + getSlideWidthVw(index, steps)
  }

  offset +=
    getSlideLeadingGapVw(activeIndex, steps) +
    getSlideWidthVw(activeIndex, steps) * transitionProgress

  return offset
}
