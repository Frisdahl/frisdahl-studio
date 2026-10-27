import { useLayoutEffect, useRef, useState, type AnimationEvent } from 'react'
import { gsap } from 'gsap'
import { ArrowIcon } from './ArrowIcon'

interface CtaPillButtonProps {
  children: string
  href?: string
  onClick?: () => void
  className?: string
  /** Hover slides a colour overlay up, rolls the label to a copy and tilts the arrow chip. */
  fillOnHover?: boolean
}

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function CtaPillButton({
  href,
  onClick,
  children,
  className = '',
  fillOnHover = false,
}: CtaPillButtonProps) {
  // The arrow animation always plays to the end once started (instead of being
  // cut off on mouseleave, which made it flicker when hovering in and out).
  const [isArrowPlaying, setIsArrowPlaying] = useState(false)

  const overlayRef = useRef<HTMLSpanElement>(null)
  const labelTrackRef = useRef<HTMLSpanElement>(null)
  const iconRef = useRef<HTMLSpanElement>(null)
  const hoverTimeline = useRef<gsap.core.Timeline | null>(null)

  // One paused timeline: hover plays it, leaving reverses it from wherever it
  // is, so quick in/out movements never jump.
  useLayoutEffect(() => {
    if (!fillOnHover) return

    const ctx = gsap.context(() => {
      hoverTimeline.current = gsap
        .timeline({ paused: true, defaults: { duration: 0.5, ease: 'power3.inOut' } })
        .fromTo(overlayRef.current, { yPercent: 101 }, { yPercent: 0 }, 0)
        .to(labelTrackRef.current, { yPercent: -100 }, 0)
        .to(iconRef.current, { rotation: -45 }, 0)
    })

    return () => {
      ctx.revert()
      hoverTimeline.current = null
    }
  }, [fillOnHover])

  const playArrow = () => {
    if (!isArrowPlaying && !prefersReducedMotion()) setIsArrowPlaying(true)
  }

  const handleEnter = () => {
    playArrow()
    const timeline = hoverTimeline.current
    if (!timeline) return
    if (prefersReducedMotion()) timeline.progress(1).pause()
    else timeline.play()
  }

  const handleLeave = () => {
    const timeline = hoverTimeline.current
    if (!timeline) return
    if (prefersReducedMotion()) timeline.progress(0).pause()
    else timeline.reverse()
  }

  const handleAnimationEnd = (event: AnimationEvent) => {
    if (event.animationName === 'hero-cta-arrow-slide') setIsArrowPlaying(false)
  }

  const classes = [
    'hero-cta-btn',
    fillOnHover ? 'cta-fill-hover' : '',
    isArrowPlaying ? 'is-arrow-playing' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const interactionProps = {
    className: classes,
    onMouseEnter: handleEnter,
    onMouseLeave: handleLeave,
    onFocus: handleEnter,
    onBlur: handleLeave,
    onAnimationEnd: handleAnimationEnd,
  }

  const content = (
    <>
      {fillOnHover && <span ref={overlayRef} className="cta-fill-hover-overlay" aria-hidden="true" />}
      <span className="hero-cta-btn-label">
        {fillOnHover ? (
          <span ref={labelTrackRef} className="cta-fill-hover-track">
            {children}
            <span className="cta-fill-hover-copy" aria-hidden="true">
              {children}
            </span>
          </span>
        ) : (
          children
        )}
      </span>
      <span ref={iconRef} className="hero-cta-btn-icon" aria-hidden="true">
        <span className="hero-cta-btn-arrow-wrap">
          <ArrowIcon className="hero-cta-btn-arrow" />
        </span>
      </span>
    </>
  )

  if (href) {
    return (
      <a href={href} {...interactionProps}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} {...interactionProps}>
      {content}
    </button>
  )
}
