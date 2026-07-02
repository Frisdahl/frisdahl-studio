import type { CaseDetailHero as CaseDetailHeroContent } from '../../types/caseDetail'
import { Container } from '../ui'
import { CasesImageMarquee } from './CasesImageMarquee'

interface CaseDetailHeroProps {
  hero: CaseDetailHeroContent
}

export function CaseDetailHero({ hero }: CaseDetailHeroProps) {
  const { eyebrow, title, description, slides, sliderAriaLabel } = hero

  return (
    <section className="case-detail relative isolate pt-section-sm lg:pt-section" aria-label={title}>
      <div className="cases-page-blob" aria-hidden="true" />

      <Container className="relative z-[1]">
        <p className="eyebrow">{eyebrow}</p>

        <div className="case-detail-hero-grid mt-md">
          <h1 className="cases-page-title min-w-0">{title}</h1>
          <p className="case-detail-hero-description min-w-0 text-body">{description}</p>
        </div>
      </Container>

      <CasesImageMarquee
        slides={slides}
        ariaLabel={sliderAriaLabel}
        className="relative z-[1] mt-4xl lg:mt-5xl"
      />
    </section>
  )
}
