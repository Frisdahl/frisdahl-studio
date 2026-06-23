import { getHomeContent } from '../../data/home'
import { defaultLocale, type Locale } from '../../data/navigation'
import { Container } from '../ui'

interface PortfolioSectionProps {
  locale?: Locale
}

export function PortfolioSection({ locale = defaultLocale }: PortfolioSectionProps) {
  const { portfolio } = getHomeContent(locale)

  return (
    <section id="portfolio" className="py-section-sm lg:py-section">
      <Container>
        <div className="max-w-2xl">
          <p className="eyebrow">{portfolio.eyebrow}</p>
          <h2 className="mt-md">{portfolio.title}</h2>
          <p className="mt-md text-body-lg">{portfolio.description}</p>
        </div>

        <ul className="mt-2xl grid gap-lg sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.items.map((item, index) => (
            <li key={item.title}>
              <a
                href="#portfolio"
                className="group block overflow-hidden rounded-panel-xl border border-border-light bg-surface shadow-soft transition-all hover:-translate-y-1 hover:shadow-medium"
              >
                <div
                  className={`aspect-[4/3] ${
                    index === 0
                      ? 'bg-peach'
                      : index === 1
                        ? 'bg-peach-hover'
                        : 'bg-surface-muted'
                  }`}
                  aria-hidden="true"
                />
                <div className="p-lg">
                  <p className="text-body-sm font-medium text-muted">{item.tag}</p>
                  <p className="mt-xs font-heading text-h4 font-semibold text-primary transition-colors group-hover:text-accent">
                    {item.title}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-xl">
          <a
            href="#portfolio"
            className="text-body-sm font-semibold text-primary underline-offset-4 transition-colors hover:text-accent"
          >
            {portfolio.link} →
          </a>
        </p>
      </Container>
    </section>
  )
}
