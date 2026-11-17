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
  B: { label: 'Balanced', lerp: 0.075 },
  C: { label: 'Cinematic', lerp: 0.07 },
} as const
export type ScrollPresetName = keyof typeof SCROLL_PRESETS

/** How much of a wheel notch's native distance the page moves. */
const WHEEL_MULTIPLIER = 0.7

/**
 * Lenis eases with an exponential decay, so near its end the page slows to a crawl and its last
 * pixels arrive one at a time, further and further apart (the last 5 px took about 530 ms and the
 * very last pixel came about 245 ms after the one before it). The page then looks as if it has
 * stopped and ticks forward once more, which shows on a large, high-contrast picture such as a
 * project video. So the glide may not slow below TAIL_SPEED (px per second): it keeps its natural
 * slowing down until it reaches that speed, holds it until it lands, and never speeds up again, so
 * the speed stays continuous (an earlier version that raised the easing rate near the end made the
 * page lurch forward just before it stopped).
 */
const TAIL_SPEED = 45

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
 * Smooth scroll for mouse wheels (the active preset's lerp; 0.075 by default: the page
 * eases out over about two thirds of a second, and each wheel notch moves it 70% of the native distance). Touch
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
    // Each wheel notch moves the page 70% of what it would natively: a flick of the wheel no longer
    // throws the page past the sections, and the headings' animations have time to play.
    wheelMultiplier: WHEEL_MULTIPLIER,
    smoothWheel: true,
    syncTouch: false,
    autoRaf: false,
  })
  lenis = instance

  // Lenis keeps the easing rate of the glide in progress on its private `animate` object, and a rate
  // changed in `options` only reaches the next glide, so the floor is applied there. A new wheel
  // notch starts a new glide, and the rate is worked out again from the preset every frame.
  const glide = (instance as unknown as { animate: { isRunning: boolean; lerp?: number; to: number; value: number } }).animate
  let lastTime = 0
  driveLenis = (time) => {
    const dt = lastTime ? time - lastTime : 0
    lastTime = time
    if (glide.isRunning && glide.lerp && dt > 0 && dt < 0.1) {
      const base = SCROLL_PRESETS[preset].lerp
      const remaining = Math.abs(glide.to - glide.value)
      const floorStep = TAIL_SPEED * dt
      // Lenis moves a fraction 1 - e^(-lerp * 60 * dt) of the remaining distance each frame. If that is
      // less than the floor, use the rate that gives exactly the floor (all of it when it would land).
      const fraction = remaining <= floorStep ? 0.999 : floorStep / remaining
      const floorRate = -Math.log(1 - fraction) / (60 * dt)
      glide.lerp = Math.max(base, floorRate)
    }
    instance.raf(time * 1000)
  }
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
