import { useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLocale } from '../../context/LocaleContext'
import { getCaseDetail } from '../../data/caseDetails'
import { useScrollTrackProgress } from '../../hooks/useScrollTrackProgress'
import { navigateWithSharedTransition } from '../../lib/pageTransition'
import { lockScroll, unlockScroll } from '../../lib/scroll'
import type { CaseDetailNext } from '../../types/caseDetail'
import { IMAGE_SIZES, responsiveImageProps } from '../../lib/responsiveImage'
import { Container } from '../ui'

interface CaseDetailNextSectionProps {
  nextCase: CaseDetailNext
}

// How far the image zooms in while the card is pinned (0 = no zoom). Kept
// small enough that the mockup's screen stays in view.
const IMAGE_ZOOM = 0.06
// Smooth scrolling eases into the last pixels for seconds, so waiting for exactly 1 feels stuck.
const TRIGGER_PROGRESS = 0.985
// How long the full bar stays on screen before the transition starts (ms). The transition hides
// the card in the frame it begins, so started at once the full bar would never be painted.
const FULL_BAR_HOLD = 160

/**
 * The next case at the end of the page. The card sticks while the section's
 * extra scroll room passes; the bar under the title fills with that scroll and
 * the image zooms in with it, and when it is full the image grows into the
 * next case's hero (the shared-image transition) and the page moves on.
 */
export function CaseDetailNextSection({ nextCase }: CaseDetailNextSectionProps) {
  const { href, name, label, image, ariaLabel } = nextCase
  const trackRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLAnchorElement>(null)
  const barRef = useRef<HTMLSpanElement>(null)
  const imageRef = useRef<HTMLImageElement & HTMLDivElement>(null)
  const hasNavigatedRef = useRef(false)
  const navigate = useNavigate()
  const { locale } = useLocale()
  const shouldReduceMotion = useReducedMotion()

  const holdTimerRef = useRef(0)
  // The scroll is frozen while the full bar is held, until the transition takes over (or is cancelled).
  const holdPendingRef = useRef(false)

  useEffect(() => {
    hasNavigatedRef.current = false
    return () => {
      window.clearTimeout(holdTimerRef.current)
      if (holdPendingRef.current) {
        holdPendingRef.current = false
        unlockScroll()
      }
    }
  }, [href])

  // The next case's hero picture is fetched and decoded now, while the card is on its way up,
  // so the transition doesn't stand still waiting for it once the page changes.
  useEffect(() => {
    const slug = href.split('/').pop()
    const src = slug ? getCaseDetail(locale, slug)?.hero.slides[0]?.imageSrc : null
    if (!src) return
    const props = responsiveImageProps(src, IMAGE_SIZES.container)
    const warm = new Image()
    if (props.srcSet) warm.srcset = props.srcSet
    if (props.sizes) warm.sizes = props.sizes
    warm.src = props.src
    warm.decode().catch(() => {})
  }, [href, locale])

  const onProgress = useCallback(
    (progress: number) => {
      // Once the bar has been filled and the page is on its way, later scroll frames leave it full.
      if (hasNavigatedRef.current) return
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`
      if (imageRef.current && !shouldReduceMotion) {
        imageRef.current.style.transform = `scale(${1 + IMAGE_ZOOM * progress})`
      }

      // Reduced motion: the bar still shows progress, but the page never
      // changes without a click.
      if (progress < TRIGGER_PROGRESS || shouldReduceMotion || hasNavigatedRef.current) return
      hasNavigatedRef.current = true
      // The trigger fires a hair before the end of the scroll: finish the bar (and the zoom
      // that goes with it), and let that full bar be seen before the page moves on.
      if (barRef.current) barRef.current.style.transform = 'scaleX(1)'
      if (imageRef.current) imageRef.current.style.transform = `scale(${1 + IMAGE_ZOOM})`
      // Scrolling stops here, momentum included: the page does not drift on while the bar is held.
      lockScroll()
      holdPendingRef.current = true
      holdTimerRef.current = window.setTimeout(() => {
        holdPendingRef.current = false
        // The image grows into the next case's hero, like a card on the home page.
        const card = cardRef.current
        if (card) navigateWithSharedTransition(href, card, navigate)
        else navigate(href)
      }, FULL_BAR_HOLD)
    },
    [href, navigate, shouldReduceMotion],
  )

  useScrollTrackProgress(trackRef, onProgress)

  // Clears the way for the card: the case CTA bar fades out once the card is on
  // the screen, and the header fades out once the card reaches it (just
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
