const NAV_BRAND_SCROLL_START = 480
const NAV_BRAND_SCROLL_END = 820
const BRAND_FULL_SLOT_REM = 3.25
const BRAND_MIN_SCALE = 0.06

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function smoothstep(value: number) {
  return value * value * (3 - 2 * value)
}

export function getNavBrandScrollProgress(scrollY: number) {
  if (scrollY <= NAV_BRAND_SCROLL_START) return 0

  const linear = clamp(
    (scrollY - NAV_BRAND_SCROLL_START) / (NAV_BRAND_SCROLL_END - NAV_BRAND_SCROLL_START),
    0,
    1,
  )

  return smoothstep(linear)
}

export function applyNavBrandScrollAnimation(
  element: HTMLElement | null,
  scrollY: number,
) {
  if (!element) return

  const progress = getNavBrandScrollProgress(scrollY)
  const slotRem = progress * BRAND_FULL_SLOT_REM
  const scale = Math.max(BRAND_MIN_SCALE, progress)

  element.style.setProperty('--nav-brand-slot-width', `${slotRem.toFixed(4)}rem`)
  element.style.setProperty('--nav-brand-scale', scale.toFixed(4))
  element.style.setProperty('--nav-brand-reveal-progress', progress.toFixed(4))
  element.classList.toggle('site-header-nav-brand-visible', progress > 0.01)
}

export function resetNavBrandScrollAnimation(element: HTMLElement | null) {
  if (!element) return

  element.style.setProperty('--nav-brand-slot-width', '0rem')
  element.style.setProperty('--nav-brand-scale', String(BRAND_MIN_SCALE))
  element.style.setProperty('--nav-brand-reveal-progress', '0')
  element.classList.remove('site-header-nav-brand-visible')
}
