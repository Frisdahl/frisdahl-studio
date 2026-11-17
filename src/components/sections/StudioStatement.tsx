import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useLocale } from '../../context/LocaleContext'
import { getHomeContent } from '../../data/home'
import { responsiveImageProps } from '../../lib/responsiveImage'
import { MEET_US_PATH } from '../../lib/routes'
import { Container, SectionLabel } from '../ui'

gsap.registerPlugin(ScrollTrigger, SplitText)

const BACKGROUND = '/images/statement-book--4-3.webp'

/** A thin plus in a corner of the picture. */
function Plus({ className }: { className: string }) {
  return (
    <svg className={`statement-plus ${className}`} viewBox="0 0 22 22" aria-hidden="true" focusable="false">
      <path d="M11 0v22M0 11h22" />
    </svg>
  )
}

/**
 * "( Frisdahl Studio )" and the studio's description over a tall picture under a dark overlay, a
 * plus in each corner of the screen-high frame.
 *
 * The section is about two and a half screens tall and its content (the label and the text) sits
 * in a frame that sticks to the screen while the section scrolls by, so they follow the screen
 * while the picture moves behind them (parallax: the picture drifts slower than the page,
 * translateY only). They start high on the screen. While the frame is stuck, the big text is written
 * out by the scroll: each character fades in, the first line left to right, then the next line,
 * and so on. The label opens (the closing bracket slides right, the text rises) when it comes into
 * view. Reduced motion: still picture, the text shown at once. The section is dark, so the header
 * turns light while it is under it (data-header-theme).
 */
export function StudioStatement() {
  const { locale } = useLocale()
  const { cases } = getHomeContent(locale)
  const { intro } = cases
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const image = imageRef.current
    const text = textRef.current
    if (!section || !image || !text) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // The picture is 120% of the section and centred, so it has 10% to move either way.
      gsap.fromTo(
        image,
        { yPercent: -8.33 },
        {
          yPercent: 8.33,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )

      // The text is written by the scroll: characters (kept inside their words, so a word never
      // breaks across lines) fade in one after another in reading order, over the time the frame
      // is stuck; the last fifth of it is a rest with the whole text shown.
      const split = SplitText.create(text, { type: 'words,chars' })
      const chars = split.chars
      gsap.set(chars, { opacity: 0 })
      const each = 0.8 / Math.max(1, chars.length)
      gsap
        .timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.4,
            invalidateOnRefresh: true,
          },
        })
        .to(chars, { opacity: 1, duration: each * 6, stagger: each }, 0)
        .to({}, { duration: 0.2 })

      return () => {
        split.revert()
        gsap.set(image, { clearProps: 'transform' })
      }
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={sectionRef} className="studio-statement" aria-label={intro.label} data-header-theme="dark">
      <div className="studio-statement-media" aria-hidden="true">
        <img
          ref={imageRef}
          {...responsiveImageProps(BACKGROUND, '100vw')}
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        <div className="studio-statement-overlay" />
      </div>

      {/* One screen high, stuck to the screen while the section scrolls by. */}
      <div className="studio-statement-frame">
        <Plus className="statement-plus-tl" />
        <Plus className="statement-plus-tr" />
        <Plus className="statement-plus-bl" />
        <Plus className="statement-plus-br" />

        <Container columns className="studio-statement-container" contentClassName="studio-statement-grid">
          <SectionLabel className="studio-statement-label">{intro.label}</SectionLabel>
          <p ref={textRef} className="studio-statement-text">
            <span className="studio-statement-indent" aria-hidden="true" />
            {intro.textBefore}
            <Link to={MEET_US_PATH} className="studio-statement-link">
              {intro.name}
            </Link>
            {intro.textAfter}
          </p>
        </Container>
      </div>
    </section>
  )
}
