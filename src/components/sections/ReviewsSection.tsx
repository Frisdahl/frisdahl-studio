import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion'
import { useLocale } from '../../context/LocaleContext'
import { getReviewsContent } from '../../data/reviews'
import { ArrowIcon, Container, MaskedLines } from '../ui'

/** Each review shows for 15 seconds before the carousel moves on. */
const REVIEW_DURATION_MS = 15000

/** The person fades out sliding up, and in again sliding down from above. */
const personVariants: Variants = {
  hidden: { opacity: 0, y: -28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -28, transition: { duration: 0.4, ease: [0.6, 0, 0.9, 1] } },
}

/**
 * Empty coordinating variants: the quote and the person are swapped by ONE
 * AnimatePresence, so both start their exit and their enter at the same
 * moment; only their own variants set how each piece moves.
 */
const swapVariants: Variants = {
  hidden: {},
  show: {},
  exit: {},
}

/**
 * Testimonial carousel on the 12-column grid. Left: the arrows (on circles). Right: the quote with a 15-second progress bar
 * under it, and under that, at the quote's left edge, the reviewer's circular
 * portrait with name, role and company. Switching reviews slides the quote's
 * lines up and the next ones down from above; the progress bar just restarts,
 * and the person fades between.
 */
export function ReviewsSection() {
  const { locale } = useLocale()
  const { ariaLabel, previousLabel, nextLabel, reviews } = getReviewsContent(locale)
  const reduced = useReducedMotion() === true
  const [index, setIndex] = useState(0)
  // 0 → 1 across the current review's 15 seconds.
  const [progress, setProgress] = useState(0)

  const count = reviews.length
  const review = reviews[index]
  // Without the timer the bar rests full instead of at zero.
  const fill = reduced ? 1 : progress

  const goTo = (nextIndex: number) => {
    setIndex((nextIndex + count) % count)
    setProgress(0)
  }

  const probesRef = useRef<HTMLDivElement>(null)
  // The tallest quote's height: reserved so a shorter review never pulls the
  // progress bar (or the page below it) up.
  const [quoteHeight, setQuoteHeight] = useState<number | null>(null)

  // The hidden probes render every quote at the quote's exact width, so the
  // tallest offsetHeight is what the block needs; re-run on resize and once
  // the webfonts are ready.
  useLayoutEffect(() => {
    let cancelled = false
    let frame = 0

    const measure = () => {
      const probes = probesRef.current?.querySelectorAll<HTMLElement>('[data-probe]')
      if (!probes || probes.length === 0) return
      let max = 0
      probes.forEach((probe) => {
        max = Math.max(max, probe.offsetHeight)
      })
      if (cancelled || max === 0) return
      setQuoteHeight((current) => (current === max ? current : max))
    }

    measure()
    document.fonts.ready.then(() => {
      if (!cancelled) measure()
    })
    const onResize = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(measure)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
    }
  }, [locale])

  useEffect(() => {
    // Reduced motion: no timer, no auto-advance; the fill rests full below.
    if (reduced) return

    let frame: number
    let start: number | null = null
    const tick = (now: number) => {
      if (start === null) start = now
      const ratio = Math.min((now - start) / REVIEW_DURATION_MS, 1)
      setProgress(ratio)
      if (ratio < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        setIndex((current) => (current + 1) % count)
        setProgress(0)
      }
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [index, count, reduced])

  const person = (
    <>
      <img
        className="reviews-avatar"
        src={review.imageSrc}
        alt={review.imageAlt}
        loading="lazy"
        decoding="async"
      />
      <div className="reviews-person-text">
        <p className="reviews-name">{review.name}</p>
        <p className="reviews-role">
          {review.role} · {review.company}
        </p>
      </div>
    </>
  )

  return (
    <section className="reviews-section py-section-sm lg:py-section" aria-label={ariaLabel}>
      <Container columns>
        <div className="reviews-grid">
          <div className="reviews-controls">
            <button
              type="button"
              className="reviews-arrow"
              aria-label={previousLabel}
              onClick={() => goTo(index - 1)}
            >
              <ArrowIcon rotate={180} />
            </button>
            <button
              type="button"
              className="reviews-arrow"
              aria-label={nextLabel}
              onClick={() => goTo(index + 1)}
            >
              <ArrowIcon />
            </button>
          </div>

          {/* One presence for both: the quote lines and the person switch
              together. The wrapper has no box (display: contents), so the quote
              and the person sit directly on the grid. */}
          <AnimatePresence mode="wait">
            <motion.div key={index} className="reviews-swap" variants={swapVariants} initial="hidden" animate="show" exit="exit">
              <div className="reviews-body">
                {/* Hidden copies of every quote at the same width and type;
                    the tallest one sets the height reserved below. */}
                <div ref={probesRef} className="reviews-quote-probes" aria-hidden="true">
                  {reviews.map((item) => (
                    <div key={item.quote} data-probe className="reviews-quote">
                      {`“${item.quote}”`}
                    </div>
                  ))}
                </div>
                <blockquote
                  className="reviews-quote"
                  style={quoteHeight ? { minHeight: `${quoteHeight}px` } : undefined}
                >
                  <MaskedLines key={index} text={`“${review.quote}”`} />
                </blockquote>
                <div className="reviews-progress" role="presentation" aria-hidden="true">
                  <span className="reviews-progress-fill" style={{ transform: `scaleX(${fill})` }} />
                </div>
              </div>

              {reduced ? (
                <div className="reviews-person">{person}</div>
              ) : (
                <motion.div className="reviews-person" variants={personVariants} initial="hidden" animate="show" exit="exit">
                  {person}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  )
}
