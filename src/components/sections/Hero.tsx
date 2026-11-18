import { useLayoutEffect, useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLocale } from '../../context/LocaleContext'
import { markHeroIntroPlayed, shouldPlayHeroIntro } from '../../lib/heroIntro'
import { whenPageRevealed } from '../../lib/pageReveal'
import { lockScroll, unlockScroll } from '../../lib/scroll'
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
  /** Where the 4:3 picture sits in the narrower frame (object-position). */
  position: string
}

/** The centre picture switches between branding and mockups, starting with the red billboard. */
const heroSlides: HeroSlide[] = [
  { imageSrc: '/images/hero/hero-1-branding-billboard.webp', position: '70% 50%', alt: { da: 'Rødt Frisdahl Studio-plakatdesign i en sort ramme på en betonvæg' } },
  { imageSrc: '/images/hero/hero-2-mockup-offscript-kontakt.webp', position: '50% 50%', alt: { da: 'Kontaktsiden for OFFSCRIPT® på en iPhone på en hvid, foldet flade med et limegrønt bånd' } },
  { imageSrc: '/images/hero/hero-3-branding-visitkort.webp', position: '52% 50%', alt: { da: 'Frisdahl Studio-visitkort svævende i en kromramme' } },
  { imageSrc: '/images/hero/hero-4-mockup-offscript-genrer.webp', position: '52% 50%', alt: { da: 'Genre-siden for OFFSCRIPT® på en iPhone på en hvid sokkel' } },
]

/** Seconds a picture stays before the next one rises in, and how long that takes. */
const HOLD = 1.5
const WIPE = 0.8

/** Rendered width of the centre picture (25vw on desktop, 46vw below 1024px). */
const MEDIA_SIZES = '(min-width: 1024px) 25vw, 46vw'

/**
 * The home hero. "Beyond" stands top left and "Digital" bottom right, big, with a picture between
 * them that the lower half of the first word and the upper half of the second lie over. The words
 * are white with mix-blend-mode: difference, so they invert against whatever is behind them: dark
 * on the white page, light on the dark parts of a mockup, tinted over a colour. A line in
 * brackets sits under the first word.
 *
 * Motion, first load of a visit to the home page (the intro): "( )" in the middle of the screen parts to
 * the sides, and once they have finished "Beyond Digital" rises between them, both words together, the
 * brackets fade and the words scale out to their
 * places, the picture falls in from the top, then the line's brackets part, its text rises and the
 * header fades in. Scrolling is locked meanwhile. Otherwise the words just rise out of their masks.
 * The picture changes with a wipe from the top, one mockup after the other (paused while the hero is
 * off screen). Reduced motion: everything is shown at once and the first picture stays.
 */
export function Hero() {
  const { locale } = useLocale()
  const content = heroContent[locale]
  const sectionRef = useRef<HTMLElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const wordsRef = useRef<HTMLHeadingElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const bracketsRef = useRef<HTMLDivElement>(null)
  // Resolves when the first-load intro has finished (right away when there is none).
  const introDone = useRef<Promise<void>>(Promise.resolve())
  // Resolves when the page is uncovered (right away unless a transition is running).
  const revealed = useMemo(() => whenPageRevealed(), [])

  // Entrance. On the first load of a visit to the home page: the intro (below). Otherwise: the words
  // rise out of their masks and the bracketed line fades in.
  useLayoutEffect(() => {
    const words = wordsRef.current ? Array.from(wordsRef.current.querySelectorAll<HTMLElement>('[data-word]')) : []
    const line = sectionRef.current?.querySelector<HTMLElement>('[data-hero-line]') ?? null
    if (words.length === 0) return
    const play = shouldPlayHeroIntro()
    let finish: () => void = () => {}
    // The picture slider waits for the entrance, the intro or the short one (so it does not change pictures meanwhile).
    introDone.current = new Promise<void>((resolve) => (finish = resolve))

    const mm = gsap.matchMedia()
    let cancelled = false
    mm.add('(prefers-reduced-motion: no-preference)', (context) => {
      const stage = stageRef.current
      const media = mediaRef.current
      const brackets = bracketsRef.current ? Array.from(bracketsRef.current.querySelectorAll<SVGElement>('svg')) : []
      const masks = words.map((word) => word.parentElement as HTMLElement)
      const header = document.querySelector<HTMLElement>('.site-header')
      const lineBrackets = line ? Array.from(line.querySelectorAll<SVGElement>('.bracket-line-bracket')) : []
      const lineText = line?.querySelector<HTMLElement>('.bracket-line-text') ?? null
      const lineBox = line?.querySelector<HTMLElement>('.bracket-line') ?? null

      // The line under "Beyond": its ( ) together in the middle of the line, its text under its mask.
      const poseLine = () => {
        if (!lineBox || !lineText || lineBrackets.length < 2) return
        gsap.set([...lineBrackets, lineText], { clearProps: 'all' })
        const box = lineBox.getBoundingClientRect()
        const lb = lineBrackets.map((bracket) => bracket.getBoundingClientRect())
        const boxCenter = box.left + box.width / 2
        const lineTogether = lb[0].width * 0.6
        gsap.set(lineBrackets[0], { x: boxCenter - lineTogether - (lb[0].left + lb[0].width / 2) })
        gsap.set(lineBrackets[1], { x: boxCenter + lineTogether - (lb[1].left + lb[1].width / 2) })
        gsap.set(lineText, { yPercent: 115 })
      }

      if (!play || !stage || !media || brackets.length < 2 || lineBrackets.length < 2 || !lineText || !lineBox || !line) {
        // The short entrance (arriving from another page, or coming back to the home page): the words rise,
        // then the picture falls in from the top, then the line's ( ) part and its text rises, last.
        const shortPose = () => {
          gsap.set(words, { yPercent: 110 })
          if (media) gsap.set(media, { clipPath: 'inset(0% 0% 100% 0%)' })
          if (line) {
            gsap.set(line, { autoAlpha: 0 })
            if (lineBrackets.length === 2 && lineText && lineBox) poseLine()
          }
        }
        shortPose()
        void revealed.then(() => document.fonts.ready).then(() => {
          if (cancelled) return
          shortPose() // measured again: the font changes the width of the line
          context.add?.(() => {
            // About 20% quicker than the first version (3.4 s -> 2.8 s): every part is shorter, same order and hand-offs.
            const PICTURE_AT = 0.65 // the words have all but settled (they ease out)
            const PICTURE_DURATION = 0.9
            const LINE_AT = PICTURE_AT + PICTURE_DURATION * 0.85
            const LINE_PART = 0.72
            const tl = gsap.timeline({
              onComplete: () => {
                if (media) gsap.set(media, { clearProps: 'clipPath' })
                if (lineText) gsap.set([...lineBrackets, lineText], { clearProps: 'all' })
                finish()
              },
            })
            tl.to(words, { yPercent: 0, duration: 1, ease: 'expo.out', stagger: 0.1 }, 0.08)
            if (media) tl.to(media, { clipPath: 'inset(0% 0% 0% 0%)', duration: PICTURE_DURATION, ease: 'expo.inOut' }, PICTURE_AT)
            if (line) {
              tl.to(line, { autoAlpha: 1, duration: 0.01 }, LINE_AT)
              if (lineBrackets.length === 2 && lineText) {
                tl.to(lineBrackets, { x: 0, duration: LINE_PART, ease: 'expo.inOut' }, LINE_AT)
                  .to(lineText, { yPercent: 0, duration: 0.65, ease: 'expo.out' }, LINE_AT + LINE_PART)
              }
            }
          })
        })
        return
      }

      // ---- The intro. Measure everything with nothing moved, then put it all in its first pose.
      // Measured twice: at once (so nothing shows before the intro) and again when the web fonts are in and the
      // animation is about to start. The font changes the width of the words (and with it where the line's text
      // and the brackets must stand), so a pose measured before it arrived put the brackets unevenly.
      let leftX = 0
      let rightX = 0
      const pose = () => {
        gsap.set([...masks, ...words, media, line, ...lineBrackets, lineText, ...brackets], { clearProps: 'all' })
        const fontSize = parseFloat(getComputedStyle(words[0]).fontSize)
        const small = Math.min(44, Math.max(26, window.innerWidth * 0.03))
        const scale = small / fontSize
        const stageRect = stage.getBoundingClientRect()
        const cx = stageRect.left + stageRect.width / 2
        const cy = stageRect.top + stageRect.height / 2
        const rects = masks.map((mask) => mask.getBoundingClientRect())
        const gap = small * 0.3
        const lineWidth = (rects[0].width + rects[1].width) * scale + gap
        const textHeight = (rects[0].height - fontSize * 0.18) * scale
        const left = [cx - lineWidth / 2, cx - lineWidth / 2 + rects[0].width * scale + gap]

        // "Beyond Digital" as one small line in the middle of the screen (top left corner as the origin).
        masks.forEach((mask, i) => {
          gsap.set(mask, { transformOrigin: '0 0', x: left[i] - rects[i].left, y: cy - textHeight / 2 - rects[i].top, scale })
        })
        gsap.set(words, { yPercent: 110 })

        // The two brackets: together in the middle, as tall as that line.
        const bracketHeight = small * 1.5
        const bracketWidth = bracketHeight / 3
        brackets.forEach((bracket) => {
          gsap.set(bracket, { width: bracketWidth, height: bracketHeight, xPercent: -50, yPercent: -50, visibility: 'visible', opacity: 0 })
        })
        const together = bracketWidth * 0.7
        // The brackets stand exactly as far from the text as the line under "Beyond" does (and every ( LABEL )):
        // measured from that line's visible bracket to its text, and from the real edges of the words (the boxes
        // around them are wider than the letters), so both sides match and it follows the page's own gap.
        const glyphs = (el: Element) => {
          const range = document.createRange()
          range.selectNodeContents(el)
          return range.getBoundingClientRect()
        }
        const lineBracketPath = lineBrackets[0].querySelector('path')
        const pageGap = lineBracketPath ? glyphs(lineText).left - lineBracketPath.getBoundingClientRect().right : 28
        const firstWord = glyphs(words[0])
        const lastWord = glyphs(words[words.length - 1])
        // A bracket's curve stands a sixth of its width in from the edge that faces the text, and the box is
        // centred on x = 0, so its visible edge is a third of its width from its centre.
        leftX = firstWord.left - pageGap - bracketWidth / 3 - cx
        rightX = lastWord.right + pageGap + bracketWidth / 3 - cx
        gsap.set(brackets[0], { x: -together })
        gsap.set(brackets[1], { x: together })

        poseLine()
        gsap.set(line, { autoAlpha: 0 })

        // The picture waits above its place; the header waits invisible.
        gsap.set(media, { clipPath: 'inset(0% 0% 100% 0%)' })
        if (header) gsap.set(header, { opacity: 0, transition: 'none' })
      }
      pose()
      lockScroll()

      const tidy = () => {
        gsap.set([...masks, ...words, media, line, lineText, ...lineBrackets], { clearProps: 'all' })
        gsap.set(brackets, { visibility: 'hidden' })
        if (header) gsap.set(header, { clearProps: 'opacity,transition' })
        unlockScroll()
      }

      void revealed.then(() => document.fonts.ready).then(() => {
        if (cancelled) return
        pose()
        context.add?.(() => {
          const tl = gsap.timeline({
            onComplete: () => {
              tidy()
              markHeroIntroPlayed()
              finish()
            },
          })
          // The brackets part first; only when they have finished does "Beyond Digital" rise, both
          // words together (no stagger). Everything after follows the words, with the same gaps as before.
          const PART_AT = 0.5
          const PART_DURATION = 1.2
          const WORDS_AT = PART_AT + PART_DURATION
          const WORDS_DURATION = 1
          const AFTER_WORDS = WORDS_AT + WORDS_DURATION
          const LINE_AT = AFTER_WORDS + 1.4
          const LINE_PART_DURATION = 0.8
          tl.to(brackets, { opacity: 1, duration: 0.35, ease: 'power1.out' }, 0.1)
            // ( ) part to the sides ...
            .to(brackets[0], { x: leftX, duration: PART_DURATION, ease: 'expo.inOut' }, PART_AT)
            .to(brackets[1], { x: rightX, duration: PART_DURATION, ease: 'expo.inOut' }, PART_AT)
            // ... then "Beyond Digital" rises between them, both words at the same time ...
            .to(words, { yPercent: 0, duration: WORDS_DURATION, ease: 'expo.out' }, WORDS_AT)
            // ... the brackets fade and the words scale out to their places ...
            .to(brackets, { opacity: 0, duration: 0.5, ease: 'power2.inOut' }, AFTER_WORDS)
            .to(masks, { x: 0, y: 0, scale: 1, duration: 1.4, ease: 'expo.inOut' }, AFTER_WORDS)
            // ... the picture falls from the top ...
            .to(media, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.inOut' }, AFTER_WORDS + 0.8)
            // ... the line's brackets part and, once they have finished, its text rises; the header fades in.
            .set(line, { autoAlpha: 1 }, LINE_AT)
            .to(lineBrackets, { x: 0, duration: LINE_PART_DURATION, ease: 'expo.inOut' }, LINE_AT)
            .to(lineText, { yPercent: 0, duration: 0.9, ease: 'expo.out' }, LINE_AT + LINE_PART_DURATION)
            .to(header, { opacity: 1, duration: 0.9, ease: 'power2.out' }, LINE_AT)
        })
      })

      return () => {
        tidy()
        finish()
      }
    })
    return () => {
      cancelled = true
      mm.revert()
      finish() // never leave the slider waiting (reduced motion has no entrance to wait for)
    }
  }, [revealed])

  // The centre picture: the next scene rises from the bottom behind a clip while the one it covers
  // drifts up a little. The pictures are never scaled (that blurred them until the animation ended).
  // It waits for the intro (if there is one) and only runs while the hero is on screen.
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
        tl.set(next, { zIndex: 2, clipPath: 'inset(100% 0% 0% 0%)', yPercent: 0 }, `+=${HOLD}`)
          .to(next, { clipPath: 'inset(0% 0% 0% 0%)', duration: WIPE, ease: 'power4.inOut' })
          .to(slide, { yPercent: -16, duration: WIPE, ease: 'power4.inOut' }, '<')
        tl.set(slide, { zIndex: 0, yPercent: 0 })
          .set(next, { zIndex: 1 })
      })
      let ready = false
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => (self.isActive && ready ? tl.play() : tl.pause()),
      })
      void introDone.current.then(() => {
        ready = true
        if (trigger.isActive) tl.play()
      })
      return () => {
        trigger.kill()
        tl.kill()
        gsap.set(slides, { clearProps: 'clipPath,zIndex,yPercent' })
      }
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={sectionRef} className={styles.hero} aria-labelledby="home-hero-title" data-page-entrance="own">
      <div ref={stageRef} className={styles.stage}>
        {/* The two brackets of the first-load intro (sized and moved by the script). */}
        <div ref={bracketsRef} aria-hidden="true">
          <svg className={styles.preBracket} viewBox="0 0 6 18" focusable="false">
            <path d="M5 1 C 1 4, 1 14, 5 17" />
          </svg>
          <svg className={styles.preBracket} viewBox="0 0 6 18" focusable="false">
            <path d="M1 1 C 5 4, 5 14, 1 17" />
          </svg>
        </div>
        <div className={styles.block}>
          <div ref={mediaRef} className={styles.media}>
            {heroSlides.map((slide) => (
              <div key={slide.imageSrc} data-slide className={styles.slide}>
                <img
                  className={styles.slideImage}
                  {...responsiveImageProps(slide.imageSrc, MEDIA_SIZES)}
                  alt={slide.alt[locale]}
                  decoding="async"
                  fetchPriority={slide.imageSrc === heroSlides[0].imageSrc ? 'high' : 'low'}
                  style={{ objectPosition: slide.position }}
                  draggable={false}
                />
              </div>
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
