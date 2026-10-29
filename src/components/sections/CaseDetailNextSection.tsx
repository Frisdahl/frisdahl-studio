import { useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useScrollTrackProgress } from '../../hooks/useScrollTrackProgress'
import type { CaseDetailNext } from '../../types/caseDetail'
import { IMAGE_SIZES, responsiveImageProps } from '../../lib/responsiveImage'
import { Container } from '../ui'

interface CaseDetailNextSectionProps {
  nextCase: CaseDetailNext
}

/**
 * The next case at the end of the page. The card sticks while the section's
 * extra scroll room passes; the bar under the title fills with that scroll,
 * and when it is full the page moves on to the next case.
 */
export function CaseDetailNextSection({ nextCase }: CaseDetailNextSectionProps) {
  const { href, name, label, image, ariaLabel } = nextCase
  const trackRef = useRef<HTMLElement>(null)
  const barRef = useRef<HTMLSpanElement>(null)
  const hasNavigatedRef = useRef(false)
  const navigate = useNavigate()
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    hasNavigatedRef.current = false
  }, [href])

  const onProgress = useCallback(
    (progress: number) => {
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`

      // Reduced motion: the bar still shows progress, but the page never
      // changes without a click.
      if (progress < 1 || shouldReduceMotion || hasNavigatedRef.current) return
      hasNavigatedRef.current = true
      navigate(href)
    },
    [href, navigate, shouldReduceMotion],
  )

  useScrollTrackProgress(trackRef, onProgress)

  return (
    <section ref={trackRef} className="case-detail-next-section" aria-label={label}>
      <div className="case-detail-next-sticky">
        <Container>
          <Link to={href} className="case-detail-next" aria-label={ariaLabel}>
            {image.imageSrc ? (
              <img
                {...responsiveImageProps(image.imageSrc, IMAGE_SIZES.container)}
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

            <div className="case-detail-next-content">
              <span className="case-detail-next-label">{label}</span>
              <span className="case-detail-next-title">
                <span className="case-detail-next-name">{name}</span>
                <span className="case-detail-next-bar" aria-hidden="true">
                  <span ref={barRef} className="case-detail-next-bar-fill" />
                </span>
              </span>
            </div>
          </Link>
        </Container>
      </div>
    </section>
  )
}
