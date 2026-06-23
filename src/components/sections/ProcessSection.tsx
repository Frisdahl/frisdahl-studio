import { getHomeContent } from '../../data/home'
import { defaultLocale, type Locale } from '../../data/navigation'
import { Container } from '../ui'

interface ProcessSectionProps {
  locale?: Locale
}

export function ProcessSection({ locale = defaultLocale }: ProcessSectionProps) {
  const { process } = getHomeContent(locale)

  return (
    <section id="process" className="py-section-sm lg:py-section">
      <Container>
        <div className="section-panel-muted">
          <div className="max-w-2xl">
            <p className="eyebrow">{process.eyebrow}</p>
            <h2 className="mt-md">{process.title}</h2>
            <p className="mt-md text-body-lg">{process.description}</p>
          </div>

          <ol className="mt-2xl grid gap-xl lg:grid-cols-3">
            {process.steps.map((step) => (
              <li key={step.number} className="border-t border-border pt-xl">
                <span className="font-heading text-body-sm font-bold text-accent">
                  {step.number}
                </span>
                <h3 className="mt-md text-h4">{step.title}</h3>
                <p className="mt-sm">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}
