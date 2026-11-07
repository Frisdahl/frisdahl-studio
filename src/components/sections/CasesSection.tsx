import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { Link } from 'react-router-dom'
import { CaseCard } from '../cards/CaseCard'
import { Container } from '../ui'
import { MEET_US_PATH } from '../../lib/routes'
import { useLocale } from '../../context/LocaleContext'
import { getHomeContent } from '../../data/home'
import { getCasePreviewImages } from '../../data/caseDetails'

gsap.registerPlugin(ScrollTrigger, SplitText)

/** How many projects the home page shows, one per row. */
const FEATURED_COUNT = 2

/** Where a row's top must be on screen for it to reveal. */
const ROW_START = 'top 78%'

export function CasesSection() {
  const { locale } = useLocale()
  const { cases } = getHomeContent(locale)
  const sectionRef = useRef<HTMLElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const listTitleRef = useRef<HTMLHeadingElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const intro = introRef.current
    const listTitle = listTitleRef.current
    const list = listRef.current
    if (!section || !intro || !listTitle || !list) return

    const mm = gsap.matchMedia()

    // The section is the light page colour throughout; it's the hero behind
    // it that darkens as the section rolls up over it (see Hero.tsx).
    mm.add('(prefers-reduced-motion: no-preference)', (context) => {
      // Text rises line by line, each line out of its own mask. It's split
      // only once the web fonts are in, so the lines are measured with the
      // real font (with the fallback they overflow and wrap mid-line). Each
      // split is undone afterwards so the text reflows on resize.
      const splits: SplitText[] = []
      let cancelled = false

      const splitLines = (targets: Element | Element[] | NodeListOf<Element>) => {
        const split = SplitText.create(targets, {
          type: 'lines',
          mask: 'lines',
          linesClass: 'home-cases-intro-line',
        })
        splits.push(split)
        return split
      }

      // The intro slides up once the section's top is 60% down the screen,
      // the heading leading; "Seneste projekter" rises the same way when it
      // scrolls into view.
      const slideUp = (targets: Element | NodeListOf<Element>, start: string, trigger: Element) => {
        const split = splitLines(targets)
        gsap.set(split.lines, { yPercent: 125 })
        gsap.to(split.lines, {
          yPercent: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger, start, once: true },
          onComplete: () => split.revert(),
        })
      }

      // Project rows: each reveals once as it scrolls in. The image frame
      // grows taller from its top edge (a clip-path wipe downwards) while the
      // image inside settles down into place from a slight zoom; the title and
      // keywords then rise line by line out of their masks. Only clip-path,
      // transform and opacity animate, so nothing reflows while it runs. Once
      // done, the inline styles are cleared.
      const rows = Array.from(list.querySelectorAll<HTMLElement>('.case-card')).map((row) => ({
        row,
        media: row.querySelector<HTMLElement>('.case-card-media')!,
        image: row.querySelector<HTMLElement>('.case-card-image'),
        texts: Array.from(row.querySelectorAll<HTMLElement>('.case-card-client, .case-card-keywords')),
      }))

      const clipHidden = 'inset(0% 0% 100% 0%)'
      const clipShown = 'inset(0% 0% 0% 0%)'

      // Hidden straight away (not after the fonts), so nothing flashes.
      rows.forEach(({ media, image, texts }) => {
        gsap.set(media, { clipPath: clipHidden })
        if (image) gsap.set(image, { yPercent: -8, scale: 1.12, transformOrigin: '50% 0%' })
        gsap.set(texts, { autoAlpha: 0 })
      })

      const revealRow = ({ row, media, image, texts }: (typeof rows)[number]) => {
        const split = splitLines(texts)
        gsap.set(texts, { autoAlpha: 1 })
        gsap.set(split.lines, { yPercent: 125 })

        const timeline = gsap.timeline({
          scrollTrigger: { trigger: row, start: ROW_START, once: true },
          defaults: { ease: 'power3.out' },
          onComplete: () => {
            split.revert()
            gsap.set(media, { clearProps: 'clipPath' })
            if (image) gsap.set(image, { clearProps: 'transform,transformOrigin' })
          },
        })
        timeline.to(media, { clipPath: clipShown, duration: 1.3, ease: 'power3.inOut' }, 0)
        if (image) timeline.to(image, { yPercent: 0, scale: 1, duration: 1.6 }, 0)
        timeline.to(split.lines, { yPercent: 0, duration: 1, stagger: 0.08 }, 0.35)
      }

      document.fonts.ready.then(() => {
        if (cancelled) return
        // context.add runs this now and records its tweens in the matchMedia
        // context, so they are reverted with it although they start late.
        context.add(() => {
          slideUp(intro.querySelectorAll('.home-cases-intro-title, .home-cases-intro-text'), 'top 60%', section)
          slideUp(listTitle, 'top 85%', listTitle)
          rows.forEach(revealRow)
        })
      })

      return () => {
        cancelled = true
        splits.forEach((split) => split.revert())
      }
    })

    return () => mm.revert()
  }, [locale])

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="home-cases py-section-sm lg:py-section"
      aria-label={cases.ariaLabel}
    >
      <Container columns>
        <div ref={introRef} className="home-cases-intro">
          <h2 className="home-cases-intro-title">{cases.intro.title}</h2>
          <div className="home-cases-intro-image-wrapper">
            <img
              src="/images/gallery-board--4-3.webp"
              alt={
                locale === 'da'
                  ? 'Galleritavle med udvalgt designarbejde fra Frisdahl Studio'
                  : 'Gallery board with selected Frisdahl Studio design work'
              }
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="home-cases-intro-text-col">
            <p className="home-cases-intro-text">
              {cases.intro.textBefore}
              <Link to={MEET_US_PATH} className="home-cases-intro-link">
                {cases.intro.name}
              </Link>
              {cases.intro.textAfter}
            </p>
            <p className="home-cases-intro-text">{cases.intro.textMore}</p>
          </div>
        </div>
        <h2 ref={listTitleRef} className="home-cases-list-title">
          {cases.listTitle}
        </h2>

        {/* Inside the content container, so the images line up with the
            page's side margins like the text above. */}
        <div ref={listRef} className="home-cases-list">
          {cases.items.slice(0, FEATURED_COUNT).map((item) => (
            <CaseCard
              key={item.id}
              client={item.client}
              keywords={item.keywords}
              imageSrc={item.imageSrc}
              imageAlt={item.imageAlt}
              href={item.href}
              previewImages={getCasePreviewImages(locale, item.id)}
              linkLabel={cases.linkLabel}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
