import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useLocale } from '../../context/LocaleContext'
import { getHomeContent } from '../../data/home'
import { MEET_US_PATH } from '../../lib/routes'
import { Container, SectionLabel } from '../ui'
import type { SectionLabelHandle } from '../ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger, SplitText)

/**
 * "( Frisdahl Studio )" and the studio's description, on the dark ground, written out by the scroll.
 *
 * The section is about two and a half screens tall and its content sits in a frame that sticks to
 * the screen while the section scrolls by. As you scroll, in this order: only the brackets stand
 * there as "( )"; the closing bracket slides right to the end of the label; the label text rises
 * between the brackets; then the big text fades in, character by character, the first line left to
 * right, then the next line, and so on. The rest of the scroll holds the finished section.
 *
 * Reduced motion: everything is shown at once and the section is one screen high. The section is
 * dark, so the header turns light while it is under it (data-header-theme).
 */
export function StudioStatement() {
  const { locale } = useLocale()
  const { cases } = getHomeContent(locale)
  const { intro } = cases
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<SectionLabelHandle>(null)
  const textRef = useRef<HTMLParagraphElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const text = textRef.current
    const parts = labelRef.current?.parts()
    if (!section || !text || !parts) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Characters stay inside their words, so a word never breaks across lines.
      const split = SplitText.create(text, { type: 'words,chars' })
      const chars = split.chars
      gsap.set(chars, { opacity: 0 })

      // One scrubbed timeline of length 1: the brackets, the label text, then the writing.
      const each = 0.68 / Math.max(1, chars.length)
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
        .fromTo(parts.close, { x: () => -parts.travel() }, { x: 0, duration: 0.1, ease: 'power3.out' }, 0)
        .fromTo(parts.text, { yPercent: 115 }, { yPercent: 0, duration: 0.1, ease: 'power3.out' }, 0.1)
        .to(chars, { opacity: 1, duration: each * 6, stagger: each }, 0.22)
        .to({}, { duration: 0.1 }, 0.9)

      return () => {
        split.revert()
        gsap.set([parts.close, parts.text], { clearProps: 'transform' })
      }
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={sectionRef} className="studio-statement" aria-label={intro.label} data-header-theme="dark">
      {/* One screen high, stuck to the screen while the section scrolls by. */}
      <div className="studio-statement-frame">
        <Container columns className="studio-statement-container" contentClassName="studio-statement-grid">
          <SectionLabel ref={labelRef} autoplay={false} className="studio-statement-label">
            {intro.label}
          </SectionLabel>
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
