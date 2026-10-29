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
import { getCaseRole } from '../../data/caseDetails'
import { getCaseYear } from '../../data/caseNavigation'
import { getCasesPageContent } from '../../data/cases'

gsap.registerPlugin(ScrollTrigger, SplitText)

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))
// Symmetric ease: smoothstep(t) + smoothstep(1 - t) === 1, so the row that
// grows always gains exactly what its neighbour loses.
const smoothstep = (t: number) => t * t * (3 - 2 * t)

// Full image height, mirroring `.case-card-media` on desktop in index.css
// (clamp(22rem, 32vw, 38rem)); the smallest size is 80% of it.
const fullHeight = () => clamp(window.innerWidth * 0.32, 352, 608)
const SMALL = 0.8
// While the rows pass through, the list lags behind the scroll (a parallax
// slow-down), so they drift past calmly and each grow/shrink hand-off takes
// more scrolling. The slow-down follows a sine: it eases in from full speed,
// peaks mid-list (the list then moves at 1 - LAG of the scroll speed) and
// eases back to full speed exactly as the last row reaches the centre, so
// there's no sudden speed change and no empty stretch below the last row.
const LAG = 0.55

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
  const spacerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const intro = introRef.current
    const listTitle = listTitleRef.current
    const list = listRef.current
    const spacer = spacerRef.current
    if (!section || !intro || !listTitle || !list || !spacer) return

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

      // The intro slides up line by line, each line rising out of its own
      // mask, once the background has turned light (the colour scrub above
      // ends at 'top 60%'). The heading leads, the text follows; "Seneste
      // projekter" rises the same way when it scrolls into view. The text is
      // split only once the web fonts are in, so the lines are measured with
      // the real font (with the fallback they overflow and wrap mid-line).
      // Each split is undone afterwards so the text reflows on resize.
      const splits: SplitText[] = []
      let cancelled = false

      const slideUp = (targets: Element | NodeListOf<Element>, start: string, trigger: Element) => {
        const split = SplitText.create(targets, {
          type: 'lines',
          mask: 'lines',
          linesClass: 'home-cases-intro-line',
        })
        splits.push(split)
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

      document.fonts.ready.then(() => {
        if (cancelled) return
        // context.add runs this now and records its tweens in the matchMedia
        // context, so they are reverted with it although they start late.
        context.add(() => {
          slideUp(intro.querySelectorAll('.home-cases-intro-title, .home-cases-intro-text'), 'top 60%', section)
          slideUp(listTitle, 'top 85%', listTitle)
        })
      })

      return () => {
        cancelled = true
        splits.forEach((split) => split.revert())
      }
    })

    // Desktop only: on phones the rows stack at full size with the text shown.
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const rows = Array.from(list.querySelectorAll<HTMLElement>('.case-card'))
      const medias = rows.map((row) => row.querySelector<HTMLElement>('.case-card-media')!)
      const metas = rows.map((row) => row.querySelector<HTMLElement>('.case-card-meta')!)

      let maxH = 0
      let minH = 0
      let listTop = 0 // page offset of the list without the lag shift
      let lagStart = 0
      let lagRange = 0
      let lag = -1
      let activeIndex = -1
      let position = 0

      const measure = () => {
        maxH = fullHeight()
        minH = maxH * SMALL
        list.style.transform = ''
        listTitle.style.transform = ''
        listTop = list.getBoundingClientRect().top + window.scrollY
        // The lag runs from the list's top entering at the bottom of the screen
        // until the last row's centre reaches the screen's centre. Over that
        // range the sine profile averages a 2·LAG/π slow-down, which sets the
        // range length. The spacer adds the total distance fallen behind, so
        // the list never overlaps what follows.
        const viewport = window.innerHeight
        const lastRowCentre = (rows.length - 1) * minH + maxH / 2
        lagStart = listTop - viewport
        lagRange = (viewport / 2 + lastRowCentre) / (1 - (2 * LAG) / Math.PI)
        spacer.style.height = `${(2 * LAG * lagRange) / Math.PI}px`
        lag = -1
      }

      // The list and its heading lag together, so the heading stays right
      // above the first project instead of scrolling away from it.
      const setLag = (offset: number) => {
        const transform = `translate3d(0, ${offset}px, 0)`
        list.style.transform = transform
        listTitle.style.transform = transform
      }

      // Integral of LAG·sin(π·u) over the scroll: 0 before, full shift after.
      const lagOffset = () => {
        const progress = clamp((window.scrollY - lagStart) / lagRange, 0, 1)
        return ((LAG * lagRange) / Math.PI) * (1 - Math.cos(Math.PI * progress))
      }

      // How far through the list the screen's centre is, in rows: at a whole
      // number k, row k is at full size and centred. Between two rows one grows
      // while the other shrinks by the same amount, so the images always touch
      // and the list's total height never changes. That keeps the mapping
      // exact: row k's centre sits at listTop + lag + k·minH + maxH/2.
      // It starts at -1, so the first row arrives small and without its text
      // and grows into place; it stops at the last row, which stays full so
      // the sections below never shift while in view.
      const targetPosition = (offset: number) => {
        const centre = window.scrollY + window.innerHeight / 2
        return clamp((centre - listTop - offset - maxH / 2) / minH, -1, rows.length - 1)
      }

      const render = () => {
        medias.forEach((media, index) => {
          const weight = smoothstep(clamp(1 - Math.abs(index - position), 0, 1))
          media.style.height = `${minH + (maxH - minH) * weight}px`
          media.style.width = `${(SMALL + (1 - SMALL) * weight) * 100}%`
        })

        // The nearest row owns the text; it fades in as that row takes over
        // (none before the first row is halfway grown).
        const nextActive = position < -0.5 ? -1 : Math.round(position)
        if (nextActive === activeIndex) return
        metas.forEach((meta, index) => {
          gsap.to(meta, {
            autoAlpha: index === nextActive ? 1 : 0,
            y: index === nextActive ? 0 : -12,
            duration: index === nextActive ? 0.7 : 0.35,
            ease: 'power3.out',
            overwrite: true,
          })
        })
        activeIndex = nextActive
      }

      // The lag shift follows the (Lenis-smoothed) scroll exactly, so the list
      // stays glued to it. The sizes then ease towards their target instead of
      // following it 1:1, so uneven wheel steps still read as one glide: each
      // frame closes 18% of the remaining distance (at 60fps, adjusted for
      // frame time), and nothing is written once settled. Runs on GSAP's
      // ticker after Lenis (see SmoothScroll), so it reads this frame's scroll.
      const tick = (_time: number, deltaMs: number) => {
        const offset = lagOffset()
        if (offset !== lag) {
          lag = offset
          setLag(offset)
        }

        const target = targetPosition(offset)
        const distance = target - position
        if (Math.abs(distance) < 0.0005) {
          if (position === target) return
          position = target
        } else {
          position += distance * (1 - Math.pow(1 - 0.18, deltaMs / (1000 / 60)))
        }
        render()
      }

      const snap = () => {
        measure()
        lag = lagOffset()
        setLag(lag)
        position = targetPosition(lag)
        render()
      }

      gsap.set(metas, { autoAlpha: 0, y: 16 })
      snap()
      gsap.ticker.add(tick)
      ScrollTrigger.addEventListener('refresh', snap)
      window.addEventListener('resize', snap)

      return () => {
        gsap.ticker.remove(tick)
        ScrollTrigger.removeEventListener('refresh', snap)
        window.removeEventListener('resize', snap)
        list.style.transform = ''
        listTitle.style.transform = ''
        spacer.style.height = ''
        medias.forEach((media) => {
          media.style.height = ''
          media.style.width = ''
        })
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

      <div ref={listRef}>
        {cases.items.map((item) => (
          <CaseCard
            key={item.id}
            client={item.client}
            keywords={item.keywords}
            // Description, role and year come from the shared case data, so
            // they always match the case pages.
            description={caseDescriptions.get(item.id) ?? ''}
            meta={[
              { label: cases.metaLabels.role, value: getCaseRole(locale, item.id) },
              { label: cases.metaLabels.technologies, value: item.technologies },
              { label: cases.metaLabels.year, value: getCaseYear(item.id) },
            ]}
            imageSrc={item.imageSrc}
            imageAlt={item.imageAlt}
            href={item.href}
            linkLabel={cases.linkLabel}
          />
        ))}
      </div>
      {/* Room for the list's parallax lag on desktop (height set in the effect). */}
      <div ref={spacerRef} aria-hidden="true" />
    </section>
  )
}
