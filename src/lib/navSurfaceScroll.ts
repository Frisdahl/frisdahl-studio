const NAV_SURFACE_SCROLL_END = 88

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function smoothstep(value: number) {
  return value * value * (3 - 2 * value)
}

export function getNavSurfaceProgress(scrollY: number) {
  if (scrollY <= 0) return 0

  const linear = clamp(scrollY / NAV_SURFACE_SCROLL_END, 0, 1)
  return smoothstep(linear)
}

export function applyNavSurfaceScroll(
  element: HTMLElement | null,
  scrollY: number,
) {
  if (!element) return

  const progress = getNavSurfaceProgress(scrollY)

  element.style.setProperty('--nav-surface-progress', progress.toFixed(4))
  element.classList.toggle('site-header-nav-surfaced', progress > 0.01)
}

export function resetNavSurfaceScroll(element: HTMLElement | null) {
  if (!element) return

  element.style.setProperty('--nav-surface-progress', '0')
  element.classList.remove('site-header-nav-surfaced')
}
