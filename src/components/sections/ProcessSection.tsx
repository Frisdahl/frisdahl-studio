import type { ProcessContent } from '../../types/process'
import { Container } from '../ui'

interface ProcessSectionProps {
  content: ProcessContent
  showHeader?: boolean
  embedded?: boolean
  className?: string
}

function formatStepNumber(index: number) {
  return String(index + 1).padStart(2, '0')
}

export function ProcessSection({
  content,
  showHeader = true,
  embedded = false,
  className = '',
}: ProcessSectionProps) {
  const stepsMarkup = (
    <ol className={showHeader ? 'process-steps' : 'process-steps process-steps-standalone'}>
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
  )

  if (embedded) {
    return <div className={className}>{stepsMarkup}</div>
  }

  const sectionClassName = ['process-section py-section-sm lg:py-section', className]
    .filter(Boolean)
    .join(' ')

  return (
    <section
      className={sectionClassName}
      aria-labelledby={showHeader ? 'process-section-title' : undefined}
    >
      <Container>
        {showHeader ? (
          <>
            <p className="eyebrow">{content.eyebrow}</p>
            <h2 id="process-section-title" className="process-section-title mt-md">
              {content.title}
            </h2>
          </>
        ) : null}

        {stepsMarkup}
      </Container>
    </section>
  )
}
