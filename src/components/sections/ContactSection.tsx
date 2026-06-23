import { getHomeContent } from '../../data/home'
import { defaultLocale, type Locale } from '../../data/navigation'
import { Button, Container } from '../ui'

interface ContactSectionProps {
  locale?: Locale
}

export function ContactSection({ locale = defaultLocale }: ContactSectionProps) {
  const { contact } = getHomeContent(locale)

  return (
    <section id="contact" className="py-section-sm lg:py-section">
      <Container>
        <div className="rounded-panel-xl border border-border-light bg-surface p-8 text-center shadow-soft sm:p-12 lg:p-16">
          <h2 className="mx-auto max-w-2xl">{contact.title}</h2>
          <p className="mx-auto mt-md max-w-xl text-body-lg">{contact.description}</p>
          <div className="mt-xl flex justify-center">
            <Button href="#contact">{contact.cta}</Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
