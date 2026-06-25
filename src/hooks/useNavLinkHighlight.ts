import { useCallback, useState, type RefObject } from 'react'

export interface NavLinkHighlightMetrics {
  left: number
  width: number
  opacity: number
}

const initialMetrics: NavLinkHighlightMetrics = {
  left: 0,
  width: 0,
  opacity: 0,
}

export function useNavLinkHighlight(listRef: RefObject<HTMLUListElement | null>) {
  const [metrics, setMetrics] = useState<NavLinkHighlightMetrics>(initialMetrics)

  const updateHighlight = useCallback(
    (element: HTMLElement | null) => {
      const list = listRef.current

      if (!element || !list) return

      const listRect = list.getBoundingClientRect()
      const rect = element.getBoundingClientRect()

      setMetrics({
        left: rect.left - listRect.left,
        width: rect.width,
        opacity: 1,
      })
    },
    [listRef],
  )

  const hideHighlight = useCallback(() => {
    setMetrics((current) => ({ ...current, opacity: 0 }))
  }, [])

  return { metrics, updateHighlight, hideHighlight }
}
