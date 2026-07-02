import Lenis from 'lenis'

let lenis: Lenis | null = null
const frameCallbacks = new Set<(instance: Lenis) => void>()

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function initSmoothScroll() {
  if (lenis || prefersReducedMotion()) return null

  lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
    syncTouch: false,
    anchors: true,
  })

  return lenis
}

export function destroySmoothScroll() {
  frameCallbacks.clear()
  lenis?.destroy()
  lenis = null
}

export function getSmoothScroll() {
  return lenis
}

export function getScrollY() {
  return lenis?.scroll ?? window.scrollY
}

export function onSmoothScrollFrame(callback: (instance: Lenis) => void) {
  frameCallbacks.add(callback)
  return () => {
    frameCallbacks.delete(callback)
  }
}

export function runSmoothScrollFrame(instance: Lenis) {
  frameCallbacks.forEach((callback) => {
    callback(instance)
  })
}

interface SmoothScrollToOptions {
  immediate?: boolean
  duration?: number
}

export function smoothScrollTo(target: number | string | HTMLElement, options?: SmoothScrollToOptions) {
  if (lenis) {
    lenis.scrollTo(target, {
      immediate: options?.immediate,
      duration: options?.duration,
    })
    return
  }

  if (typeof target === 'number') {
    if (options?.immediate) {
      window.scrollTo(0, target)
      return
    }

    window.scrollTo({ top: target, behavior: 'smooth' })
    return
  }

  if (typeof target === 'string') {
    const element = document.querySelector(target)
    element?.scrollIntoView({ behavior: options?.immediate ? 'auto' : 'smooth' })
    return
  }

  target.scrollIntoView({ behavior: options?.immediate ? 'auto' : 'smooth' })
}
