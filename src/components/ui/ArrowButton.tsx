import { useLayoutEffect, useRef, type FocusEvent, type PointerEvent } from 'react'
import { gsap } from 'gsap'
import { ArrowIcon } from './ArrowIcon'

interface ArrowButtonProps {
  children: string
  /** A link to this address; without one the button is a real <button> (see `type`). */
  href?: string
  /** For the <button> version: 'submit' sends the form it is in. */
  type?: 'button' | 'submit'
  /** Another site: opens in a new tab. */
  external?: boolean
  /**
   * 'solid' (default): the dark button with a light label.
   * 'text': no fill, border or padding; the label and arrow are dark. Same arrow swap on hover.
   */
  variant?: 'solid' | 'text'
  /** 'up-right' (default) or 'right': the way the arrow points and leaves on hover. */
  arrow?: 'up-right' | 'right'
  className?: string
}

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Seconds the arrow swap takes to play from 0 to 1 and back.
const HOVER_IN = 0.45
const HOVER_OUT = 0.4

/**
 * The site's call-to-action button (the footer's contact button, the project pages' "Se live"):
 * a dark button with a light label and an arrow pointing to the top right.
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
export function ArrowButton({
  children,
  href,
  type = 'button',
  external = false,
  variant = 'solid',
  arrow = 'up-right',
  className = '',
}: ArrowButtonProps) {
  const rootRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null)
  const timeline = useRef<gsap.core.Timeline | null>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      const arrowOut = root.querySelector('.arrow-btn-arrow-out')
      const arrowIn = root.querySelector('.arrow-btn-arrow-in')

      // The old arrow leaves top right, the new one comes from the bottom
      // left, both along the arrow's own diagonal.
      const y = arrow === 'right' ? 0 : 130
      timeline.current = gsap
        .timeline({ paused: true })
        .to(arrowOut, { xPercent: 130, yPercent: -y, duration: 0.4, ease: 'power3.inOut' }, 0)
        .fromTo(
          arrowIn,
          { xPercent: -130, yPercent: y },
          { xPercent: 0, yPercent: 0, duration: 0.4, ease: 'power3.inOut' },
          0,
        )
    }, root)

    return () => {
      if (timeline.current) gsap.killTweensOf(timeline.current)
      ctx.revert()
      timeline.current = null
    }
  }, [arrow])

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

  const shared = {
    className: `arrow-btn${variant === 'text' ? ' arrow-btn-text' : ''} ${className}`.trim(),
    onPointerEnter: handlePointerEnter,
    onPointerLeave: handlePointerLeave,
    onFocus: handleFocus,
    onBlur: () => go(0),
  }
  const content = (
    <>
      <span>{children}</span>
      <span className="arrow-btn-icon" aria-hidden="true">
        <ArrowIcon className="arrow-btn-arrow arrow-btn-arrow-out" rotate={arrow === 'right' ? 0 : -45} />
        <ArrowIcon className="arrow-btn-arrow arrow-btn-arrow-in" rotate={arrow === 'right' ? 0 : -45} />
      </span>
    </>
  )

  if (href === undefined) {
    return (
      <button ref={rootRef} type={type} {...shared}>
        {content}
      </button>
    )
  }

  return (
    <a
      ref={rootRef}
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      {...shared}
    >
      {content}
    </a>
  )
}
