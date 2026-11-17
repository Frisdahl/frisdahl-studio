import { useLayoutEffect, useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLocale } from '../../context/LocaleContext'
import { whenPageRevealed } from '../../lib/pageReveal'
import { responsiveImageProps } from '../../lib/responsiveImage'
import { BracketLine } from '../ui'
import styles from './Hero.module.css'

gsap.registerPlugin(ScrollTrigger)

const heroContent = {
  da: {
    // The two words of the headline: the first top left of the picture, the second bottom right.
    firstWord: 'Beyond',
    secondWord: 'Digital',
    line: 'gennemtænkt design og hurtige hjemmesider',
  },
} as const

interface HeroSlide {
  imageSrc: string
  alt: { da: string }
}

/** The centre picture switches between these mockups. */
const heroSlides: HeroSlide[] = [
  { imageSrc: '/images/hero/pass-mockup--4-3.webp', alt: { da: 'Rød PASS-badge på en lanyard' } },
  { imageSrc: '/images/hero/hero-2-montra-iphone.webp', alt: { da: 'Landingsside-koncept for Montra på en iPhone op ad en riflet væg' } },
  { imageSrc: '/images/hero/hero-1-noma-living-macbook.webp', alt: { da: 'Landingsside-koncept for Noma Living på en MacBook på en sofa' } },
  { imageSrc: '/images/hero/hero-4-auren-iphone.webp', alt: { da: 'Landingsside-koncept for Auren på en iPhone på en grå puf' } },
  { imageSrc: '/images/hero/hero-3-rethink-furniture-macbook.webp', alt: { da: 'Landingsside-koncept for Rethink Furniture på en MacBook på en polstret stol' } },
  { imageSrc: '/images/hero/hero-5-elina-vestergaard-macbook.webp', alt: { da: 'Landingsside-koncept for Elina Vestergaard på en MacBook på en stenblok' } },
  { imageSrc: '/images/hero/hero-6-noma-living-iphone.webp', alt: { da: 'Landingsside-koncept for Noma Living på en iPhone i et hjørne' } },
]

/** Seconds a picture stays before the next one wipes in, and how long the wipe takes. */
const HOLD = 2.2
const WIPE = 0.9

/** Rendered width of the centre picture (25vw on desktop, 46vw below 1024px). */
const MEDIA_SIZES = '(min-width: 1024px) 25vw, 46vw'

/**
 * The home hero. "Beyond" stands top left and "Digital" bottom right, big, with a picture between
 * them that the lower half of the first word and the upper half of the second lie over. The words
 * are white with mix-blend-mode: difference, so they invert against whatever is behind them: dark
 * on the white page, light on the dark parts of a mockup, tinted over a colour. A line in
 * brackets sits under the first word.
 *
 * Motion: the words rise out of their masks when the page is uncovered, and the picture changes
 * with a wipe from the bottom, one mockup after the other (paused while the hero is off screen).
 * Reduced motion: everything is shown at once and the first picture stays.
 */
export function Hero() {
  const { locale } = useLocale()
  const content = heroContent[locale]
  const sectionRef = useRef<HTMLElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const wordsRef = useRef<HTMLHeadingElement>(null)
  // Resolves when the page is uncovered (right away unless a transition is running).
  const revealed = useMemo(() => whenPageRevealed(), [])

  // Entrance: the words rise out of their masks, the bracketed line fades in.
  useLayoutEffect(() => {
    const words = wordsRef.current ? Array.from(wordsRef.current.querySelectorAll<HTMLElement>('[data-word]')) : []
    const line = sectionRef.current?.querySelector<HTMLElement>('[data-hero-line]')
    if (words.length === 0) return

    const mm = gsap.matchMedia()
    let cancelled = false
    mm.add('(prefers-reduced-motion: no-preference)', (context) => {
      gsap.set(words, { yPercent: 110 })
      if (line) gsap.set(line, { autoAlpha: 0 })
      void revealed.then(() => {
        if (cancelled) return
        context.add?.(() => {
          gsap.to(words, { yPercent: 0, duration: 1.2, ease: 'expo.out', stagger: 0.12, delay: 0.1 })
          if (line) gsap.to(line, { autoAlpha: 1, duration: 0.9, ease: 'power2.out', delay: 0.7 })
        })
      })
    })
    return () => {
      cancelled = true
      mm.revert()
    }
  }, [revealed])

  // The centre picture: each mockup wipes in over the one before it, from the bottom.
  useLayoutEffect(() => {
    const media = mediaRef.current
    const section = sectionRef.current
    const slides = media ? Array.from(media.querySelectorAll<HTMLElement>('[data-slide]')) : []
    if (!media || !section || slides.length < 2) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.set(slides, { zIndex: 0 })
      gsap.set(slides[0], { zIndex: 1 })
      slides.slice(1).forEach((slide) => gsap.set(slide, { clipPath: 'inset(100% 0% 0% 0%)' }))
      const tl = gsap.timeline({ repeat: -1, paused: true })
      slides.forEach((slide, index) => {
        const next = slides[(index + 1) % slides.length]
        tl.set(next, { zIndex: 2, clipPath: 'inset(100% 0% 0% 0%)' }, `+=${HOLD}`)
          .to(next, { clipPath: 'inset(0% 0% 0% 0%)', duration: WIPE, ease: 'expo.inOut' })
          .set(slide, { zIndex: 0 })
          .set(next, { zIndex: 1 })
      })
      // Only runs while the hero is on screen.
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => (self.isActive ? tl.play() : tl.pause()),
      })
      return () => {
        trigger.kill()
        tl.kill()
        gsap.set(slides, { clearProps: 'clipPath,zIndex' })
      }
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={sectionRef} className={styles.hero} aria-labelledby="home-hero-title" data-page-entrance="own">
      <div className={styles.stage}>
        <div className={styles.block}>
          <div ref={mediaRef} className={styles.media}>
            {heroSlides.map((slide, index) => (
              <img
                key={slide.imageSrc}
                data-slide
                className={styles.slide}
                {...responsiveImageProps(slide.imageSrc, MEDIA_SIZES)}
                alt={slide.alt[locale]}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                draggable={false}
              />
            ))}
          </div>

          <h1 id="home-hero-title" ref={wordsRef} className={styles.title}>
            <span className={`${styles.wordMask} ${styles.first}`}>
              <span data-word className={styles.word}>{content.firstWord}</span>
            </span>{' '}
            <span className={`${styles.wordMask} ${styles.second}`}>
              <span data-word className={styles.word}>{content.secondWord}</span>
            </span>
          </h1>

          <div data-hero-line className={styles.line}>
            <BracketLine>{content.line}</BracketLine>
          </div>
        </div>
      </div>
    </section>
  )
}
