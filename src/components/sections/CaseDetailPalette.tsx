import type { CaseDetailPalette as CaseDetailPaletteContent } from "../../types/caseDetail";
import { Container, RevealText } from "../ui";
import { useMediaReveal } from "../../hooks";

interface CaseDetailPaletteProps {
  palette: CaseDetailPaletteContent;
}

/** The case's colours: heading left, a grid of swatches right, each labelled top left. */
export function CaseDetailPalette({ palette }: CaseDetailPaletteProps) {
  const panelRef = useMediaReveal<HTMLDivElement>(0.1);
  return (
    <section className="case-detail-palette" aria-label={palette.title}>
      <Container>
        <div className="case-detail-typography-grid">
          <div>
            <RevealText as="h2" className="case-detail-overview-title">
              {palette.title}
            </RevealText>
            {palette.description ? (
              <RevealText as="p" className="case-detail-typography-description">
                {palette.description}
              </RevealText>
            ) : null}
          </div>

          <div ref={panelRef} className="case-detail-palette-panel">
            <ul className="case-detail-palette-swatches">
              {palette.swatches.map((swatch) => (
                <li
                  key={swatch.hex}
                  className={`case-detail-palette-swatch${swatch.dark ? " is-dark" : ""}`}
                  style={{ backgroundColor: swatch.hex }}
                >
                  <span className="case-detail-palette-name">
                    {swatch.name}
                  </span>
                  <span className="case-detail-palette-hex">{swatch.hex}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
