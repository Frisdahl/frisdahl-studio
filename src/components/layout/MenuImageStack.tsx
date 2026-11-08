import { useEffect, useLayoutEffect, useRef } from 'react'
import { responsiveImageProps } from '../../lib/responsiveImage'
import { prefersReducedMotion } from '../../lib/scroll'

interface MenuImageStackProps {
  /** One picture per menu link, in the links' order (the first is shown to start with). */
  sources: string[]
  /** The picture of the hovered (or focused) link. */
  activeIndex: number
  /** Changes each time the menu opens: the stack starts over with the first picture. */
  resetKey: number
  sizes: string
}

/** The new picture's slide down over the one before it. */
const SLIDE_MS = 700
const SLIDE_EASE = 'cubic-bezier(0.76, 0, 0.24, 1)'

/** Shows the pictures that have been shown so far (bottom to top); the others stay hidden. */
function paint(layers: (HTMLImageElement | null)[], order: number[]) {
  layers.forEach((layer, index) => {
    if (!layer) return
    const position = order.indexOf(index)
    layer.classList.toggle('is-shown', position !== -1)
    layer.style.zIndex = position === -1 ? '' : String(position + 1)
  })
}

/**
 * The menu's pictures, stacked. Hovering a link brings its picture to the top by
 * sliding it down over the current one (a transform, so it stays on the compositor).
 * The stack is kept in the DOM, not in React state, because only the top picture
 * moves and nothing else needs to render.
 */
export function MenuImageStack({ sources, activeIndex, resetKey, sizes }: MenuImageStackProps) {
  const layerRefs = useRef<(HTMLImageElement | null)[]>([])
  const orderRef = useRef<number[]>([0])

  // On mount and each time the menu opens: only the first picture, nothing moving.
  // (Declared before the next effect, so when the menu opens with the first link
  // active it sees the first picture already on top and does nothing.)
  useLayoutEffect(() => {
    layerRefs.current.forEach((layer) => layer?.getAnimations().forEach((animation) => animation.cancel()))
    orderRef.current = [0]
    paint(layerRefs.current, orderRef.current)
  }, [resetKey])

  useLayoutEffect(() => {
    const order = orderRef.current
    if (order[order.length - 1] === activeIndex) return

    orderRef.current = [...order.filter((index) => index !== activeIndex), activeIndex]
    paint(layerRefs.current, orderRef.current)

    const layer = layerRefs.current[activeIndex]
    if (!layer || prefersReducedMotion()) return
    layer.getAnimations().forEach((animation) => animation.cancel())
    layer.animate([{ transform: 'translateY(-100%)' }, { transform: 'translateY(0)' }], {
      duration: SLIDE_MS,
      easing: SLIDE_EASE,
    })
  }, [activeIndex])

  // The pictures are decoded while the browser is idle, so the first slide doesn't
  // have to decode one (a hitch on slow devices). Only where they are shown: phones
  // hide them and never download them.
  useEffect(() => {
    if (!window.matchMedia('(min-width: 48rem)').matches) return
    const warm = () => {
      layerRefs.current.forEach((layer) => {
        if (!layer) return
        layer.loading = 'eager'
        layer.decode().catch(() => {})
      })
    }
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(warm, { timeout: 4000 })
      return () => window.cancelIdleCallback(id)
    }
    const timer = window.setTimeout(warm, 2000)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      {sources.map((source, index) => (
        <img
          key={source}
          ref={(element) => {
            layerRefs.current[index] = element
          }}
          className="menu-media-layer"
          {...responsiveImageProps(source, sizes)}
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      ))}
    </>
  )
}
