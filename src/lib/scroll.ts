import Lenis from 'lenis'
import { gsap } from 'gsap'

export const ROUTE_SCROLL_RESET_EVENT = 'route-scroll-reset'

let lenis: Lenis | null = null
/** The one callback that drives Lenis, on GSAP's ticker. */
let driveLenis: ((time: number) => void) | null = null

/**
 * The wheel feels being compared (they differ only in lerp: how quickly the page
 * follows the wheel). The permanent setting is DEFAULT_SCROLL_PRESET; the other
 * two can only be picked in development (see ScrollPresetSwitcher).
 */
export const SCROLL_PRESETS = {
  A: { label: 'Responsive', lerp: 0.14 },
  B: { label: 'Balanced', lerp: 0.1 },
  C: { label: 'Cinematic', lerp: 0.07 },
} as const
export type ScrollPresetName = keyof typeof SCROLL_PRESETS

export const DEFAULT_SCROLL_PRESET: ScrollPresetName = 'B'
const PRESET_STORAGE_KEY = 'frisdahl:scroll-preset'

function isPresetName(value: unknown): value is ScrollPresetName {
  return typeof value === 'string' && value in SCROLL_PRESETS
}

/** Production always uses the default; development also honours ?scroll=A|B|C and the last pick. */
function initialPreset(): ScrollPresetName {
  if (!import.meta.env.DEV) return DEFAULT_SCROLL_PRESET
  try {
    const fromUrl = new URLSearchParams(window.location.search).get('scroll')?.toUpperCase()
    if (isPresetName(fromUrl)) return fromUrl
    const stored = window.localStorage.getItem(PRESET_STORAGE_KEY)
    if (isPresetName(stored)) return stored
  } catch {
    // Storage can be blocked; the default applies.
  }
  return DEFAULT_SCROLL_PRESET
}

let preset: ScrollPresetName = initialPreset()

export function getScrollPreset() {
  return preset
}

/** Development aid: switches the wheel feel on the running Lenis, no reload needed. */
export function setScrollPreset(name: ScrollPresetName) {
  preset = name
  if (lenis) lenis.options.lerp = SCROLL_PRESETS[name].lerp
  try {
    window.localStorage.setItem(PRESET_STORAGE_KEY, name)
  } catch {
    // Not persisted; it still applies to this page view.
  }
}

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Smooth scroll for mouse wheels (the active preset's lerp; 0.1 by default, which
 * is Lenis's own default: the page eases out over about half a second). Touch
 * and reduced motion stay native.
 *
 * Lenis has no loop of its own (autoRaf is off): GSAP's ticker calls it, so
 * scrolling, ScrollTrigger and every tween share one clock and one frame.
 * GSAP's ticker time is in seconds and Lenis wants milliseconds. The callback
 * is prioritised so Lenis moves the page before the tweens render that frame.
 * Lag smoothing is off, so after a dropped frame GSAP catches up with real time
 * instead of slowing down, which would leave tweens behind a scroll that
 * Lenis keeps in real time.
 */
export function initSmoothScroll() {
  if (lenis || prefersReducedMotion()) return null

  const instance = new Lenis({
    lerp: SCROLL_PRESETS[preset].lerp,
    wheelMultiplier: 1,
    smoothWheel: true,
    syncTouch: false,
    autoRaf: false,
  })
  lenis = instance

  driveLenis = (time) => instance.raf(time * 1000)
  gsap.ticker.add(driveLenis, false, true)
  gsap.ticker.lagSmoothing(0)

  return lenis
}

export function destroySmoothScroll() {
  if (driveLenis) {
    gsap.ticker.remove(driveLenis)
    driveLenis = null
    // Back to GSAP's default while nothing needs the real-time clock.
    gsap.ticker.lagSmoothing(500, 33)
  }
  lenis?.destroy()
  lenis = null
}

/**
 * Smooth scroll turns GSAP's lag smoothing off, so a tween catches up with real time after a slow
 * frame. That is right while scrolling, but a transition with the scroll locked would skip ahead
 * through a hitch (a visible jump). While `on`, a frame longer than 100 ms counts as 33 ms, so the
 * motion carries on from where it was; `off` puts back what the smooth scroll needs.
 */
export function setTransitionLagSmoothing(on: boolean) {
  if (on) gsap.ticker.lagSmoothing(100, 33)
  else if (lenis) gsap.ticker.lagSmoothing(0)
  else gsap.ticker.lagSmoothing(500, 33)
}

export function getSmoothScroll() {
  return lenis
}

/** The real scroll position (Lenis's own while it is smoothing). */
export function getScrollY() {
  return lenis?.scroll ?? window.scrollY
}

/** Freezes page scrolling (open menu, page transition); see `html.scroll-locked` in index.css. */
export function lockScroll() {
  document.documentElement.classList.add('scroll-locked')
  lenis?.stop()
}

export function unlockScroll() {
  document.documentElement.classList.remove('scroll-locked')
  lenis?.start()
}

interface ScrollToOptions {
  immediate?: boolean
}

/** Scrolls to a position or element: a jump when `immediate`, a glide otherwise. */
export function scrollToTarget(target: number | HTMLElement, options?: ScrollToOptions) {
  const immediate = options?.immediate || prefersReducedMotion()

  if (lenis) {
    // force: also works while scrolling is stopped (menu open, page transition).
    lenis.scrollTo(target, { immediate, force: true })
    return
  }

  const behavior = immediate ? 'auto' : 'smooth'
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior })
    return
  }

  target.scrollIntoView({ behavior })
}

export function resetWindowScroll() {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }

  scrollToTarget(0, { immediate: true })

  window.dispatchEvent(new Event('scroll'))
  window.dispatchEvent(new Event(ROUTE_SCROLL_RESET_EVENT))
}
