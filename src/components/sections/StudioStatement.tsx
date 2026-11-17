import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useLocale } from '../../context/LocaleContext'
import { getHomeContent } from '../../data/home'
import { getSmoothScroll } from '../../lib/scroll'
import { responsiveImageProps } from '../../lib/responsiveImage'
import { MEET_US_PATH } from '../../lib/routes'
import { Container, SectionLabel } from '../ui'
import type { SectionLabelHandle } from '../ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger, SplitText)

const BACKGROUND = '/images/statement-book--4-3.webp'

/** Where the words start: the site's grey (--color-secondary). They end in --color-light. */
const WORD_GREY = '#696869'
const WORD_LIGHT = '#fffefe'

/** How far the page scrolls (in screens) while the section stays put and the words turn white. */
const PIN_SCREENS = 1.1
/** The glide that puts the section on the screen, in seconds. */
const SNAP_DURATION = 1

/** A thin plus in a corner of the picture. */
function Plus({ className }: { className: string }) {
  return (
    <svg className={`statement-plus ${className}`} viewBox="0 0 22 22" aria-hidden="true" focusable="false">
      <path d="M11 0v22M0 11h22" />
    </svg>
  )
}

/**
 * "( Frisdahl Studio )" and the studio's description over a full-screen picture under a dark
 * overlay, a plus in each corner.
 *
 * Scrolling down to it, a mouse glides the section onto the screen (a snap, through Lenis, with
 * scrolling locked for that second); the label's opening animation starts when it has landed. The
 * section then stays in place for about a screen of scroll while the big text turns from grey to
 * white, word by word in reading order: the first line left to right, then the next line, and so on.
 * The picture is taller than the section and drifts slower than the page (parallax, translateY
 * only), before and during that hold.
 *
 * Touch, and reduced motion: no snap; the label opens when the section is half in view. Reduced
 * motion also shows the text white at once, with no hold and no parallax. The section is dark, so
 * the header turns light while it is under it (data-header-theme).
 */
export function StudioStatement() {
  const { locale } = useLocale()
  const { cases } = getHomeContent(locale)
  const { intro } = cases
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const labelRef = useRef<SectionLabelHandle>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const image = imageRef.current
    const text = textRef.current
    if (!section || !image || !text) return

    const mm = gsap.matchMedia()

    // The label opens when the section is on the screen (or half in view where there is no snap).
    // Here the snap and the pin are only made for a real mouse with motion allowed.
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const split = SplitText.create(text, { type: 'words' })
      const words = split.words
      gsap.set(words, { color: WORD_GREY })

      // Before the hold: the picture rises into place as the section comes up the screen.
      gsap.fromTo(
        image,
        { yPercent: -8.33 },
        {
          yPercent: 0,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top bottom', end: 'top top', scrub: true },
        },
      )

      // The hold: the section is pinned while the words turn white and the picture drifts on.
      const hold = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.round(window.innerHeight * PIN_SCREENS)}`,
          pin: true,
          scrub: 0.4,
          invalidateOnRefresh: true,
        },
      })
      // Each word takes its turn; a short rest at the end so the last words are white before it lets go.
      const each = 0.85 / Math.max(1, words.length)
      hold.fromTo(image, { yPercent: 0 }, { yPercent: 8.33, duration: 1, immediateRender: false }, 0)
      hold.to(words, { color: WORD_LIGHT, duration: each * 3, stagger: each }, 0)
      const pin = hold.scrollTrigger!

      let snapping = false
      let labelOpened = false
      const openLabel = () => {
        if (labelOpened) return
        labelOpened = true
        labelRef.current?.play()
      }

      const fineMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches
      if (fineMouse) {
        // Going down, the moment the section's top is in the upper part of the screen it glides on.
        ScrollTrigger.create({
          trigger: section,
          start: 'top 78%',
          onEnter: () => {
            if (snapping) return
            // Lenis starts after this component, so it is looked up when the scroll happens.
            const lenis = getSmoothScroll()
            if (!lenis || lenis.scroll >= pin.start - 2) {
              openLabel()
              return
            }
            snapping = true
            lenis.scrollTo(pin.start, {
              duration: SNAP_DURATION,
              easing: (t: number) => 1 - Math.pow(1 - t, 4),
              lock: true,
              force: true,
              onComplete: () => {
                snapping = false
                openLabel()
              },
            })
          },
        })
        // Arriving from below (scrolling up) or by a link: no snap, the label just opens.
        ScrollTrigger.create({ trigger: section, start: 'top 40%', onEnter: openLabel, onEnterBack: openLabel })
      } else {
        ScrollTrigger.create({ trigger: section, start: 'top 55%', once: true, onEnter: openLabel })
      }

      return () => {
        split.revert()
        gsap.set(image, { clearProps: 'transform' })
      }
    })

    // Reduced motion: still picture, white text, and the label simply shown.
    mm.add('(prefers-reduced-motion: reduce)', () => {
      labelRef.current?.play()
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
