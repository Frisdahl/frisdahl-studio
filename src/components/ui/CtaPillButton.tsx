import { useState, type AnimationEvent } from 'react'
import { ArrowIcon } from './ArrowIcon'

interface CtaPillButtonProps {
  children: string
  href?: string
  onClick?: () => void
  className?: string
}

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function CtaPillButton({ href, onClick, children, className = '' }: CtaPillButtonProps) {
  // The arrow animation always plays to the end once started (instead of being
  // cut off on mouseleave, which made it flicker when hovering in and out).
  const [isArrowPlaying, setIsArrowPlaying] = useState(false)

  const playArrow = () => {
    if (!isArrowPlaying && !prefersReducedMotion()) setIsArrowPlaying(true)
  }

  const handleAnimationEnd = (event: AnimationEvent) => {
    if (event.animationName === 'hero-cta-arrow-slide') setIsArrowPlaying(false)
  }

  const classes = ['hero-cta-btn', isArrowPlaying ? 'is-arrow-playing' : '', className]
    .filter(Boolean)
    .join(' ')

  const interactionProps = {
    className: classes,
    onMouseEnter: playArrow,
    onFocus: playArrow,
    onAnimationEnd: handleAnimationEnd,
  }

  const content = (
    <>
      <span className="hero-cta-btn-label">{children}</span>
      <span className="hero-cta-btn-icon" aria-hidden="true">
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
