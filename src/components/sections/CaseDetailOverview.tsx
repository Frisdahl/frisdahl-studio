import type { CaseDetailOverview as CaseDetailOverviewContent } from '../../types/caseDetail'
import { Container, RevealText } from '../ui'

interface CaseDetailOverviewProps {
  overview: CaseDetailOverviewContent
}

/**
 * Under the hero image: two rows with the heading on the left and its content
 * on the right. The details row is left out when a case has no details yet. Only the small
 * headings animate (RevealText); the text and everything else on the case page stands still.
 */
export function CaseDetailOverview({ overview }: CaseDetailOverviewProps) {
  const { descriptionTitle, description, detailsTitle, details } = overview

  return (
    <section className="case-detail-overview" aria-label={descriptionTitle}>
      <Container>
        <div className="case-detail-overview-row">
          <RevealText as="h2" className="case-detail-overview-title">
            {descriptionTitle}
          </RevealText>
          <div className="case-detail-overview-description">
            {description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        {details.length > 0 && (
          <div className="case-detail-overview-row">
            <RevealText as="h2" className="case-detail-overview-title">
              {detailsTitle}
            </RevealText>
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
