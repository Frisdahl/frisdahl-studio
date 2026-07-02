import type { PrivacyPolicyBlock, PrivacyPolicySection } from '../../types/privacyPolicy'
import { useLocale } from '../../context/LocaleContext'
import { getPrivacyPolicyPageContent } from '../../data/privacyPolicy'
import { Container } from '../ui'

interface PrivacyPolicyBlockContentProps {
  block: PrivacyPolicyBlock
}

function PrivacyPolicyBlockContent({ block }: PrivacyPolicyBlockContentProps) {
  if (block.type === 'bullets') {
    return (
      <ul className="legal-page-list">
        {block.items.map((item) => (
          <li key={item} className="legal-page-list-item">
            {item}
          </li>
        ))}
      </ul>
    )
  }

  return <p className="legal-page-text">{block.text}</p>
}

interface PrivacyPolicySectionBlockProps {
  section: PrivacyPolicySection
}

function PrivacyPolicySectionBlock({ section }: PrivacyPolicySectionBlockProps) {
  return (
    <article className="legal-page-section">
      <div className="legal-page-section-divider" role="separator" aria-hidden="true">
        <span className="legal-page-section-divider-dark" />
        <span className="legal-page-section-divider-track" />
      </div>

      <h2 className="legal-page-section-title">{section.title}</h2>

      <div className="legal-page-section-body">
        {section.blocks.map((block, index) => (
          <PrivacyPolicyBlockContent key={`${section.title}-${index}`} block={block} />
        ))}
      </div>
    </article>
  )
}

export function PrivacyPolicyPageSection() {
  const { locale } = useLocale()
  const { eyebrow, title, lastUpdatedLabel, lastUpdated, intro, sections } =
    getPrivacyPolicyPageContent(locale)

  return (
    <section className="legal-page relative isolate py-section-sm lg:py-section" aria-label={title}>
      <Container className="relative z-[1]">
        <div className="cases-page-intro">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="cases-page-title mt-md">{title}</h1>
          <p className="legal-page-updated">
            {lastUpdatedLabel}: {lastUpdated}
          </p>
          <p className="legal-page-intro">{intro}</p>
        </div>

        <div className="cases-page-divider" role="separator" aria-hidden="true" />

        <div className="legal-page-content">
          {sections.map((section) => (
            <PrivacyPolicySectionBlock key={section.title} section={section} />
          ))}
        </div>
      </Container>
    </section>
  )
}
