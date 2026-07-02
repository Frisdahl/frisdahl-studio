import { useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { HiArrowDown } from 'react-icons/hi2'
import { Link, useNavigate } from 'react-router-dom'
import { useNextCaseTimerProgress } from '../../hooks/useNextCaseTimerProgress'
import type { CaseDetailNext } from '../../types/caseDetail'

interface CaseDetailNextSectionProps {
  nextCase: CaseDetailNext
}

const RING_SIZE = 76
const RING_CENTER = RING_SIZE / 2
const RING_RADIUS = 34
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

export function CaseDetailNextSection({ nextCase }: CaseDetailNextSectionProps) {
  const { href, label, year, image, ariaLabel } = nextCase
  const mediaRef = useRef<HTMLElement>(null)
  const hasNavigatedRef = useRef(false)
  const navigate = useNavigate()
  const shouldReduceMotion = useReducedMotion()
  const { progress, displayProgress, revealProgress, isRevealed } = useNextCaseTimerProgress(
    mediaRef,
    shouldReduceMotion,
  )
  const strokeDashoffset = RING_CIRCUMFERENCE * (1 - displayProgress)
  const clipInset = shouldReduceMotion ? 0 : (1 - revealProgress) * 100

  useEffect(() => {
    hasNavigatedRef.current = false
  }, [href])

  useEffect(() => {
    if (shouldReduceMotion || progress < 1 || hasNavigatedRef.current) return

    hasNavigatedRef.current = true
    navigate(href)
  }, [href, navigate, progress, shouldReduceMotion])

  return (
    <div className="case-detail-next-section" aria-label={label}>
      <Link to={href} className="case-detail-next group block" aria-label={ariaLabel}>
        <figure
          ref={mediaRef}
          className={`case-detail-next-media${isRevealed ? ' case-detail-next-media--revealed' : ''}`}
          style={{
            clipPath: `inset(${clipInset}% 0 0 0 round var(--radius-panel-xl) var(--radius-panel-xl) 0 0)`,
          }}
        >
          {image.imageSrc ? (
            <img
              src={image.imageSrc}
              alt=""
              className="case-detail-next-image"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div
              className={`case-detail-next-image ${image.placeholderClassName ?? 'bg-peach'}`}
              aria-hidden="true"
            />
          )}

          <div className="case-detail-next-overlay" aria-hidden="true" />

          <figcaption className="case-detail-next-meta">
            <span className="case-detail-next-label">{label}</span>

            <span className="case-detail-next-icon-wrap" aria-hidden="true">
              <span className="case-detail-next-icon">
                <svg
                  className="case-detail-next-icon-ring"
                  viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
                  aria-hidden="true"
                  focusable="false"
                >
                  <circle
                    className="case-detail-next-ring-track"
                    cx={RING_CENTER}
                    cy={RING_CENTER}
                    r={RING_RADIUS}
                  />
                  <circle
                    className="case-detail-next-ring-progress"
                    cx={RING_CENTER}
                    cy={RING_CENTER}
                    r={RING_RADIUS}
                    strokeDasharray={RING_CIRCUMFERENCE}
                    strokeDashoffset={strokeDashoffset}
                    transform={`rotate(-90 ${RING_CENTER} ${RING_CENTER})`}
                  />
                </svg>
                <HiArrowDown className="case-detail-next-icon-arrow" />
              </span>
            </span>

            <span className="case-detail-next-year">{year}</span>
          </figcaption>
        </figure>
      </Link>
    </div>
  )
}
