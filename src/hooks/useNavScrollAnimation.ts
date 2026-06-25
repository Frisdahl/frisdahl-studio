const SCROLL_RANGE_START = 250
const SCROLL_RANGE_END = 750

const BRAND_FULL_SLOT_REM = 3.25

/** Brand expansion starts ~42% into scroll range. */
const BRAND_START = 0.42
const BRAND_REVEAL_START = 0.48
const BRAND_REVEAL_END = 0.85

export interface NavScrollAnimation {
  brandRevealProgress: number
  brandExpandProgress: number
  brandSlotRem: number
  brandScale: number
}

export const initialNavScrollAnimation: NavScrollAnimation = {
  brandRevealProgress: 0,
  brandExpandProgress: 0,
  brandSlotRem: 0,
  brandScale: 0.06,
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function smoothstep(edge0: number, edge1: number, value: number) {
  if (edge1 <= edge0) return value >= edge1 ? 1 : 0

  const t = clamp((value - edge0) / (edge1 - edge0), 0, 1)
  return t * t * (3 - 2 * t)
}

export function getNavScrollAnimation(scrollY: number): NavScrollAnimation {
  const scrollProgress = clamp(
    (scrollY - SCROLL_RANGE_START) / (SCROLL_RANGE_END - SCROLL_RANGE_START),
    0,
    1,
  )

  const brandExpandProgress = smoothstep(BRAND_START, 1, scrollProgress)
  const brandRevealProgress = smoothstep(
    BRAND_REVEAL_START,
    BRAND_REVEAL_END,
    scrollProgress,
  )

  const brandSlotRem = brandExpandProgress * BRAND_FULL_SLOT_REM
  const brandScale = Math.max(0.06, brandExpandProgress)

  return {
    brandRevealProgress,
    brandExpandProgress,
    brandSlotRem,
    brandScale,
  }
}

export function applyNavScrollAnimation(
  element: HTMLElement | null,
  animation: NavScrollAnimation,
) {
  if (!element) return

  element.style.setProperty(
    '--nav-brand-reveal-progress',
    animation.brandRevealProgress.toFixed(4),
  )
  element.style.setProperty(
    '--nav-brand-expand-progress',
    animation.brandExpandProgress.toFixed(4),
  )
  element.style.setProperty(
    '--nav-brand-slot-width',
    `${animation.brandSlotRem.toFixed(4)}rem`,
  )
  element.style.setProperty(
    '--nav-brand-scale',
    animation.brandScale.toFixed(4),
  )
}
