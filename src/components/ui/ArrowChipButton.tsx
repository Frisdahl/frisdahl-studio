import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Link } from 'react-router-dom'
import { ArrowIcon } from './ArrowIcon'

interface ArrowChipButtonProps {
  direction: 'left' | 'right'
  label: string
  /** Visible text before the chip; it rolls up on hover, a copy rising in from below. */
  text?: string
  href?: string
  /** Open href as an external page in a new tab instead of a router link. */
  external?: boolean
  onClick?: () => void
  className?: string
}

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * A square arrow chip with the header contact chip's hover: the chip turns 90°
 * while the arrow counter-rotates, slides out in its direction and a second
 * arrow slides in behind it. With text, the text rolls on the same timeline.
 */
export function ArrowChipButton({
  direction,
  label,
  text,
  href,
  external = false,
  onClick,
  className = '',
}: ArrowChipButtonProps) {
  const chipRef = useRef<HTMLSpanElement>(null)
  const arrowWrapRef = useRef<HTMLSpanElement>(null)
  const arrowTrackRef = useRef<HTMLSpanElement>(null)
  const textTrackRef = useRef<HTMLSpanElement>(null)
  const hoverTimeline = useRef<gsap.core.Timeline | null>(null)

  // Same scrubbed, linear timeline as CtaPillButton's fill hover. The left chip
  // turns the other way, mirroring the right one.
  useLayoutEffect(() => {
    const turn = direction === 'right' ? 90 : -90
    const ctx = gsap.context(() => {
      const timeline = gsap
        .timeline({ paused: true, defaults: { ease: 'none' } })
        .to(chipRef.current, { rotation: turn, duration: 1 }, 0)
        .to(arrowWrapRef.current, { rotation: -turn, duration: 1 }, 0)
        .to(arrowTrackRef.current, { xPercent: direction === 'right' ? 200 : -200, duration: 0.85 }, 0)
      if (textTrackRef.current) timeline.to(textTrackRef.current, { yPercent: -100, duration: 0.85 }, 0)
      hoverTimeline.current = timeline
    })

    return () => {
      if (hoverTimeline.current) gsap.killTweensOf(hoverTimeline.current)
      ctx.revert()
      hoverTimeline.current = null
    }
  }, [direction, text])

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

  const rotate = direction === 'left' ? 180 : 0
  const interactionProps = {
    className: `arrow-chip-btn arrow-chip-btn-${direction}${text ? ' arrow-chip-btn-with-text' : ''} ${className}`.trim(),
    // Visible text names the link itself; the label only stands in for a bare chip.
    'aria-label': text ? undefined : label,
    onMouseEnter: () => animateHover(1, 0.8),
    onMouseLeave: () => animateHover(0, 0.6),
    onFocus: () => animateHover(1, 0.8),
    onBlur: () => animateHover(0, 0.6),
  }

  const content = (
    <>
      {text && (
        <span className="arrow-chip-btn-text">
          <span ref={textTrackRef} className="arrow-chip-btn-text-track">
            <span>{text}</span>
            <span className="arrow-chip-btn-text-next" aria-hidden="true">
              {text}
            </span>
          </span>
        </span>
      )}
      <span ref={chipRef} className="arrow-chip-btn-chip" aria-hidden="true">
        <span ref={arrowWrapRef} className="arrow-chip-btn-arrow-wrap">
          <span ref={arrowTrackRef} className="arrow-chip-btn-arrows">
            <ArrowIcon className="arrow-chip-btn-arrow" rotate={rotate} />
            <ArrowIcon className="arrow-chip-btn-arrow arrow-chip-btn-arrow-next" rotate={rotate} />
          </span>
        </span>
      </span>
    </>
  )

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" {...interactionProps}>
        {content}
      </a>
    )
  }

  // Internal route: a router link, so the page changes without a reload.
  if (href) {
    return (
      <Link to={href} {...interactionProps}>
        {content}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} {...interactionProps}>
      {content}
    </button>
  )
}
