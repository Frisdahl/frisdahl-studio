import { PageEntrance } from '../components/layout/PageEntrance'
import { ContactForm } from '../components/contact/ContactForm'
import { PageMeta } from '../components/layout'
import { Container, WavePhrases } from '../components/ui'
import { useLocale } from '../context/LocaleContext'
import { getContactPageContent } from '../data/contact'
import { getPageMetaContent } from '../data/pageMeta'

/** Light grey page, dark text: the heading on the left, the form on the right. */
export function ContactPage() {
  const { locale } = useLocale()
  const { titles } = getPageMetaContent(locale)
  const { headingLine1, headingPhrases } = getContactPageContent(locale)

  return (
    <main id="main-content" className="page-surface contact-page">
      <PageEntrance />
      <PageMeta title={titles.contact} />
      <Container>
        <div className="contact-page-grid">
          {/* A size container, so the heading scales with its column. */}
          <div className="contact-page-intro">
            <h1 className="contact-page-heading">
              <span className="block">{headingLine1}</span>{' '}
              <span className="contact-page-heading-muted block">
                <WavePhrases phrases={headingPhrases} />
              </span>
            </h1>
          </div>

          <div className="contact-page-form">
            <ContactForm />
          </div>
        </div>
      </Container>
    </main>
  )
}
