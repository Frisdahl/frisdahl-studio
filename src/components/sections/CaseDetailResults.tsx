import type { CaseDetailResults as CaseDetailResultsContent } from "../../types/caseDetail";
import { Container, RevealText } from "../ui";
import { useMediaReveal } from "../../hooks";

interface CaseDetailResultsProps {
  results: CaseDetailResultsContent;
}

/** Measured results of the live site: heading and note left, the figures as tiles in a grey panel right. */
export function CaseDetailResults({ results }: CaseDetailResultsProps) {
  const panelRef = useMediaReveal<HTMLDivElement>(0.1);

  return (
    <section className="case-detail-results" aria-label={results.title}>
      <Container>
        <div className="case-detail-typography-grid">
          <div>
            <RevealText as="h2" className="case-detail-overview-title">
              {results.title}
            </RevealText>
            <RevealText as="p" className="case-detail-typography-description">
              {results.description}
            </RevealText>
            <RevealText as="p" className="case-detail-results-note">
              {results.note}
            </RevealText>
          </div>

          <div ref={panelRef} className="case-detail-results-panel">
            <ul className="case-detail-results-grid">
              {results.metrics.map((metric) => (
                <li key={metric.label} className="case-detail-results-metric">
                  <span className="case-detail-results-label">{metric.label}</span>
                  <span className="case-detail-results-value">{metric.value}</span>
                  <span className="case-detail-results-detail">{metric.detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
