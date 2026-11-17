import type { CaseDetailOverview as CaseDetailOverviewContent } from '../../types/caseDetail'
import { Container, RevealText } from '../ui'
import { STAGGER } from '../../lib/motion'

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
          <RevealText as="h2" className="case-detail-overview-title">
            {descriptionTitle}
          </RevealText>
          <div className="case-detail-overview-description">
            {description.map((paragraph) => (
              <RevealText key={paragraph} as="p">
                {paragraph}
              </RevealText>
            ))}
          </div>
        </div>

        {details.length > 0 && (
          <div className="case-detail-overview-row">
            <RevealText as="h2" className="case-detail-overview-title">
              {detailsTitle}
            </RevealText>
            <dl className="case-detail-overview-details">
              {details.map((fact, index) => (
                <div key={fact.label} className="case-detail-overview-detail">
                  {/* One after the other, a beat apart: the rows read as a list being written. */}
                  <RevealText as="dt" className="case-detail-overview-label" delay={index * STAGGER.lines}>
                    {fact.label}
                  </RevealText>
                  <RevealText as="dd" className="case-detail-overview-value" delay={index * STAGGER.lines}>
                    {fact.value}
                  </RevealText>
                </div>
              ))}
            </dl>
          </div>
        )}
      </Container>
    </section>
  )
}
