import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLocale } from '../../context/LocaleContext'
import { CASES_PATH } from '../../lib/routes'
import { responsiveImageProps } from '../../lib/responsiveImage'
import { ArrowChipButton } from '../ui'
import styles from './Hero.module.css'

gsap.registerPlugin(ScrollTrigger)

/** How far the pinned hero's content drifts up while the cases section covers it. */
const DRIFT_PX = 80

/** How dark the hero gets once the cases section has covered it (shade opacity). */
const SHADE_MAX = 0.92

const heroContent = {
  da: {
    // Two lines in the dark ink; "design" in the accent red, a red dot to end on.
    headingLead: 'Digitale løsninger',
    headingBefore: 'med ',
    headingAccent: 'design',
    headingAfter: ' i fokus',
    intro: 'Webudvikling, design og digitale oplevelser, der kombinerer æstetik, funktion og performance.',
    cta: 'Udforsk projekter',
    carouselLabel: 'Udvalgte projekter',
  },
  en: {
    headingLead: 'Digital solutions',
    headingBefore: 'with ',
    headingAccent: 'design',
    headingAfter: ' in focus',
    intro: 'Web development, design and digital experiences that combine aesthetics, function and performance.',
    cta: 'Explore projects',
    carouselLabel: 'Selected projects',
  },
} as const

interface HeroSlide {
  /** Portrait (4:5) image; a slide can instead be a muted looping video. */
  imageSrc: string
  videoSrc?: string
  alt: { da: string; en: string }
}

const heroSlides: HeroSlide[] = [
  { imageSrc: '/images/hero/peter-salling-display.webp', alt: { da: 'Peter Sallings forside med Alt jeg forventede på en skærm', en: 'Peter Salling homepage featuring Alt jeg forventede on a display' } },
  { imageSrc: '/images/hero/noma-living-skaerm.webp', alt: { da: 'Landingsside-koncept for Noma Living på en skærm', en: 'Noma Living landing page concept on a display' } },
  { imageSrc: '/images/hero/auren-mobil.webp', alt: { da: 'Landingsside-koncept for Auren på en mobil op ad en lerkrukke', en: 'Auren landing page concept on a phone against a clay pot' } },
  { imageSrc: '/images/hero/montra-elina-skaerme.webp', alt: { da: 'Landingsside-koncepter for Montra og Elina Vestergaard på to skærme', en: 'Montra and Elina Vestergaard landing page concepts on two displays' } },
  { imageSrc: '/images/hero/poster-frisdahl-studio-3.webp', alt: { da: 'Rød Frisdahl Studio-plakat på en betonvæg i sollys', en: 'Red Frisdahl Studio poster on a concrete wall in sunlight' } },
  { imageSrc: '/images/hero/montra-mobil.webp', alt: { da: 'Landingsside-koncept for Montra på en mobil i en hånd', en: 'Montra landing page concept on a phone held in a hand' } },
]

/** Carousel drift in px per second (right to left). */
const AUTO_SPEED = 38
/** How fast a released drag eases back into the drift (per second). */
const RETURN_RATE = 2.2
/** Speed (px/s) at which the slides reach their smallest size, and that size's shrink. */
const SHRINK_SPEED = 2600
const MAX_SHRINK = 0.1
/** How quickly the slide size follows the speed (per second). */
const SCALE_RATE = 7

/** Rendered slide width (see .slide in Hero.module.css). */
const SLIDE_SIZES = '(min-width: 1024px) 29vw, (min-width: 640px) 44vw, 72vw'

export function Hero() {
  const { locale } = useLocale()
  const content = heroContent[locale]
  const heroRef = useRef<HTMLElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const shadeRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const hero = heroRef.current
    const inner = innerRef.current
    const shade = shadeRef.current
    if (!hero || !inner || !shade) return

    const mm = gsap.matchMedia()

    // The hero darkens as the cases section rolls up over it: the shade
    // (which also covers the strip behind the header) fades to the brand dark,
    // scrubbed from the first scroll until the hero is covered (on phones,
    // until it has scrolled away). Once it's mostly dark it marks itself
    // dark, so the header switches to its light variant over it.
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        shade,
        { opacity: 0 },
        {
          opacity: SHADE_MAX,
          ease: 'none',
          scrollTrigger: {
            start: 0,
            end: () => hero.offsetHeight,
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (self.progress > 0.5) shade.dataset.headerTheme = 'dark'
              else delete shade.dataset.headerTheme
            },
          },
        },
      )
      return () => {
        delete shade.dataset.headerTheme
      }
    })

    // Desktop only, where the hero is pinned (see Hero.module.css): its content
    // drifts up a little, scrubbed over the scroll it takes the cases section
    // to cover it, so it seems to move with the section rolling over it.
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

  const carouselRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  // Carousel: drifts slowly right to left on its own and can be dragged with
  // mouse or touch. A drag keeps its speed when released and eases back into
  // the drift; the faster it moves, the smaller the slides get, so gaps open
  // up between them, and they grow back as it settles.
  useEffect(() => {
    const carousel = carouselRef.current
    const track = trackRef.current
    const group = track?.firstElementChild as HTMLElement | null
    if (!carousel || !track || !group) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const drift = reduceMotion ? 0 : -AUTO_SPEED
    let groupWidth = group.offsetWidth
    let x = 0
    let velocity = drift
    let scale = 1
    let dragging = false
    let dragVelocity = 0
    let lastX = 0
    let lastTime = 0
    let frame = 0
    let previous = performance.now()

    const resize = new ResizeObserver(() => {
      groupWidth = group.offsetWidth
    })
    resize.observe(group)

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - previous) / 1000)
      previous = now
      if (dragging) {
        // A pointer held still stops the slides; no stale speed lingers.
        dragVelocity *= Math.exp(-dt * 10)
      } else {
        velocity += (drift - velocity) * (1 - Math.exp(-dt * RETURN_RATE))
        x += velocity * dt
      }
      if (groupWidth > 0) x = (((x % groupWidth) - groupWidth) % groupWidth)

      const speed = Math.abs(dragging ? dragVelocity : velocity - drift)
      const target = reduceMotion ? 1 : 1 - Math.min(speed / SHRINK_SPEED, 1) * MAX_SHRINK
      scale += (target - scale) * (1 - Math.exp(-dt * SCALE_RATE))

      track.style.transform = `translate3d(${x}px, 0, 0)`
      track.style.setProperty('--hero-slide-scale', scale.toFixed(4))
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    const onDown = (event: PointerEvent) => {
      if (event.button !== 0) return
      dragging = true
      dragVelocity = 0
      lastX = event.clientX
      lastTime = event.timeStamp
      carousel.setPointerCapture(event.pointerId)
      carousel.classList.add(styles.dragging)
    }
    const onMove = (event: PointerEvent) => {
      if (!dragging) return
      const dx = event.clientX - lastX
      const elapsed = Math.max(1, event.timeStamp - lastTime)
      x += dx
      dragVelocity += ((dx / elapsed) * 1000 - dragVelocity) * 0.35
      lastX = event.clientX
      lastTime = event.timeStamp
    }
    const onUp = (event: PointerEvent) => {
      if (!dragging) return
      dragging = false
      velocity = dragVelocity
      if (carousel.hasPointerCapture(event.pointerId)) carousel.releasePointerCapture(event.pointerId)
      carousel.classList.remove(styles.dragging)
    }

    carousel.addEventListener('pointerdown', onDown)
    carousel.addEventListener('pointermove', onMove)
    carousel.addEventListener('pointerup', onUp)
    carousel.addEventListener('pointercancel', onUp)

    return () => {
      cancelAnimationFrame(frame)
      resize.disconnect()
      carousel.removeEventListener('pointerdown', onDown)
      carousel.removeEventListener('pointermove', onMove)
      carousel.removeEventListener('pointerup', onUp)
      carousel.removeEventListener('pointercancel', onUp)
    }
  }, [])

  return (
    <section ref={heroRef} className={styles.hero} aria-labelledby="home-hero-title">
      <div ref={shadeRef} className={styles.shade} aria-hidden="true" />
      <div ref={innerRef} className={styles.content}>
        <div className={styles.inner}>
          <h1 id="home-hero-title" className={styles.title}>
            {content.headingLead}
            <br />
            {content.headingBefore}
            <span className={styles.titleAccent}>{content.headingAccent}</span>
            {content.headingAfter}
            <span className={styles.titleDot} aria-hidden="true" />
          </h1>

          <div className={styles.aside}>
            <p className={styles.intro}>{content.intro}</p>
            <ArrowChipButton
              direction="right"
              label={content.cta}
              text={content.cta}
              href={CASES_PATH}
            />
          </div>
        </div>

        {/* Portrait slides drift from right to left and can be dragged; the
            second group is a copy so the loop is seamless (see the effect above). */}
        <div ref={carouselRef} className={styles.carousel} role="region" aria-label={content.carouselLabel}>
          <div ref={trackRef} className={styles.track}>
            {[0, 1].map((group) => (
              <div key={group} className={styles.group} aria-hidden={group === 1}>
                {heroSlides.map((slide) => (
                  <figure key={`${group}-${slide.imageSrc}`} className={styles.slide}>
                    {slide.videoSrc ? (
                      <video src={slide.videoSrc} poster={slide.imageSrc} autoPlay muted loop playsInline aria-hidden="true" />
                    ) : (
                      <img
                        {...responsiveImageProps(slide.imageSrc, SLIDE_SIZES)}
                        alt={group === 0 ? slide.alt[locale] : ''}
                        loading={group === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                        draggable={false}
                      />
                    )}
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
