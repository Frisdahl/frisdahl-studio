import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CaseCard } from '../cards/CaseCard'
import { useLocale } from '../../context/LocaleContext'
import { getHomeContent } from '../../data/home'

gsap.registerPlugin(ScrollTrigger)

// The image grows from 80% to its full width and height (anchored to the
// page's left edge, centred vertically) as its row reaches the middle of the
// screen, then shrinks again as the next row takes over. clip-path keeps it
// off the layout path.
const NARROW = 'inset(10% 20% 10% 0%)'
const FULL = 'inset(0% 0% 0% 0%)'

export function CasesSection() {
  const { locale } = useLocale()
  const { cases } = getHomeContent(locale)
  const listRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return

    const mm = gsap.matchMedia()

    // Desktop only: on phones the rows stack and everything stays visible.
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      list.querySelectorAll<HTMLElement>('.case-card').forEach((row) => {
        const media = row.querySelector('.case-card-media')
        const meta = row.querySelector('.case-card-meta')

        // Progress 0 → 1 runs from the row entering at the bottom to leaving at
        // the top, so 0.5 is the row's centre at the screen's centre.
        gsap
          .timeline({
            defaults: { ease: 'none' },
            scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: true },
          })
          .fromTo(media, { clipPath: NARROW }, { clipPath: FULL, duration: 0.5, ease: 'sine.out' }, 0)
          .to(media, { clipPath: NARROW, duration: 0.5, ease: 'sine.in' }, 0.5)

        // The text belongs to the row covering the screen's centre line (the
        // one at or near full width), so exactly one title shows at a time.
        gsap.fromTo(
          meta,
          { autoAlpha: 0, y: 16 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top center',
              end: 'bottom center',
              toggleActions: 'play reverse play reverse',
            },
          },
        )
      })
    })

    return () => mm.revert()
  }, [locale])

  return (
    <section
      id="portfolio"
      className="home-cases py-section-sm lg:py-section"
      aria-label={cases.ariaLabel}
      data-header-theme="dark"
    >
      <div ref={listRef}>
        {cases.items.map((item) => (
          <CaseCard
            key={item.client}
            client={item.client}
            keywords={item.keywords}
            imageSrc={item.imageSrc}
            imageAlt={item.imageAlt}
            href={item.href}
            viewCaseLabel={cases.viewCaseLabel}
          />
        ))}
      </div>
    </section>
  )
}
