import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { Link } from 'react-router-dom'
import { CaseCard } from '../cards/CaseCard'
import { Container, WithHeadingDot } from '../ui'
import { MEET_US_PATH } from '../../lib/routes'
import { useLocale } from '../../context/LocaleContext'
import { getHomeContent } from '../../data/home'

gsap.registerPlugin(ScrollTrigger, SplitText)

/** How many projects the home page shows, one per row. */
const FEATURED_COUNT = 2

/** Where a row's top must be on screen for it to reveal. */
const ROW_START = 'top 78%'

export function CasesSection() {
  const { locale } = useLocale()
  const { cases } = getHomeContent(locale)
  const listTitleRef = useRef<HTMLHeadingElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const listTitle = listTitleRef.current
    const list = listRef.current
    if (!listTitle || !list) return

    const mm = gsap.matchMedia()

    // The section is the light page colour throughout.
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
          // The text stays readable to assistive tech (the default hides the lines and labels
          // the parent, which hid the title links inside the split text and put aria-label on <p>).
          aria: 'none',
        })
        // Splitting a title that is a link leaves an empty copy of the link beside the real
        // one (until the split is undone); take it out of the tab order and the accessibility tree.
        gsap.utils.toArray<Element>(targets).forEach((target) => {
          target.querySelectorAll('a:empty').forEach((link) => {
            link.setAttribute('tabindex', '-1')
            link.setAttribute('aria-hidden', 'true')
          })
        })
        splits.push(split)
        return split
      }

      // "Seneste projekter" rises line by line when it scrolls into view. The
      // intro above it (heading and text) is plain, static text.
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

      // Project rows. The image stays still in its frame; the title and keywords
      // rise line by line out of their masks once, as the row scrolls in. Only
      // transform and opacity animate, so nothing reflows.
      const rows = Array.from(list.querySelectorAll<HTMLElement>('.case-card')).map((row) => ({
        row,
        texts: Array.from(row.querySelectorAll<HTMLElement>('.case-card-client, .case-card-keywords')),
      }))

      // Hidden straight away (not after the fonts), so nothing flashes.
      rows.forEach(({ texts }) => gsap.set(texts, { autoAlpha: 0 }))

      const revealRow = ({ row, texts }: (typeof rows)[number]) => {
        const split = splitLines(texts)
        gsap.set(texts, { autoAlpha: 1 })
        gsap.set(split.lines, { yPercent: 125 })
        gsap.to(split.lines, {
          yPercent: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: row, start: ROW_START, once: true },
          onComplete: () => split.revert(),
        })
      }

      document.fonts.ready.then(() => {
        if (cancelled) return
        // context.add runs this now and records its tweens in the matchMedia
        // context, so they are reverted with it although they start late.
        context.add(() => {
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
      id="portfolio"
      className="home-cases py-section-sm lg:py-section"
      aria-label={cases.ariaLabel}
    >
      <Container columns>
        <div className="home-cases-intro">
          <h2 className="home-cases-intro-title">
            <WithHeadingDot>{cases.intro.title}</WithHeadingDot>
          </h2>
          <div className="home-cases-intro-image-wrapper">
            <img
              src="/images/gallery-board--16-9.webp"
              alt="Galleritavle med udvalgt designarbejde fra Frisdahl Studio"
              width={2000}
              height={1131}
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
          <WithHeadingDot>{cases.listTitle}</WithHeadingDot>
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
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
