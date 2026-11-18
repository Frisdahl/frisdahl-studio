import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { gsap } from 'gsap'
import { ProjectCard } from '../cards/ProjectCard'
import { getCaseMainAspect } from '../../data/caseVideos'
import '../../cases-page.css'
import { useLocale } from '../../context/LocaleContext'
import { getCasesPageContent } from '../../data/cases'
import { Container } from '../ui'

interface FilterGroupProps {
  title: string
  allLabel: string
  options: { id: string; label: string }[]
  active: string | null
  onChange: (id: string | null) => void
}

/** A small heading over a row of square buttons; "Alle" clears the filter. */
function FilterGroup({ title, allLabel, options, active, onChange }: FilterGroupProps) {
  const all = [{ id: null, label: allLabel }, ...options]

  return (
    <div className="cases-page-filter-col" role="group" aria-label={title}>
      <h2 className="cases-page-filter-title">{title}</h2>
      <div className="cases-page-filter-options">
        {all.map((option) => {
          const isActive = active === option.id

          return (
            <button
              key={option.id ?? 'all'}
              type="button"
              className={`cases-filter-chip${isActive ? ' cases-filter-chip-active' : ''}`}
              aria-pressed={isActive}
              onClick={() => onChange(option.id)}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/** The clip that leaves nothing visible: every side pulled in to the centre. */
const CLIP_HIDDEN = 'inset(50% 50% 50% 50%)'
const CLIP_SHOWN = 'inset(0% 0% 0% 0%)'

/**
 * Pairs the cards so that every row fills the width: a wide card (16:9) beside a narrow one (4:3), the way the
 * home grid does. Each card takes the first card of the other shape that is left as its row mate; with no mate it
 * stands alone. The rows alternate, so the first has the wide card first and the second the narrow one first,
 * and so on. The order of the list otherwise stays.
 */
function arrangeInRows<T extends { id: string }>(items: readonly T[]): T[] {
  const isWide = (item: T) => getCaseMainAspect(item.id) > 1.5
  const left = [...items]
  const rows: T[][] = []
  while (left.length) {
    const first = left.shift() as T
    const mate = left.findIndex((item) => isWide(item) !== isWide(first))
    const row = mate >= 0 ? [first, ...left.splice(mate, 1)] : [first]
    // Even rows (the 1st, 3rd, ...) start with the wide card, odd rows with the narrow one.
    const wideFirst = rows.length % 2 === 0
    if (row.length === 2 && isWide(row[0]) !== wideFirst) row.reverse()
    rows.push(row)
  }
  return rows.flat()
}

/**
 * How wide a card draws its picture, so the browser fetches the smallest file that is still sharp on a retina
 * screen instead of the full-width one: a wide card (16:9) and a narrow one (4:3) take 57% and 43% of the
 * content width from tablet up (see cases-page.css), the whole width on a phone.
 */
const CARD_SIZES = {
  wide: '(min-width: 48rem) min(1040px, 57vw), 100vw',
  narrow: '(min-width: 48rem) min(780px, 43vw), 100vw',
} as const

interface Selection {
  service: string | null
  industry: string | null
}

export function CasesPageSection() {
  const { locale } = useLocale()
  const { title, description, filters, items } = getCasesPageContent(locale)
  const titleLines = title.split('\n')
  // `selection` is what the buttons show right away; `shown` is what the
  // grid lists. They differ while the old projects are leaving.
  const [selection, setSelection] = useState<Selection>({ service: null, industry: null })
  const [shown, setShown] = useState<Selection>(selection)
  const gridRef = useRef<HTMLUListElement>(null)
  const swapTimeline = useRef<gsap.core.Timeline | null>(null)
  // The values the effects last acted on, so mounting (and dev double-runs) do nothing.
  const lastSelection = useRef(selection)
  const lastShown = useRef(shown)
  // The ids that were on screen before the list last changed.
  // Where each project was (relative to the grid) just before the list changed,
  // so the ones that stay can slide to their new place instead of jumping.
  const previousPositions = useRef(new Map<string, { x: number; y: number }>())
  const previousIds = useRef(new Set(items.map((item) => item.id)))

  // A cheap filter over a handful of cases; no memoization needed. Both
  // filters apply together.
  const filterItems = (current: Selection) => {
    const activeService = filters.services.find((option) => option.id === current.service)
    const activeIndustry = filters.industries.find((option) => option.id === current.industry)

    return items.filter(
      (item) =>
        (!activeService || item.keywords.some((keyword) => activeService.keywords.includes(keyword))) &&
        (!activeIndustry || item.industry === activeIndustry.industry),
    )
  }
  const filteredItems = arrangeInRows(filterItems(shown))
  // The effects below read the latest filter without re-running when it is rebuilt.
  const filterRef = useRef(filterItems)
  useEffect(() => {
    filterRef.current = filterItems
  })

  // A filter change: the projects that go away close in from their corners to
  // their centre (a clip that shrinks on all sides, so they look removed), then
  // the list swaps, and the projects that are new open out again from the
  // centre to the corners. A project that matches both before and after stays
  // as it is.
  useEffect(() => {
    if (lastSelection.current === selection) return
    lastSelection.current = selection
    swapTimeline.current?.kill()

    const grid = gridRef.current
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!grid || reduceMotion) {
      setShown(selection)
      return
    }

    const nextIds = new Set(filterRef.current(selection).map((item) => item.id))
    const cards = Array.from(grid.children) as HTMLElement[]
    const leaving = cards.filter((card) => !nextIds.has(card.dataset.caseId ?? ''))
    // One that was closing but now stays (a quick second click) opens fully again.
    const staying = cards.filter((card) => nextIds.has(card.dataset.caseId ?? ''))
    if (staying.length) gsap.set(staying, { clearProps: 'clipPath' })

    // Called right before the list swaps, once the leaving projects are gone.
    const swap = () => {
      const origin = grid.getBoundingClientRect()
      previousPositions.current = new Map(
        cards.map((card) => {
          const box = card.getBoundingClientRect()
          return [card.dataset.caseId ?? '', { x: box.left - origin.left, y: box.top - origin.top }]
        }),
      )
      setShown(selection)
    }

    if (leaving.length === 0) {
      swap()
      return
    }

    swapTimeline.current = gsap
      .timeline()
      .to(leaving, {
        clipPath: CLIP_HIDDEN,
        duration: 0.5,
        ease: 'power3.in',
        stagger: 0.06,
        overwrite: true,
      })
      .add(swap)
  }, [selection])

  useLayoutEffect(() => {
    if (lastShown.current === shown) return
    lastShown.current = shown
    const grid = gridRef.current
    if (!grid || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Runs before the browser paints, so the new projects never flash in.
    const entering = (Array.from(grid.children) as HTMLElement[]).filter(
      (card) => !previousIds.current.has(card.dataset.caseId ?? ''),
    )
    // The projects that stay slide from where they were to where they are now
    // (for example the second one moving into the first place).
    const origin = grid.getBoundingClientRect()
    ;(Array.from(grid.children) as HTMLElement[]).forEach((card) => {
      const before = previousPositions.current.get(card.dataset.caseId ?? '')
      if (!before || entering.includes(card)) return
      const box = card.getBoundingClientRect()
      const dx = before.x - (box.left - origin.left)
      const dy = before.y - (box.top - origin.top)
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return
      gsap.fromTo(
        card,
        { x: dx, y: dy },
        { x: 0, y: 0, duration: 0.7, ease: 'power3.inOut', overwrite: true, clearProps: 'transform' },
      )
    })
    previousIds.current = new Set(
      (Array.from(grid.children) as HTMLElement[]).map((card) => card.dataset.caseId ?? ''),
    )
    // Nothing opens when the new list only has projects that were already there (GSAP warns on no targets).
    const tween = entering.length
      ? gsap.fromTo(
          entering,
          { clipPath: CLIP_HIDDEN },
          {
            clipPath: CLIP_SHOWN,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.06,
            overwrite: true,
            clearProps: 'clipPath',
          },
        )
      : null
    return () => {
      tween?.kill()
    }
  }, [shown])

  useEffect(
    () => () => {
      swapTimeline.current?.kill()
    },
    [],
  )

  return (
    <section className="cases-page relative isolate py-section-sm lg:py-section" aria-label={titleLines.join(' ')}>
      <Container className="relative z-[1]">
        <div className="cases-page-intro">
          <h1 className="cases-page-title">
            {titleLines.map((line, index) => (
              <span key={line}>
                {line}
                {index < titleLines.length - 1 ? <br /> : null}
              </span>
            ))}
          </h1>
          <p className="cases-page-description">{description}</p>
        </div>

        <div className="cases-page-divider" role="separator" aria-hidden="true" />

        <div className="cases-page-filter-grid">
          <div className="cases-page-filter-col">
            <h2 className="cases-page-filter-title">{filters.allCases}</h2>
          </div>
          <FilterGroup
            title={filters.byService}
            allLabel={filters.all}
            options={filters.services}
            active={selection.service}
            onChange={(service) => setSelection((current) => ({ ...current, service }))}
          />
          <FilterGroup
            title={filters.byIndustry}
            allLabel={filters.all}
            options={filters.industries}
            active={selection.industry}
            onChange={(industry) => setSelection((current) => ({ ...current, industry }))}
          />
        </div>

        {filteredItems.length > 0 ? (
          <ul ref={gridRef} className="cases-page-grid" aria-label={titleLines.join(' ')}>
            {filteredItems.map((item, index) => (
              <li key={item.id} data-case-id={item.id} style={{ '--case-aspect': getCaseMainAspect(item.id) } as CSSProperties}>
                <ProjectCard
                  id={item.id}
                  client={item.client}
                  keywords={item.keywords}
                  imageSrc={item.imageSrc}
                  imageAlt={item.imageAlt}
                  href={item.href}
                  imageSizes={getCaseMainAspect(item.id) > 1.5 ? CARD_SIZES.wide : CARD_SIZES.narrow}
                  priority={index < 2}
                />
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </section>
  )
}
