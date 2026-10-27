import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLocale } from '../../context/LocaleContext'
import styles from './Hero.module.css'

gsap.registerPlugin(ScrollTrigger)

/** How far the pinned hero's content drifts up while the cases section covers it. */
const DRIFT_PX = 80

const heroContent = {
  da: {
    // Three lines: line 2 carries the muted colour, the final full stop the accent red.
    headingLead: 'Jeg udvikler',
    headingMuted: 'digitale oplevelser',
    headingTail: 'med omtanke',
    intro:
      'Jeg designer og udvikler hjemmesider og webapps, der kombinerer stærkt design, gennemført brugeroplevelse og teknisk performance – fra idé til færdigt produkt.',
  },
  en: {
    headingLead: 'I develop',
    headingMuted: 'digital experiences',
    headingTail: 'with care',
    intro:
      'I design and develop websites and webapps that combine strong design, thoughtful user experience and technical performance – from idea to finished product.',
  },
} as const

export function Hero() {
  const { locale } = useLocale()
  const content = heroContent[locale]
  const heroRef = useRef<HTMLElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  // Desktop only, where the hero is pinned (see Hero.module.css): its content
  // drifts up a little, scrubbed over the scroll it takes the cases section
  // to cover it, so it seems to move with the section rolling over it.
  useLayoutEffect(() => {
    const hero = heroRef.current
    const inner = innerRef.current
    if (!hero || !inner) return

    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.to(inner, {
        y: -DRIFT_PX,
        ease: 'none',
        // The hero sits at the top of the page, so this runs from the first
        // scroll until the cases section has covered it.
        scrollTrigger: {
          start: 0,
          end: () => hero.offsetHeight,
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section ref={heroRef} className={styles.hero} aria-labelledby="home-hero-title">
      <div ref={innerRef} className={styles.inner}>
        <div className={styles.copy}>
          <h1 id="home-hero-title" className={styles.title}>
            {content.headingLead}
            <br />
            <span className={styles.titleMuted}>{content.headingMuted}</span>
            <br />
            {content.headingTail}
            <span className={styles.titleDot}>.</span>
          </h1>
          <p className={styles.intro}>{content.intro}</p>
        </div>

        <div className={styles.media}>
          <video src="/promo_h264.mp4" autoPlay muted loop playsInline aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
