import type { CaseDetailPalette as CaseDetailPaletteContent } from '../../types/caseDetail'
import { Container } from '../ui'

interface CaseDetailPaletteProps {
  palette: CaseDetailPaletteContent
}

/** The case's colours: heading left, a grid of swatches right, each labelled top left. */
export function CaseDetailPalette({ palette }: CaseDetailPaletteProps) {
  return (
    <section className="case-detail-palette" aria-label={palette.title}>
      <Container>
        <div className="case-detail-typography-grid">
          <div>
            <h2 className="case-detail-overview-title">{palette.title}</h2>
            {palette.description ? (
              <p className="case-detail-typography-description">{palette.description}</p>
            ) : null}
          </div>

          <ul className="case-detail-palette-swatches">
            {palette.swatches.map((swatch) => (
              <li
                key={swatch.hex}
                className={`case-detail-palette-swatch${swatch.dark ? ' is-dark' : ''}`}
                style={{ backgroundColor: swatch.hex }}
              >
                <span className="case-detail-palette-name">{swatch.name}</span>
                <span className="case-detail-palette-hex">{swatch.hex}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
