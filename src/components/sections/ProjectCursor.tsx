import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowIcon } from '../ui'

/** How far the label stands from the pointer, to the right and up (px). */
const OFFSET_X = 16
const OFFSET_Y = 16

/**
 * The "SE PROJEKT" label shown over the project pictures: a white rectangle with dark text and an
 * arrow, standing a little to the top right of the pointer (the pointer itself stays). It grows out
 * of its bottom left corner when the pointer enters a picture, follows the pointer with a short lag
 * (gsap.quickTo, transform only) and shrinks away when it leaves. Only for a real mouse (hover and a
 * fine pointer); touch has no pointer to follow, and a tap just follows the link. Reduced motion:
 * it follows without growing or lag.
 */
export function ProjectCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const list = cursor?.parentElement?.querySelector<HTMLElement>('.home-cases-list')
    if (!cursor || !list) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // The label's bottom left corner is its anchor: it sits at the pointer plus the offset.
    gsap.set(cursor, { yPercent: -100, transformOrigin: '0% 100%', scale: 0, x: 0, y: 0 })
    const moveX = gsap.quickTo(cursor, 'x', { duration: reduced ? 0 : 0.3, ease: 'power3.out' })
    const moveY = gsap.quickTo(cursor, 'y', { duration: reduced ? 0 : 0.3, ease: 'power3.out' })
    let over = false

    const show = (visible: boolean) => {
      if (visible === over) return
      over = visible
      gsap.to(cursor, {
        scale: visible ? 1 : 0,
        duration: reduced ? 0 : visible ? 0.4 : 0.25,
        ease: visible ? 'expo.out' : 'power3.in',
        overwrite: 'auto',
      })
    }

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      const target = event.target instanceof Element ? event.target.closest('.case-card-media-link') : null
      // A card without a project page has nothing to open.
      show(Boolean(target) && !target?.hasAttribute('data-static'))
      moveX(event.clientX + OFFSET_X)
      moveY(event.clientY - OFFSET_Y)
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
      <span>Se projekt</span>
      <ArrowIcon className="project-cursor-arrow" rotate={-45} />
    </div>
  )
}
