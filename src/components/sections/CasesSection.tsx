import { CaseCard } from '../cards/CaseCard'
import { getCaseMainVideo } from '../../data/caseVideos'
import { Container, SectionLabel } from '../ui'
import { useLocale } from '../../context/LocaleContext'
import { getHomeContent } from '../../data/home'
import { ProjectCursor } from './ProjectCursor'

/**
 * The grid's rows, in order: two projects of the same size, one across the whole width, then two
 * of the same size again. `wide` cards are 16:9, the others portrait (4:5). `clip` cards play their
 * clip (the others show the still).
 */
const GRID: { id: string; wide?: boolean; clip?: boolean }[] = [
  { id: 'nordwear' },
  { id: 'offscript', clip: true },
  { id: 'peter-salling', wide: true, clip: true },
  { id: 'fresh-cut' },
  { id: 'det-kollektive-klaedeskab' },
]

/**
 * "( Seneste projekter )" over the project grid: images packed with a 6px gap, the title and the
 * keywords on a soft gradient at the bottom of each picture. Over a picture the pointer turns
 * into a round "SE PROJEKT" label (ProjectCursor). A click still lifts the picture into the
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
              className={slot.wide ? 'case-card-wide' : undefined}
              client={item.client}
              keywords={item.keywords}
              imageSrc={!slot.wide && 'portraitSrc' in item ? item.portraitSrc : item.imageSrc}
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
      <ProjectCursor />
    </section>
  )
}
