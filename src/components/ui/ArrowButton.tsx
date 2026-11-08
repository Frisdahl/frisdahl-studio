import { useLayoutEffect, useRef, type FocusEvent, type PointerEvent } from 'react'
import { gsap } from 'gsap'
import { ArrowIcon } from './ArrowIcon'

interface ArrowButtonProps {
  children: string
  href: string
  className?: string
}

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Seconds the arrow swap takes to play from 0 to 1 and back.
const HOVER_IN = 0.45
const HOVER_OUT = 0.4

/**
 * A dark button with a light label and an arrow pointing to the top right.
 * Hover: the fill goes transparent and the label and arrow turn dark (CSS,
 * .arrow-btn in index.css), while the arrow leaves through the top right
 * corner and a second arrow arrives from the bottom left. Hover out plays the
 * swap backwards.
 *
 * One paused timeline holds the arrow move; a plain tween drives its progress
 * at a constant speed, so a quick in-and-out continues from wherever it is
 * instead of jumping, and the ease inside the timeline stays in charge of the
 * feel in both directions.
 */
export function ArrowButton({ children, href, className = '' }: ArrowButtonProps) {
  const rootRef = useRef<HTMLAnchorElement>(null)
  const timeline = useRef<gsap.core.Timeline | null>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      const arrowOut = root.querySelector('.arrow-btn-arrow-out')
      const arrowIn = root.querySelector('.arrow-btn-arrow-in')

      // The old arrow leaves top right, the new one comes from the bottom
      // left, both along the arrow's own diagonal.
      timeline.current = gsap
        .timeline({ paused: true })
        .to(arrowOut, { xPercent: 130, yPercent: -130, duration: 0.4, ease: 'power3.inOut' }, 0)
        .fromTo(
          arrowIn,
          { xPercent: -130, yPercent: 130 },
          { xPercent: 0, yPercent: 0, duration: 0.4, ease: 'power3.inOut' },
          0,
        )
    }, root)

    return () => {
      if (timeline.current) gsap.killTweensOf(timeline.current)
      ctx.revert()
      timeline.current = null
    }
  }, [])

  const go = (target: 0 | 1) => {
    const tl = timeline.current
    if (!tl) return
    if (prefersReducedMotion()) {
      gsap.killTweensOf(tl)
      tl.progress(target)
      return
    }
    const distance = Math.abs(target - tl.progress())
    gsap.to(tl, {
      progress: target,
      duration: (target === 1 ? HOVER_IN : HOVER_OUT) * distance,
      ease: 'none',
      overwrite: true,
    })
  }

  // Only a real mouse hovers: a tap fires an enter but no leave.
  const handlePointerEnter = (event: PointerEvent) => {
    if (event.pointerType === 'mouse') go(1)
  }
  const handlePointerLeave = (event: PointerEvent) => {
    if (event.pointerType === 'mouse') go(0)
  }
  const handleFocus = (event: FocusEvent<HTMLElement>) => {
    if (event.currentTarget.matches(':focus-visible')) go(1)
  }

  return (
    <a
      ref={rootRef}
      href={href}
      className={`arrow-btn ${className}`.trim()}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onFocus={handleFocus}
      onBlur={() => go(0)}
    >
      <span>{children}</span>
      <span className="arrow-btn-icon" aria-hidden="true">
        <ArrowIcon className="arrow-btn-arrow arrow-btn-arrow-out" rotate={-45} />
        <ArrowIcon className="arrow-btn-arrow arrow-btn-arrow-in" rotate={-45} />
      </span>
    </a>
  )
}
