import { getHomeContent } from '../../data/home'
import { defaultLocale, type Locale } from '../../data/navigation'
import { Container } from '../ui'

interface ServicesSectionProps {
  locale?: Locale
}

export function ServicesSection({ locale = defaultLocale }: ServicesSectionProps) {
  const { services } = getHomeContent(locale)

  return (
    <section id="services" className="py-section-sm lg:py-section">
      <Container>
        <div className="section-panel">
          <div className="max-w-2xl">
            <p className="eyebrow">{services.eyebrow}</p>
            <h2 className="mt-md">{services.title}</h2>
            <p className="mt-md text-body-lg">{services.description}</p>
          </div>

          <ul className="mt-2xl grid gap-xl sm:grid-cols-2">
            {services.items.map((item) => (
              <li key={item.title} className="border-t border-border-light pt-xl">
                <h3 className="text-h4">{item.title}</h3>
                <p className="mt-sm">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
