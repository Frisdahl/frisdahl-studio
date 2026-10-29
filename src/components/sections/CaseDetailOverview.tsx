import type { CaseDetailOverview as CaseDetailOverviewContent } from '../../types/caseDetail'
import { Container } from '../ui'

interface CaseDetailOverviewProps {
  overview: CaseDetailOverviewContent
}

/**
 * Under the hero image: two rows with the heading on the left and its content
 * on the right. The details row is left out when a case has no details yet.
 */
export function CaseDetailOverview({ overview }: CaseDetailOverviewProps) {
  const { descriptionTitle, description, detailsTitle, details } = overview

  return (
    <section className="case-detail-overview" aria-label={descriptionTitle}>
      <Container>
        <div className="case-detail-overview-row">
          <h2 className="case-detail-overview-title">{descriptionTitle}</h2>
          <div className="case-detail-overview-description">
            {description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        {details.length > 0 && (
          <div className="case-detail-overview-row">
            <h2 className="case-detail-overview-title">{detailsTitle}</h2>
            <dl className="case-detail-overview-details">
              {details.map((fact) => (
                <div key={fact.label} className="case-detail-overview-detail">
                  <dt className="case-detail-overview-label">{fact.label}</dt>
                  <dd className="case-detail-overview-value">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </Container>
    </section>
  )
}
