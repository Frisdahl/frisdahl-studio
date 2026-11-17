import { CaseCard } from '../cards/CaseCard'
import { getCaseMainVideo } from '../../data/caseVideos'
import { Container, SectionLabel } from '../ui'
import { useLocale } from '../../context/LocaleContext'
import { getHomeContent } from '../../data/home'

/**
 * The grid's two rows (a six-column grid with a 6px gap, every row the same height):
 *   1. Peter Salling, wide, across four columns, with OFFSCRIPT® beside it across two;
 *   2. Nordwear, wide, across four columns, with Fresh Cut beside it across two.
 * `clip` cards play their clip (the others show the still).
 */
const GRID: { id: string; span: 2 | 3 | 4 | 6; shape: 'wide' | 'stretch' | 'portrait'; clip?: boolean }[] = [
  { id: 'peter-salling', span: 4, shape: 'wide', clip: true },
  { id: 'offscript', span: 2, shape: 'stretch', clip: true },
  { id: 'nordwear', span: 4, shape: 'wide', clip: true },
  { id: 'fresh-cut', span: 2, shape: 'stretch' },
]

/**
 * "( Seneste projekter )" over the project grid: images packed with a 6px gap, the title and the
 * keywords on a soft gradient at the bottom of each picture. A click lifts the picture into the
 * project page (the shared-image transition).
 */
export function CasesSection() {
  const { locale } = useLocale()
  const { cases } = getHomeContent(locale)
  const items = GRID.map((slot) => ({ slot, item: cases.items.find((candidate) => candidate.id === slot.id) })).filter(
    (entry): entry is { slot: (typeof GRID)[number]; item: (typeof cases.items)[number] } => Boolean(entry.item),
  )

  return (
    <section id="portfolio" className="home-cases" aria-label={cases.ariaLabel}>
      <Container columns>
        <SectionLabel className="home-cases-label">{cases.listTitle}</SectionLabel>
        <div className="home-cases-list">
          {items.map(({ slot, item }) => (
            <CaseCard
              key={item.id}
              className={`case-card-span-${slot.span} case-card-${slot.shape}`}
              client={item.client}
              keywords={item.keywords}
              imageSrc={item.imageSrc}
              imageAlt={item.imageAlt}
              video={slot.clip ? getCaseMainVideo(item.id) : undefined}
              focus={'focus' in item ? item.focus : undefined}
              href={item.href}
              overlay
              revealOnScroll
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
