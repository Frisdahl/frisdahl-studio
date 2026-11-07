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

type SplitLines = (targets: Element | Element[] | NodeListOf<Element>) => SplitText

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

    // The section is the light page colour throughout; it's the hero behind
    // it that darkens as the section rolls up over it (see Hero.tsx).

    // Text rises line by line, each line out of its own mask. It's split only
    // once the web fonts are in, so the lines are measured with the real font
    // (with the fallback they overflow and wrap mid-line). Each split is undone
    // afterwards so the text reflows on resize. Shared by both layouts below.
    const animateIntro = (context: gsap.Context, extra?: (splitLines: SplitLines) => void) => {
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

      document.fonts.ready.then(() => {
        if (cancelled) return
        // context.add runs this now and records its tweens in the matchMedia
        // context, so they are reverted with it although they start late.
        context.add(() => {
          slideUp(intro.querySelectorAll('.home-cases-intro-title, .home-cases-intro-text'), 'top 60%', section)
          slideUp(listTitle, 'top 85%', listTitle)
          extra?.(splitLines)
        })
      })

      return () => {
        cancelled = true
        splits.forEach((split) => split.revert())
      }
    }

    // Phones and tablets: project rows, each revealing once as it scrolls in.
    // The image frame grows taller from its top edge (a clip-path wipe
    // downwards) while the image inside settles down into place from a slight
    // zoom; the title, keywords and description then rise line by line out of
    // their masks, and the button fades in last. Only clip-path, transform and
    // opacity animate, so nothing reflows while it runs. Once done, the inline
    // styles are cleared.
    mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', (context) => {
      const rows = Array.from(list.querySelectorAll<HTMLElement>('.case-card')).map((row) => ({
        row,
        media: row.querySelector<HTMLElement>('.case-card-media')!,
        image: row.querySelector<HTMLElement>('.case-card-image'),
        texts: Array.from(
          row.querySelectorAll<HTMLElement>('.case-card-client, .case-card-keywords, .case-card-description'),
        ),
        button: row.querySelector<HTMLElement>('.case-card-button'),
      }))

      const clipHidden = 'inset(0% 0% 100% 0%)'
      const clipShown = 'inset(0% 0% 0% 0%)'

      // Hidden straight away (not after the fonts), so nothing flashes.
      rows.forEach(({ media, image, texts, button }) => {
        gsap.set(media, { clipPath: clipHidden })
        if (image) gsap.set(image, { yPercent: -8, scale: 1.12, transformOrigin: '50% 0%' })
        gsap.set(texts, { autoAlpha: 0 })
        if (button) gsap.set(button, { autoAlpha: 0 })
      })

      const revealRow = (
        splitLines: SplitLines,
        { row, media, image, texts, button }: (typeof rows)[number],
      ) => {
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
        if (button) timeline.to(button, { autoAlpha: 1, duration: 0.8, ease: 'power2.out' }, '>-0.45')
      }

      return animateIntro(context, (splitLines) => rows.forEach((row) => revealRow(splitLines, row)))
    })

    // Desktop: one project at a time. The list is pinned to the screen (the
    // images and texts of all projects sit on top of each other, the text on
    // the right, vertically centred on the image) and scrolling steps through
    // them: the next image slides down over the current one from the top, and
    // once it fills the full height the current text slides up and out while
    // the next slides up in its place. Scrolling only picks the project; the
    // animation itself is timed. Scrolling back reverses it. Reduced motion
    // keeps the plain list.
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', (context) => {
      const cards = Array.from(list.querySelectorAll<HTMLElement>('.case-card'))
      const cancelIntro = animateIntro(context)

      if (cards.length < 2) return cancelIntro

      const parts = cards.map((card) => ({
        // The link is the fixed frame (clipped); the media box inside it slides.
        media: card.querySelector<HTMLElement>('.case-card-media')!,
        image: card.querySelector<HTMLElement>('.case-card-image'),
        meta: card.querySelector<HTMLElement>('.case-card-meta')!,
        items: Array.from(card.querySelectorAll<HTMLElement>('.case-card-line > *')),
      }))

      list.classList.add('is-stage')

      // Everything but the first project starts hidden.
      // The image waits above its frame, the media box and the image inside
      // moving in opposite directions, so the picture itself stays still while
      // the frame slides down over it (transforms only, so it runs smoothly).
      parts.slice(1).forEach(({ media, image, meta, items }) => {
        gsap.set(media, { yPercent: -100 })
        if (image) gsap.set(image, { yPercent: 100 })
        gsap.set(meta, { autoAlpha: 0 })
        gsap.set(items, { yPercent: 150 })
      })

      // One timed timeline holds every switch: block i (from (i-1)*STEP to
      // i*STEP) wipes project i's image down over the previous one, and when it
      // fills the full height swaps the texts (the old one up and out, the new
      // one up in its place). Scrolling doesn't scrub it: it only decides which
      // project should be showing, and the timeline then plays there at its own
      // pace, forwards or back, so the motion is the same however the wheel
      // steps. It can be redirected mid-way.
      const WIPE = 1.1
      const TEXT_OUT = 0.45
      const TEXT_IN = 0.6
      const STEP = 2.5
      const master = gsap.timeline({ paused: true, defaults: { ease: 'none' } })

      parts.forEach((next, index) => {
        if (index === 0) return
        const current = parts[index - 1]
        const at = (index - 1) * STEP
        const textAt = at + WIPE

        master.to(next.media, { yPercent: 0, duration: WIPE, ease: 'power3.inOut' }, at)
        if (next.image) master.to(next.image, { yPercent: 0, duration: WIPE, ease: 'power3.inOut' }, at)
        master.to(current.items, { yPercent: -150, duration: TEXT_OUT, stagger: 0.05, ease: 'power2.in' }, textAt)
        master.fromTo(
          current.meta,
          { autoAlpha: 1 },
          { autoAlpha: 0, duration: 0.001, immediateRender: false },
          textAt + TEXT_OUT + 0.05 * Math.max(0, current.items.length - 1),
        )
        master.fromTo(
          next.meta,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.001, immediateRender: false },
          textAt + TEXT_OUT,
        )
        master.to(next.items, { yPercent: 0, duration: TEXT_IN, stagger: 0.07, ease: 'power3.out' }, textAt + TEXT_OUT)
      })
      // Room for the last swap to play inside its block.
      master.to({}, { duration: 0.01 }, (parts.length - 1) * STEP)

      // Scroll length: one screen-height share per project change, plus a
      // short tail, all pinned. The first change starts with the first scroll.
      const SEGMENT = 0.7
      const TAIL = 0.3
      const segmentPx = () => SEGMENT * window.innerHeight
      const lengthPx = () => (parts.length - 1) * segmentPx() + TAIL * window.innerHeight
      const indexAt = (progress: number) =>
        Math.min(parts.length - 1, Math.max(0, Math.ceil((progress * lengthPx()) / segmentPx() - 1e-6)))

      let target = 0
      const goTo = (index: number) => {
        if (index === target) return
        target = index
        master.tweenTo(index * STEP, { ease: 'none', overwrite: true })
      }

      ScrollTrigger.create({
        trigger: list,
        start: () => `top ${document.querySelector('.site-header')?.getBoundingClientRect().height ?? 76}px`,
        end: () => `+=${lengthPx()}`,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => goTo(indexAt(self.progress)),
        // Landing mid-section (a reload, a resize): show that project at once.
        onRefresh: (self) => {
          target = indexAt(self.progress)
          master.time(target * STEP)
        },
      })

      // The pinned height and the fonts change the page height below.
      document.fonts.ready.then(() => ScrollTrigger.refresh())

      return () => {
        cancelIntro()
        master.kill()
        gsap.set(
          parts.flatMap(({ media, image, meta, items }) => [media, ...(image ? [image] : []), meta, ...items]),
          { clearProps: 'all' },
        )
        list.classList.remove('is-stage')
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
      <Container>
        <div ref={introRef} className="home-cases-intro">
          <h2 className="home-cases-intro-title">{cases.intro.title}</h2>
          <div className="home-cases-intro-image-wrapper">
            <img
              src="/images/higgsfield/hero-flatlay-a--21-9.png"
              alt={
                locale === 'da'
                  ? 'Flatlay af Frisdahl Studios designarbejde'
                  : 'Flatlay of Frisdahl Studio design work'
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
          {cases.items.map((item) => (
            <CaseCard
              key={item.id}
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
      </Container>
    </section>
  )
}
