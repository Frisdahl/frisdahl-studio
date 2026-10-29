import { useLayoutEffect, useRef, useState, type AnimationEvent } from 'react'
import { gsap } from 'gsap'
import { ArrowIcon } from './ArrowIcon'

interface CtaPillButtonProps {
  children: string
  href?: string
  /** Open href as an external page in a new tab. */
  external?: boolean
  onClick?: () => void
  className?: string
  /** Hover slides a colour overlay up, rolls the label to a copy and turns the arrow chip. */
  fillOnHover?: boolean
}

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function CtaPillButton({
  href,
  external = false,
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
  const arrowWrapRef = useRef<HTMLSpanElement>(null)
  const arrowTrackRef = useRef<HTMLSpanElement>(null)
  const hoverTimeline = useRef<gsap.core.Timeline | null>(null)

  // One paused, linear timeline that is scrubbed by an eased progress tween.
  // Both directions then start fast and settle softly (a reversed timeline
  // would flip the ease), and quick in/out movements continue from wherever
  // the animation is instead of jumping.
  useLayoutEffect(() => {
    if (!fillOnHover) return

    const ctx = gsap.context(() => {
      hoverTimeline.current = gsap
        .timeline({ paused: true, defaults: { ease: 'none' } })
        .fromTo(overlayRef.current, { yPercent: 101 }, { yPercent: 0, duration: 0.85 }, 0)
        // The label follows the overlay a beat later so the layers read separately.
        .to(labelTrackRef.current, { yPercent: -100, duration: 0.85 }, 0.15)
        .to(iconRef.current, { rotation: 90, duration: 1 }, 0)
        // Counter-rotates in sync so the arrow itself never turns.
        .to(arrowWrapRef.current, { rotation: -90, duration: 1 }, 0)
        // Pushes the visible arrow out to the right and brings in the one
        // waiting on its left; leaving scrubs it straight back.
        .to(arrowTrackRef.current, { xPercent: 200, duration: 0.85 }, 0)
    })

    return () => {
      if (hoverTimeline.current) gsap.killTweensOf(hoverTimeline.current)
      ctx.revert()
      hoverTimeline.current = null
    }
  }, [fillOnHover])

  const playArrow = () => {
    if (!isArrowPlaying && !prefersReducedMotion()) setIsArrowPlaying(true)
  }

  const animateHover = (progress: number, duration: number) => {
    const timeline = hoverTimeline.current
    if (!timeline) return
    if (prefersReducedMotion()) {
      gsap.killTweensOf(timeline)
      timeline.progress(progress)
      return
    }
    gsap.to(timeline, { progress, duration, ease: 'power3.out', overwrite: true })
  }

  const handleEnter = () => {
    // The fill variant moves its arrows in the hover timeline instead.
    if (!fillOnHover) playArrow()
    animateHover(1, 0.8)
  }

  const handleLeave = () => animateHover(0, 0.6)

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
        <span ref={arrowWrapRef} className="hero-cta-btn-arrow-wrap">
          {fillOnHover ? (
            <span ref={arrowTrackRef} className="cta-fill-hover-arrows">
              <ArrowIcon className="hero-cta-btn-arrow" />
              <ArrowIcon className="hero-cta-btn-arrow cta-fill-hover-arrow-next" />
            </span>
          ) : (
            <ArrowIcon className="hero-cta-btn-arrow" />
          )}
        </span>
      </span>
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : null)}
        {...interactionProps}
      >
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
