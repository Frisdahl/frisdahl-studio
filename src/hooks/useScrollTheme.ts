import { useEffect, type RefObject } from 'react'

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
  useEffect(() => {
    const startElement = startRef.current
    if (!startElement) return

    let frameId = 0

    const getEndBoundary = () => {
      const endElement = endRef?.current ?? (endId ? document.getElementById(endId) : null)
      if (!endElement) return Number.POSITIVE_INFINITY

      return endAtBottom ? getElementBottom(endElement) : getElementTop(endElement)
    }

    const updateTheme = () => {
      const startTop = getElementTop(startElement)
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
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(updateTheme)
    }

    updateTheme()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      document.body.classList.remove('theme-dark')
      document.body.style.removeProperty('--theme-progress')
    }
  }, [startRef, endRef, endId, endAtBottom])
}
