import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * The round "SE PROJEKT" pointer shown over the project pictures. It is white with
 * mix-blend-mode: difference, so it inverts the picture under it; the label inside is black, which
 * the blend leaves unchanged, so the text shows the picture itself. It scales in when the pointer
 * enters a picture, follows the pointer with a short lag (gsap.quickTo, transform only) and
 * scales out when it leaves. Only for a real mouse (hover and a fine pointer); touch has no
 * pointer to follow, and a tap just follows the link. Reduced motion: it follows without scaling
 * or lag.
 */
export function ProjectCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const list = cursor?.parentElement?.querySelector<HTMLElement>('.home-cases-list')
    if (!cursor || !list) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0, x: 0, y: 0 })
    const moveX = gsap.quickTo(cursor, 'x', { duration: reduced ? 0 : 0.35, ease: 'power3.out' })
    const moveY = gsap.quickTo(cursor, 'y', { duration: reduced ? 0 : 0.35, ease: 'power3.out' })
    let over = false

    const show = (visible: boolean) => {
      if (visible === over) return
      over = visible
      gsap.to(cursor, {
        scale: visible ? 1 : 0,
        duration: reduced ? 0 : visible ? 0.45 : 0.3,
        ease: visible ? 'expo.out' : 'power3.in',
        overwrite: 'auto',
      })
    }

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      const target = event.target instanceof Element ? event.target.closest('.case-card-media-link') : null
      // A card without a project page has nothing to open.
      show(Boolean(target) && !target?.hasAttribute('data-static'))
      moveX(event.clientX)
      moveY(event.clientY)
    }
    const onLeave = () => show(false)

    list.addEventListener('pointermove', onMove)
    list.addEventListener('pointerleave', onLeave)
    return () => {
      list.removeEventListener('pointermove', onMove)
      list.removeEventListener('pointerleave', onLeave)
      gsap.killTweensOf(cursor)
      gsap.set(cursor, { clearProps: 'all' })
    }
  }, [])

  return (
    <div ref={cursorRef} className="project-cursor" aria-hidden="true">
      <span>
        Se
        <br />
        projekt
      </span>
    </div>
  )
}
