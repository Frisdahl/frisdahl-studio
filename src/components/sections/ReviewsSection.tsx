import { useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion'
import { useLocale } from '../../context/LocaleContext'
import { getReviewsContent } from '../../data/reviews'
import { ArrowIcon, Container, MaskedLines } from '../ui'

/** The person (portrait, name and role) fades out and fades in, without moving. */
const personVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.4, ease: 'easeIn' } },
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
 * Testimonial carousel on the 12-column grid. Left: the arrows (on circles).
 * Right: the quote, and under it, at its left edge, the reviewer's circular
 * portrait with name, role and company. The reviews change only with the
 * arrows (no timer): the quote's lines slide up and the next ones down from
 * above, and the person fades between.
 */
export function ReviewsSection() {
  const { locale } = useLocale()
  const { ariaLabel, previousLabel, nextLabel, reviews } = getReviewsContent(locale)
  const reduced = useReducedMotion() === true
  const [index, setIndex] = useState(0)

  const count = reviews.length
  const review = reviews[index]

  const goTo = (nextIndex: number) => {
    setIndex((nextIndex + count) % count)
  }

  const probesRef = useRef<HTMLDivElement>(null)
  // The tallest quote's height: reserved so a shorter review never pulls the
  // person row (or the page below it) up.
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
                {/* The quotation mark (the designer's SVG) in the accent red stands
                    in for the quote's own marks (there is no closing one). It
                    doesn't animate: it stays while the review switches. */}
                <svg
                  className="reviews-quote-mark"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 63 41"
                  fill="currentColor"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M62.6996 0.000183105C61.7996 4.2002 60.8496 8.75019 59.8496 13.6502C58.8496 18.4502 57.9496 23.1502 57.1496 27.7502C56.4496 32.3502 55.8496 36.5502 55.3496 40.3502H34.4996L33.4496 38.7002C34.3496 35.1002 35.4996 31.0002 36.8996 26.4002C38.2996 21.8002 39.7996 17.1502 41.3996 12.4502C43.0996 7.75019 44.7496 3.60019 46.3496 0.000183105H62.6996ZM29.0996 0.000183105C28.1996 4.2002 27.2496 8.75019 26.2496 13.6502C25.2496 18.4502 24.3496 23.1502 23.5496 27.7502C22.8496 32.3502 22.2496 36.5502 21.7496 40.3502H0.89961L-0.00039053 38.7002C0.89961 35.1002 2.04961 31.0002 3.44961 26.4002C4.84961 21.8002 6.34961 17.1502 7.94961 12.4502C9.64961 7.75019 11.2996 3.60019 12.8996 0.000183105H29.0996Z" />
                </svg>
                {/* Hidden copies of every quote at the same width and type;
                    the tallest one sets the height reserved below. */}
                <div ref={probesRef} className="reviews-quote-probes" aria-hidden="true">
                  {reviews.map((item) => (
                    <div key={item.quote} data-probe className="reviews-quote">
                      {item.quote}
                    </div>
                  ))}
                </div>
                <blockquote
                  className="reviews-quote"
                  style={quoteHeight ? { minHeight: `${quoteHeight}px` } : undefined}
                >
                  <MaskedLines key={index} text={review.quote} />
                </blockquote>
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
