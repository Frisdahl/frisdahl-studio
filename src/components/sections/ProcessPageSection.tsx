import { useLocale } from '../../context/LocaleContext'
import { getProcessPageContent } from '../../data/process'
import { Container } from '../ui'
import { ProcessSection } from './ProcessSection'

export function ProcessPageSection() {
  const { locale } = useLocale()
  const { eyebrow, title, description, steps } = getProcessPageContent(locale)

  return (
    <section className="process-page relative isolate py-section-sm lg:py-section" aria-label={title}>
      <div className="process-page-blob" aria-hidden="true" />

      <Container className="relative z-[1]">
        <div className="cases-page-intro">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="cases-page-title mt-md">{title}</h1>
          <p className="process-page-description">{description}</p>
        </div>

        <div className="cases-page-divider" role="separator" aria-hidden="true" />

        <ProcessSection content={{ eyebrow: '', title: '', steps }} embedded />
      </Container>
    </section>
  )
}
