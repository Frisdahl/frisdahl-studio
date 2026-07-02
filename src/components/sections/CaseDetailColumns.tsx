import type { CaseDetailColumn } from '../../types/caseDetail'
import { Container } from '../ui'

interface CaseDetailColumnsProps {
  columns: CaseDetailColumn[]
}

export function CaseDetailColumns({ columns }: CaseDetailColumnsProps) {
  return (
    <section className="case-detail-columns-section mt-4xl lg:mt-5xl" aria-label="Case details">
      <Container>
        <div className="case-detail-columns">
          {columns.map((column) => (
            <article key={column.title} className="case-detail-column">
              <div className="case-detail-column-divider" role="separator" aria-hidden="true">
                <span className="case-detail-column-divider-dark" />
                <span className="case-detail-column-divider-track" />
              </div>

              <h2 className="case-detail-column-title">{column.title}</h2>
              <div className="case-detail-column-body">
                {column.paragraphs.map((paragraph, index) => (
                  <p key={`${column.title}-${index}`} className="case-detail-column-text">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
