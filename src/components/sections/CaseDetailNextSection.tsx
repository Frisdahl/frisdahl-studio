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

// How far the image zooms in while the card is pinned (0 = no zoom). Kept
// small enough that the mockup's screen stays in view.
const IMAGE_ZOOM = 0.06

/**
 * The next case at the end of the page. The card sticks while the section's
 * extra scroll room passes; the bar under the title fills with that scroll and
 * the image zooms in with it, and when it is full the page moves on to the
 * next case.
 */
export function CaseDetailNextSection({ nextCase }: CaseDetailNextSectionProps) {
  const { href, name, label, image, ariaLabel } = nextCase
  const trackRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLAnchorElement>(null)
  const barRef = useRef<HTMLSpanElement>(null)
  const imageRef = useRef<HTMLImageElement & HTMLDivElement>(null)
  const hasNavigatedRef = useRef(false)
  const navigate = useNavigate()
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    hasNavigatedRef.current = false
  }, [href])

  const onProgress = useCallback(
    (progress: number) => {
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`
      if (imageRef.current && !shouldReduceMotion) {
        imageRef.current.style.transform = `scale(${1 + IMAGE_ZOOM * progress})`
      }

      // Reduced motion: the bar still shows progress, but the page never
      // changes without a click.
      if (progress < 1 || shouldReduceMotion || hasNavigatedRef.current) return
      hasNavigatedRef.current = true
      navigate(href)
    },
    [href, navigate, shouldReduceMotion],
  )

  useScrollTrackProgress(trackRef, onProgress)

  // Clears the way for the card: the case CTA bar fades out once the card is on
  // the screen, and the header slides away once the card reaches it (just
  // before it pins), so the card can fill the screen between equal gutters.
  useEffect(() => {
    const root = document.documentElement
    let frame = 0
    const update = () => {
      frame = 0
      const card = cardRef.current
      const header = document.querySelector<HTMLElement>('.site-header')
      if (!card) return
      const top = card.getBoundingClientRect().top
      root.classList.toggle('is-next-case-visible', top < window.innerHeight)
      root.classList.toggle('is-next-case-pinned', top <= (header?.offsetHeight ?? 0))
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      root.classList.remove('is-next-case-visible', 'is-next-case-pinned')
    }
  }, [href])

  return (
    <section ref={trackRef} className="case-detail-next-section" aria-label={label}>
      <div className="case-detail-next-sticky">
        <Container>
          <Link ref={cardRef} to={href} className="case-detail-next" aria-label={ariaLabel}>
            {image.imageSrc ? (
              <img
                ref={imageRef}
                {...responsiveImageProps(image.imageSrc, IMAGE_SIZES.container)}
                alt=""
                className="case-detail-next-image"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div
                ref={imageRef}
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
