import { useState } from 'react'
import type { CaseDetailTypography as CaseDetailTypographyContent } from '../../types/caseDetail'
import { Container } from '../ui'

interface CaseDetailTypographyProps {
  typography: CaseDetailTypographyContent
}

const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('')

/** Font units for the specimen SVG: the font size is 1000, so caps are capHeight * 1000 tall. */
const EM = 1000
/** View box width in font units: the widest pair (Mm, Ww) is just over 2 em. */
const SPECIMEN_WIDTH = 2.1 * EM

/**
 * Type specimen: the typeface and its category on the left, above the active
 * letter drawn large between a cap-height and a baseline rule; an a–z grid on
 * the right picks the letter (hover, focus or click).
 */
export function CaseDetailTypography({ typography }: CaseDetailTypographyProps) {
  const [active, setActive] = useState('a')
  const {
    title,
    description,
    typefaceLabel,
    typeface,
    categoryLabel,
    category,
    capHeightLabel,
    baselineLabel,
    fontFamily,
    capHeight,
  } = typography

  // An SVG puts the text's baseline exactly at y, so with the view box as tall
  // as the cap height, capitals run from the top rule to the bottom one.
  const capUnits = capHeight * EM

  return (
    <section className="case-detail-typography" aria-label={title}>
      <Container>
        <div className="case-detail-typography-grid">
          <div className="case-detail-typography-info">
            <h2 className="case-detail-overview-title">{title}</h2>
            <p className="case-detail-typography-description">{description}</p>

            <dl className="case-detail-typography-facts">
              <div>
                <dt className="case-detail-overview-label">{typefaceLabel}</dt>
                <dd className="case-detail-typography-fact-value">{typeface}</dd>
              </div>
              <div>
                <dt className="case-detail-overview-label">{categoryLabel}</dt>
                <dd className="case-detail-typography-fact-value">{category}</dd>
              </div>
            </dl>

            <div className="case-detail-typography-specimen">
              <span className="case-detail-typography-rule">
                <span className="case-detail-overview-label">{capHeightLabel}</span>
              </span>
              <svg
                className="case-detail-typography-glyph"
                viewBox={`0 0 ${SPECIMEN_WIDTH} ${capUnits}`}
                role="img"
                aria-label={`${active.toUpperCase()}${active} – ${typeface}`}
              >
                <text x={SPECIMEN_WIDTH / 2} y={capUnits} fontSize={EM} textAnchor="middle" style={{ fontFamily }}>
                  {active.toUpperCase()}
                  {active}
                </text>
              </svg>
              <span className="case-detail-typography-rule">
                <span className="case-detail-overview-label">{baselineLabel}</span>
              </span>
            </div>
          </div>

          <div className="case-detail-typography-letters" style={{ fontFamily }}>
            {LETTERS.map((letter) => (
              <button
                key={letter}
                type="button"
                className="case-detail-typography-letter"
                aria-pressed={letter === active}
                onClick={() => setActive(letter)}
                onMouseEnter={() => setActive(letter)}
                onFocus={() => setActive(letter)}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
