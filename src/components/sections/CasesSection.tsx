import { CaseCard } from '../cards/CaseCard'
import { useLocale } from '../../context/LocaleContext'
import { getHomeContent } from '../../data/home'
import { Container } from '../ui'

export function CasesSection() {
  const { locale } = useLocale()
  const { cases } = getHomeContent(locale)

  return (
    <section
      id="portfolio"
      className="home-cases py-section-sm lg:py-section"
      aria-label={cases.ariaLabel}
      data-header-theme="dark"
    >
      <Container fullWidth>
        <div className="flex flex-col gap-16 lg:gap-24">
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
      </Container>
    </section>
  )
}
