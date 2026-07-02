import { CaseCard } from '../cards/CaseCard'
import { useLocale } from '../../context/LocaleContext'
import { getHomeContent } from '../../data/home'
import { Container, CtaPillButton } from '../ui'

const placeholderTones = [
  'bg-peach',
  'bg-peach-hover',
] as const

export function CasesSection() {
  const { locale } = useLocale()
  const { cases } = getHomeContent(locale)

  return (
    <section id="portfolio" className="py-section-sm lg:py-section" aria-label={cases.ariaLabel}>
      <Container>
        <div className="mb-xl">
          <p className="eyebrow eyebrow-theme">{cases.eyebrow}</p>
          <div className="mt-md flex flex-col gap-lg sm:flex-row sm:items-end sm:justify-between">
            <h2>
              {cases.titleLine1}
              <br />
              {cases.titleLine2}
            </h2>
            <CtaPillButton href={cases.ctaHref} className="cases-section-cta shrink-0 self-start sm:self-auto">
              {cases.ctaLabel}
            </CtaPillButton>
          </div>
        </div>

        <div className="grid gap-xl sm:grid-cols-2 lg:gap-2xl">
          {cases.items.map((item, index) => (
            <CaseCard
              key={item.client}
              client={item.client}
              type={item.type}
              imageSrc={item.imageSrc}
              imageAlt={item.imageAlt}
              href={item.href}
              viewCaseLabel={cases.viewCaseLabel}
              placeholderClassName={placeholderTones[index % placeholderTones.length]}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
