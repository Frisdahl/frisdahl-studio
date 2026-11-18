import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion'
import { useLocale } from '../../context/LocaleContext'
import { getReviewsContent } from '../../data/reviews'
import { EASE_EXIT_BEZIER, EASE_SMOOTH_BEZIER } from '../../lib/motion'
import { ArrowIcon, Container, MaskedLineReveal } from '../ui'

gsap.registerPlugin(ScrollTrigger)

/** The person (portrait, name and role) fades out and fades in, without moving. */
const personVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE_SMOOTH_BEZIER } },
  exit: { opacity: 0, transition: { duration: 0.4, ease: EASE_EXIT_BEZIER } },
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

  // The footer slides up over this section instead of pushing it up: from the moment the section's
  // bottom reaches the bottom of the screen (which is when the footer starts to come in) it stays where
  // it is, and the footer, which sits above it, covers it as the page scrolls on. No extra scroll
  // distance is added (pinSpacing: false), so the page is as long as before. Reduced motion: normal flow.
  const sectionRef = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section || !document.querySelector('footer.site-footer')) return
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'bottom bottom',
        end: () => ScrollTrigger.maxScroll(window),
        pin: true,
        pinSpacing: false,
        invalidateOnRefresh: true,
      })
      return () => trigger.kill()
    })
    return () => mm.revert()
  }, [])

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
        srcSet={review.imageSrcSet}
        sizes="210px"
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
    <section ref={sectionRef} className="reviews-section" aria-label={ariaLabel}>
      <Container columns>
        <div className="reviews-grid">
          {/* The arrows and the position only show once there is more than one review. */}
          {count > 1 && (
            <div className="reviews-controls">
              <button type="button" className="reviews-arrow" aria-label={previousLabel} onClick={() => goTo(index - 1)}>
                <ArrowIcon rotate={180} />
              </button>
              <button type="button" className="reviews-arrow" aria-label={nextLabel} onClick={() => goTo(index + 1)}>
                <ArrowIcon />
              </button>
              <span className="reviews-count" aria-hidden="true">
                {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
              </span>
            </div>
          )}

          {/* One presence for both: the quote lines and the person switch
              together. The wrapper has no box (display: contents), so the quote
              and the person sit directly on the grid. */}
          <AnimatePresence mode="wait">
            <motion.div key={index} className="reviews-swap" variants={swapVariants} initial="hidden" animate="show" exit="exit">
              <div className="reviews-body">
                {/* The quotation mark (the designer's SVG, rotated 180°: the pointed hooks face up) in the accent red stands
                    in for the quote's own marks (there is no closing one). It
                    doesn't animate: it stays while the review switches. */}
                <svg
                  className="reviews-quote-mark"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 4 32 24"
                  fill="currentColor"
                  aria-hidden="true"
                  focusable="false"
                >
                  <g transform="rotate(180 16 16)">
                    <path d="M0,4v12h8c0,4.41-3.586,8-8,8v4c6.617,0,12-5.383,12-12V4H0z" />
                    <path d="M20,4v12h8c0,4.41-3.586,8-8,8v4c6.617,0,12-5.383,12-12V4H20z" />
                  </g>
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
                  <MaskedLineReveal key={index} as="div">{review.quote}</MaskedLineReveal>
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
