import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useLocale } from '../../context/LocaleContext'
import { getHomeContent } from '../../data/home'
import { getSmoothScroll } from '../../lib/scroll'
import { MEET_US_PATH } from '../../lib/routes'
import { Container, SectionLabel } from '../ui'
import type { SectionLabelHandle } from '../ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger, SplitText)

/**
 * "( Frisdahl Studio )" and the studio's description, dark on the page's light ground.
 *
 * The section is almost four screens tall and its content sits in a frame that sticks to the screen
 * while the section scrolls by. The label opens by itself, on a clock (it does not depend on how
 * fast you scroll): only "( )" stands there, the closing bracket slides right to the end, then the
 * label text rises between the brackets. Once the frame is on the screen the big text is written by
 * the scroll, slowly: each character fades in, the first line left to right, then the next line,
 * and so on. It only ever moves forward: scrolling up does not unwrite it. When the frame lets go
 * the section shrinks to one screen (class is-written) and the scroll position is corrected by the
 * height removed, so there is no jump and no long stretch to scroll back through.
 *
 * Reduced motion: everything is shown at once and the section is one screen high.
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
      // The label: on a clock, started when the section is nearly at the top of the screen.
      gsap.set(parts.text, { yPercent: 115 })
      const labelOpen = gsap
        .timeline({ paused: true, defaults: { ease: 'power3.out' } })
        .fromTo(parts.close, { x: () => -parts.travel() }, { x: 0, duration: 1 }, 0.15)
        .to(parts.text, { yPercent: 0, duration: 0.7 }, 1)
      ScrollTrigger.create({ trigger: section, start: 'top 35%', once: true, onEnter: () => labelOpen.play() })

      // The big text: characters stay inside their words, so a word never breaks across lines. They
      // fade in over the scroll, a few at a time, from the start of the stuck frame; the last tenth of
      // the scroll holds the whole text.
      const split = SplitText.create(text, { type: 'words,chars' })
      const chars = split.chars
      gsap.set(chars, { opacity: 0 })
      const each = 0.8 / Math.max(1, chars.length)
      const writing = gsap
        .timeline({ paused: true, defaults: { ease: 'none' } })
        .to(chars, { opacity: 1, duration: each * 10, stagger: each }, 0.05)
        .to({}, { duration: 0.05 }, 0.95)

      // One way only: the scroll can push the writing forward but never back. What is written stays
      // written when you scroll up; the tween follows the furthest point reached, a little behind it.
      let furthest = 0
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (self.progress <= furthest) return
          furthest = self.progress
          gsap.to(writing, { progress: furthest, duration: 0.6, ease: 'none', overwrite: true })
        },
      })

      // When the writing is done and the frame lets go (the section's bottom reaches the bottom of the
      // screen), the tall section is no longer needed: it shrinks to one screen. At that moment the
      // frame fills the screen either way, so nothing visible changes; the page below moves up by what
      // was taken away, so the scroll position is moved up by the same amount. Scrolling back up then
      // leaves the section at once instead of through the whole stuck stretch.
      ScrollTrigger.create({
        trigger: section,
        start: 'bottom bottom',
        onEnter: () => {
          if (section.classList.contains('is-written')) return
          gsap.set(chars, { opacity: 1 })
          writing.progress(1)
          const before = section.offsetHeight
          section.classList.add('is-written')
          const delta = before - section.offsetHeight
          if (delta > 0) {
            const target = Math.max(0, window.scrollY - delta)
            const lenis = getSmoothScroll()
            if (lenis) lenis.scrollTo(target, { immediate: true, force: true })
            else window.scrollTo(0, target)
          }
          ScrollTrigger.refresh()
        },
      })

      return () => {
        split.revert()
        labelOpen.kill()
        writing.kill()
        section.classList.remove('is-written')
        gsap.set([parts.close, parts.text], { clearProps: 'transform' })
      }
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={sectionRef} className="studio-statement" aria-label={intro.label}>
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
