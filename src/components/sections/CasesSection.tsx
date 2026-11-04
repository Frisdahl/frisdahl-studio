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
import { getCasesPageContent } from '../../data/cases'

gsap.registerPlugin(ScrollTrigger, SplitText)

/** Where a row's top must be on screen for it to reveal. */
const ROW_START = 'top 78%'

export function CasesSection() {
  const { locale } = useLocale()
  const { cases } = getHomeContent(locale)
  const caseDescriptions = new Map<string, string>(
    getCasesPageContent(locale).items.map((item) => [item.id, item.description]),
  )
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

    // The section arrives grey and turns light as it rolls in: --cases-light
    // (which every colour in .home-cases mixes from) runs 0 → 1 from the
    // section entering at the bottom until its top is 60% down the
    // screen, so it's light well before the first project is centred, and
    // before it reaches the header (which therefore stays in its normal mode).
    mm.add('(prefers-reduced-motion: no-preference)', (context) => {
      gsap.fromTo(
        section,
        { '--cases-light': 0 },
        {
          '--cases-light': 1,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top bottom', end: 'top 60%', scrub: true },
        },
      )

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

      // The intro slides up once the background has turned light (the colour
      // scrub above ends at 'top 60%'), the heading leading; "Seneste
      // projekter" rises the same way when it scrolls into view.
      const slideUp = (targets: Element | NodeListOf<Element>, start: string, trigger: Element) => {
        const split = splitLines(targets)
        gsap.set(split.lines, { yPercent: 100 })
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
      // image inside settles down into place from a slight zoom; the number,
      // title, keywords and description then rise line by line out of their
      // masks, and the button fades in last. Only clip-path, transform and
      // opacity animate, so nothing reflows while it runs. Once done, the
      // inline styles are cleared and .is-revealed turns on the CSS hover zoom
      // (which the inline transform would otherwise block).
      const rows = Array.from(list.querySelectorAll<HTMLElement>('.case-card')).map((row) => ({
        row,
        media: row.querySelector<HTMLElement>('.case-card-media')!,
        image: row.querySelector<HTMLElement>('.case-card-image'),
        texts: Array.from(
          row.querySelectorAll<HTMLElement>(
            '.case-card-index, .case-card-client, .case-card-keywords, .case-card-description',
          ),
        ),
        button: row.querySelector<HTMLElement>('.case-card-button'),
      }))

      // Hidden straight away (not after the fonts), so nothing flashes.
      rows.forEach(({ media, image, texts, button }) => {
        gsap.set(media, { clipPath: 'inset(0% 0% 100% 0%)' })
        if (image) gsap.set(image, { yPercent: -8, scale: 1.12, transformOrigin: '50% 0%' })
        gsap.set(texts, { autoAlpha: 0 })
        if (button) gsap.set(button, { autoAlpha: 0 })
      })

      const revealRow = ({ row, media, image, texts, button }: (typeof rows)[number]) => {
        const split = splitLines(texts)
        gsap.set(texts, { autoAlpha: 1 })
        gsap.set(split.lines, { yPercent: 100 })

        const timeline = gsap.timeline({
          scrollTrigger: { trigger: row, start: ROW_START, once: true },
          defaults: { ease: 'power3.out' },
          onComplete: () => {
            split.revert()
            gsap.set(media, { clearProps: 'clipPath' })
            if (image) gsap.set(image, { clearProps: 'transform,transformOrigin' })
            row.classList.add('is-revealed')
          },
        })
        timeline.to(media, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'power3.inOut' }, 0)
        if (image) timeline.to(image, { yPercent: 0, scale: 1, duration: 1.6 }, 0)
        timeline.to(split.lines, { yPercent: 0, duration: 1, stagger: 0.08 }, 0.35)
        if (button) timeline.to(button, { autoAlpha: 1, duration: 0.8, ease: 'power2.out' }, '>-0.45')
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
        rows.forEach(({ row }) => row.classList.remove('is-revealed'))
      }
    })

    return () => mm.revert()
  }, [locale])

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      // No bottom padding on desktop: the last image sits flush with the section's end.
      className="home-cases py-section-sm lg:pt-section lg:pb-0"
      aria-label={cases.ariaLabel}
    >
      <Container>
        <div ref={introRef} className="home-cases-intro">
          <h2 className="home-cases-intro-title">{cases.intro.title}</h2>
          <p className="home-cases-intro-text">
            {cases.intro.textBefore}
            <Link to={MEET_US_PATH} className="home-cases-intro-link">
              {cases.intro.name}
            </Link>
            {cases.intro.textAfter}
          </p>
          <p className="home-cases-intro-text">{cases.intro.textMore}</p>
        </div>
        <h2 ref={listTitleRef} className="home-cases-list-title">
          {cases.listTitle}
        </h2>
      </Container>

      <div ref={listRef} className="home-cases-list">
        {cases.items.map((item, index) => (
          <CaseCard
            key={item.id}
            caseId={item.id}
            index={index + 1}
            client={item.client}
            keywords={item.keywords}
            // The description comes from the shared case data, so it always
            // matches the case pages.
            description={caseDescriptions.get(item.id) ?? ''}
            imageSrc={item.imageSrc}
            imageAlt={item.imageAlt}
            href={item.href}
            linkLabel={cases.linkLabel}
          />
        ))}
      </div>
    </section>
  )
}
