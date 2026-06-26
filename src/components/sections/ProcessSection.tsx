import type { ProcessContent } from '../../types/process'
import { Container } from '../ui'

interface ProcessSectionProps {
  content: ProcessContent
}

function formatStepNumber(index: number) {
  return String(index + 1).padStart(2, '0')
}

export function ProcessSection({ content }: ProcessSectionProps) {
  return (
    <section className="process-section py-section-sm lg:py-section" aria-labelledby="process-section-title">
      <Container>
        <p className="eyebrow">{content.eyebrow}</p>
        <h2 id="process-section-title" className="process-section-title mt-md">
          {content.title}
        </h2>

        <ol className="process-steps">
          {content.steps.map((step, index) => (
            <li key={step.title} className="process-step">
              <div className="process-step-card">
                <p className="process-step-number" aria-hidden="true">
                  {formatStepNumber(index)}
                </p>

                <div className="process-step-grid">
                  <div className="process-step-copy">
                    <div className="process-step-divider process-step-divider-light" role="separator" />
                    <h3 className="process-step-heading">{step.title}</h3>
                    <p className="process-step-description">{step.description}</p>
                  </div>

                  <div className="process-step-keywords-col">
                    <div className="process-step-divider process-step-divider-dark" role="separator" />
                    <ul className="process-step-keywords">
                      {step.keywords.map((keyword) => (
                        <li key={keyword}>
                          <span className="process-step-keyword">{keyword}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
