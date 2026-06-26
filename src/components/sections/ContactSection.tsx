import { HiCalendar } from 'react-icons/hi2'
import { useLocale } from '../../context/LocaleContext'
import { useContactDrawer } from '../../context/ContactDrawerContext'
import { getHomeContent } from '../../data/home'
import { Button, Container } from '../ui'
import { ContactDecorations } from './ContactDecorations'

export interface ContactSectionProps {
  surface?: 'default' | 'plain'
}

export function ContactSection({ surface = 'default' }: ContactSectionProps) {
  const { locale } = useLocale()
  const { contact } = getHomeContent(locale)
  const { openDrawer } = useContactDrawer()
  const isPlain = surface === 'plain'

  return (
    <section
      id="contact"
      className={[
        'contact-section relative overflow-hidden py-24 lg:py-32',
        isPlain ? 'contact-section--plain' : 'bg-contact-bg',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <ContactDecorations />

      <Container className="relative z-10">
        <div className="mx-auto w-full max-w-[700px] text-center">
          <p className="contact-section-eyebrow eyebrow">{contact.eyebrow}</p>

          <div className="mx-auto mt-xl w-fit max-w-full">
            <h2 className="contact-section-title">{contact.title}</h2>
            <p className="contact-section-description mt-xl text-body-lg">{contact.description}</p>
          </div>

          <div className="mt-3xl flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button type="button" onClick={() => openDrawer('contact')}>
              {contact.ctaPrimary}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => openDrawer('book')}
            >
              <HiCalendar className="h-5 w-5 shrink-0" aria-hidden="true" />
              {contact.ctaSecondary}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
