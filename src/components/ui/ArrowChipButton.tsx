import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Link } from 'react-router-dom'
import { ArrowIcon } from './ArrowIcon'

interface ArrowChipButtonProps {
  direction: 'left' | 'right'
  /** 'diagonal': no filled chip; an up-right arrow that leaves through the top right
   *  corner on hover while a second one arrives from the bottom left. */
  variant?: 'chip' | 'diagonal'
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
  variant = 'chip',
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
      const timeline = gsap.timeline({ paused: true, defaults: { ease: 'none' } })
      if (variant === 'diagonal') {
        // Both arrows sit on the same spot, pointing up and right: the first leaves
        // along that diagonal, the second arrives from the opposite corner.
        const [arrowOut, arrowIn] = Array.from(
          chipRef.current?.querySelectorAll('.arrow-chip-btn-arrow') ?? [],
        )
        timeline
          .to(arrowOut, { xPercent: 160, yPercent: -160, duration: 0.85 }, 0)
          .fromTo(arrowIn, { xPercent: -160, yPercent: 160 }, { xPercent: 0, yPercent: 0, duration: 0.85 }, 0)
      } else {
        timeline
          .to(chipRef.current, { rotation: turn, duration: 1 }, 0)
          .to(arrowWrapRef.current, { rotation: -turn, duration: 1 }, 0)
          .to(arrowTrackRef.current, { xPercent: direction === 'right' ? 200 : -200, duration: 0.85 }, 0)
      }
      // The diagonal variant keeps its text still.
      if (textTrackRef.current && variant !== 'diagonal') {
        timeline.to(textTrackRef.current, { yPercent: -100, duration: 0.85 }, 0)
      }
      hoverTimeline.current = timeline
    })

    return () => {
      if (hoverTimeline.current) gsap.killTweensOf(hoverTimeline.current)
      ctx.revert()
      hoverTimeline.current = null
    }
  }, [direction, text, variant])

  const animateHover = (progress: number, duration: number) => {
    const timeline = hoverTimeline.current
    if (!timeline) return
    if (prefersReducedMotion()) {
      gsap.killTweensOf(timeline)
      timeline.progress(progress)
      return
    }
    // The diagonal arrow swap is short, so it is eased at both ends and given a little more
    // time to be seen; the chip variants keep their quick start.
    if (variant === 'diagonal') {
      gsap.to(timeline, { progress, duration: progress === 1 ? 0.6 : 0.5, ease: 'power3.inOut', overwrite: true })
      return
    }
    gsap.to(timeline, { progress, duration, ease: 'power3.out', overwrite: true })
  }

  const rotate = variant === 'diagonal' ? -45 : direction === 'left' ? 180 : 0
  const interactionProps = {
    className: `arrow-chip-btn arrow-chip-btn-${direction}${text ? ' arrow-chip-btn-with-text' : ''}${variant === 'diagonal' ? ' arrow-chip-btn-diagonal' : ''} ${className}`.trim(),
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
