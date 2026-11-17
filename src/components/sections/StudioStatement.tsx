import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLocale } from '../../context/LocaleContext'
import { getHomeContent } from '../../data/home'
import { responsiveImageProps } from '../../lib/responsiveImage'
import { MEET_US_PATH } from '../../lib/routes'
import { Container, SectionLabel } from '../ui'

gsap.registerPlugin(ScrollTrigger)

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
 * "( Frisdahl Studio )" and the studio's description, centred on the screen, over a full-screen
 * picture under a dark overlay, a plus in each corner. The picture is taller than the section and
 * drifts slower than the page (parallax: translateY only, scrubbed to the scroll). The label opens
 * (the closing bracket slides right, then the text rises) when it comes into view. Reduced motion:
 * a still picture. The section is dark, so the header turns light while it is under it
 * (data-header-theme).
 */
export function StudioStatement() {
  const { locale } = useLocale()
  const { cases } = getHomeContent(locale)
  const { intro } = cases
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const image = imageRef.current
    if (!section || !image) return

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
      return () => {
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

        <Plus className="statement-plus-tl" />
        <Plus className="statement-plus-tr" />
        <Plus className="statement-plus-bl" />
        <Plus className="statement-plus-br" />

        <Container columns className="studio-statement-container" contentClassName="studio-statement-grid">
          <SectionLabel className="studio-statement-label">{intro.label}</SectionLabel>
          <p className="studio-statement-text">
            <span className="studio-statement-indent" aria-hidden="true" />
            {intro.textBefore}
            <Link to={MEET_US_PATH} className="studio-statement-link">
              {intro.name}
            </Link>
            {intro.textAfter}
          </p>
        </Container>
    </section>
  )
}
