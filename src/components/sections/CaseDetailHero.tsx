import type { CaseDetailHero as CaseDetailHeroContent } from '../../types/caseDetail'
import { ArrowIcon, Container } from '../ui'
import { CasesImageMarquee } from './CasesImageMarquee'

interface CaseDetailHeroProps {
  hero: CaseDetailHeroContent
}

export function CaseDetailHero({ hero }: CaseDetailHeroProps) {
  const { eyebrow, title, description, slides, sliderAriaLabel, meta } = hero

  return (
    <section className="case-detail relative isolate pt-section-sm lg:pt-section" aria-label={title}>
      <Container className="relative z-[1]">
        <p className="eyebrow eyebrow-accent">{eyebrow}</p>

        <div className="case-detail-hero-grid mt-md">
          <h1 className="cases-page-title min-w-0">{title}</h1>
          <p className="case-detail-hero-description min-w-0 text-body">{description}</p>
        </div>

        {meta.length > 0 && (
          <dl className="case-detail-hero-meta">
            {meta.map((item) => (
              <div key={item.label} className="case-detail-hero-meta-item">
                <dt className="case-detail-hero-meta-label">{item.label}</dt>
                <dd className="case-detail-hero-meta-value">
                  {item.href && item.value ? (
                    <a
                      className="case-detail-hero-meta-link"
                      href={item.href}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <span>{item.value}</span>
                      <ArrowIcon width={14} height={14} />
                    </a>
                  ) : (
                    item.value ?? null
                  )}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </Container>

      <CasesImageMarquee
        slides={slides}
        ariaLabel={sliderAriaLabel}
        className="relative z-[1] mt-xl lg:mt-2xl"
      />
    </section>
  )
}
