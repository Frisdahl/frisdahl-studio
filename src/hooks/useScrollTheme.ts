import { useEffect, type RefObject } from 'react'

function getElementTop(element: HTMLElement) {
  return window.scrollY + element.getBoundingClientRect().top
}

function getElementBottom(element: HTMLElement) {
  const rect = element.getBoundingClientRect()
  return window.scrollY + rect.top + rect.height
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
      const isDark = window.scrollY >= startTop && window.scrollY < endBoundary

      document.body.classList.toggle('theme-dark', isDark)
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
    }
  }, [startRef, endRef, endId, endAtBottom])
}
