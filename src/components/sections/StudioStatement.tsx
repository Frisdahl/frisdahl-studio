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

/** The text before it is read: light grey (--color-disabled). It ends in the ink (--color-dark). */
const TEXT_GREY = '#bababa'
const TEXT_INK = '#131313'

/** Scrolling this far into the screen starts it (the section's top at this share of the screen's height). */
const START = 'top 68%'

/**
 * "( Frisdahl Studio )" and the studio's description, dark on the page's light ground.
 *
 * Scrolling to the section starts a short sequence that then runs on its own clock (it does not
 * follow the scroll to its end): only "( )" stands there, the closing bracket slides right to the
 * end of the label, the label text rises between the brackets, and then the big text, which has
 * been light grey, turns dark character by character, the first line left to right, then the next
 * line, and so on. It plays once.
 *
 * Reduced motion: the finished section at once, no movement.
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
      gsap.set(chars, { color: TEXT_GREY })
      gsap.set(parts.text, { yPercent: 115 })

      const each = 2.2 / Math.max(1, chars.length)
      const sequence = gsap
        .timeline({ paused: true })
        .fromTo(parts.close, { x: () => -parts.travel() }, { x: 0, duration: 1, ease: 'power3.out' }, 0.1)
        .to(parts.text, { yPercent: 0, duration: 0.7, ease: 'power3.out' }, 0.9)
        .to(chars, { color: TEXT_INK, duration: 0.4, ease: 'none', stagger: each }, 1.3)
      ScrollTrigger.create({ trigger: section, start: START, once: true, onEnter: () => sequence.play() })

      return () => {
        split.revert()
        sequence.kill()
        gsap.set([parts.close, parts.text], { clearProps: 'transform' })
      }
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={sectionRef} className="studio-statement" aria-label={intro.label}>
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
    </section>
  )
}
