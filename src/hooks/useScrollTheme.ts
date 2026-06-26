import { useLayoutEffect, type RefObject } from 'react'
import { resetPageTheme, ROUTE_SCROLL_RESET_EVENT } from '../lib/scroll'

const THEME_BLEND_DISTANCE = 360

function getElementTop(element: HTMLElement) {
  return window.scrollY + element.getBoundingClientRect().top
}

function getElementBottom(element: HTMLElement) {
  const rect = element.getBoundingClientRect()
  return window.scrollY + rect.top + rect.height
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function getThemeProgress(
  scrollY: number,
  startTop: number,
  endBoundary: number,
  blend = THEME_BLEND_DISTANCE,
) {
  if (scrollY < startTop - blend) return 0
  if (scrollY < startTop) return (scrollY - (startTop - blend)) / blend
  if (scrollY < endBoundary - blend) return 1
  if (scrollY < endBoundary) return 1 - (scrollY - (endBoundary - blend)) / blend
  return 0
}

interface UseScrollThemeOptions {
  startRef: RefObject<HTMLElement | null>
  endRef?: RefObject<HTMLElement | null>
  endId?: string
  endAtBottom?: boolean
}

export function useScrollTheme({
  startRef,
  endRef,
  endId,
  endAtBottom = false,
}: UseScrollThemeOptions) {
  useLayoutEffect(() => {
    const startElement = startRef.current
    if (!startElement) return

    let frameId = 0
    let isActive = true

    const getEndBoundary = () => {
      const endElement = endRef?.current ?? (endId ? document.getElementById(endId) : null)
      if (!endElement?.isConnected) return Number.POSITIVE_INFINITY

      return endAtBottom ? getElementBottom(endElement) : getElementTop(endElement)
    }

    const updateTheme = () => {
      if (!isActive) return

      const element = startRef.current
      if (!element?.isConnected) {
        resetPageTheme()
        return
      }

      const startTop = getElementTop(element)
      const endBoundary = getEndBoundary()
      const progress = clamp(
        getThemeProgress(window.scrollY, startTop, endBoundary),
        0,
        1,
      )

      document.body.style.setProperty('--theme-progress', progress.toFixed(4))
      document.body.classList.toggle('theme-dark', progress > 0.5)
    }

    const onScroll = () => {
      if (!isActive) return
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(updateTheme)
    }

    const onRouteReset = () => {
      cancelAnimationFrame(frameId)
      resetPageTheme()
    }

    updateTheme()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    window.addEventListener(ROUTE_SCROLL_RESET_EVENT, onRouteReset)

    return () => {
      isActive = false
      cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener(ROUTE_SCROLL_RESET_EVENT, onRouteReset)
      resetPageTheme()
    }
  }, [startRef, endRef, endId, endAtBottom])
}
