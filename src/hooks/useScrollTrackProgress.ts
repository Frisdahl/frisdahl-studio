import { type RefObject, useEffect } from 'react'

/**
 * Scroll progress through a tall track whose content sticks while it scrolls:
 * 0 when the track's top reaches the top of the viewport, 1 when its bottom
 * reaches the bottom. Calls onProgress on every scroll frame (no re-renders),
 * so the caller can write the value straight to the DOM.
 */
export function useScrollTrackProgress(
  trackRef: RefObject<HTMLElement | null>,
  onProgress: (progress: number) => void,
) {
  useEffect(() => {
    let frame = 0

    const update = () => {
      const track = trackRef.current
      if (!track) return

      const rect = track.getBoundingClientRect()
      const distance = rect.height - window.innerHeight
      const progress = distance > 0 ? Math.min(1, Math.max(0, -rect.top / distance)) : 0
      onProgress(progress)
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [trackRef, onProgress])
}
