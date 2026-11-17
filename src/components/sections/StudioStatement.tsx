import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useLocale } from '../../context/LocaleContext'
import { getHomeContent } from '../../data/home'
import { EASE, LABEL } from '../../lib/motion'
import { MEET_US_PATH } from '../../lib/routes'
import { Container, SectionLabel } from '../ui'
import type { SectionLabelHandle } from '../ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger, SplitText)

/** The text before it is read: light grey (--color-disabled). It ends in the ink (--color-dark). */
const TEXT_GREY = '#bababa'
const TEXT_INK = '#131313'

/** Scrolling this far into the screen starts it (the section's top at this share of the screen's height). */
const START = 'top 80%'

/**
 * "( Frisdahl Studio )" and the studio's description, dark on the page's light ground.
 *
 * The section is one half-screen frame that scrolls with the page (nothing sticks to the screen).
 * Scrolling to the section starts a short intro on its own clock: only "( )" stands there, the
 * closing bracket slides right to the end of the label, and the label text rises between the
 * brackets. The big text, light grey until now, then turns dark character by character, the first
 * line left to right, then the next line, and so on, driven by the scroll (smoothed, so it
 * eases after the wheel instead of stepping), one way only: text that has turned dark stays dark when
 * scrolling back up. It finishes once the text is in the upper half of
 * the screen. The section's height never changes, so nothing jumps; the text follows the hand
 * both ways and there is no stretch of scrolling with nothing happening.
 *
 * Reduced motion: the finished section at once, one frame high, no movement.
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

      // The intro: brackets and label, on a short clock that starts when the section comes in.
      const intro = gsap
        .timeline({ paused: true })
        .fromTo(parts.close, { x: () => -parts.travel() }, { x: 0, duration: LABEL.slide, ease: EASE.rise }, 0.05)
        .to(parts.text, { yPercent: 0, duration: LABEL.rise, ease: EASE.rise }, 0.05 + LABEL.slide - LABEL.overlap)
      const introTrigger = ScrollTrigger.create({ trigger: section, start: START, once: true, onEnter: () => intro.play() })

      // The writing: each character is a soft fade that overlaps its neighbours (a wipe, not a
      // hard step), spread over the scroll while the section travels from the lower part of the screen
      // (top at 70%) to the upper part (top at 15%).
      const each = 1 / Math.max(1, chars.length)
      const write = gsap.timeline({ paused: true, defaults: { ease: 'none' } })
      write.to(chars, { color: TEXT_INK, duration: each * 14, stagger: each })

      // One way only: the scroll sets how far the writing may go, and it never goes back, so text that
      // has turned dark stays dark when the visitor scrolls up. It still eases after the wheel (the
      // same 0.6 s smoothing the scrub had) instead of stepping.
      let reached = 0
      const writeTrigger = ScrollTrigger.create({
        trigger: section,
        start: 'top 70%',
        end: 'top 15%',
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (self.progress <= reached) return
          reached = self.progress
          gsap.to(write, { progress: reached, duration: 0.6, ease: 'power2.out', overwrite: true })
        },
      })

      return () => {
        introTrigger.kill()
        writeTrigger.kill()
        gsap.killTweensOf(write)
        write.kill()
        split.revert()
        intro.kill()
        gsap.set([parts.close, parts.text], { clearProps: 'transform' })
      }
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={sectionRef} className="studio-statement" aria-label={intro.label}>
      {/* Half a screen high; scrolls with the page. */}
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
