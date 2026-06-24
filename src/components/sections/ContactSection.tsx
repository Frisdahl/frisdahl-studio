import { HiCalendar } from 'react-icons/hi2'
import { useState } from 'react'
import { useLocale } from '../../context/LocaleContext'
import { getHomeContent } from '../../data/home'
import { BookMeetingPanel } from '../contact/BookMeetingPanel'
import { ContactDrawer, type ContactDrawerView } from '../contact/ContactDrawer'
import { ContactWritePanel } from '../contact/ContactWritePanel'
import { Button, Container } from '../ui'

export function ContactSection() {
  const { locale } = useLocale()
  const { contact } = getHomeContent(locale)
  const [drawerView, setDrawerView] = useState<ContactDrawerView | null>(null)

  const closeDrawer = () => setDrawerView(null)

  return (
    <>
      <section id="contact" className="contact-section bg-contact-bg py-section-sm lg:py-section">
        <Container>
          <div className="mx-auto w-full max-w-[700px] text-center">
            <p className="contact-section-eyebrow eyebrow">{contact.eyebrow}</p>

            <div className="mx-auto mt-xl w-fit max-w-full">
              <h2 className="contact-section-title">{contact.title}</h2>
              <p className="contact-section-description mt-xl text-body-lg">{contact.description}</p>
            </div>

            <div className="mt-3xl flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button type="button" onClick={() => setDrawerView('contact')}>
                {contact.ctaPrimary}
              </Button>
              <Button type="button" variant="secondary" onClick={() => setDrawerView('book')}>
                <HiCalendar className="h-5 w-5 shrink-0" aria-hidden="true" />
                {contact.ctaSecondary}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <ContactDrawer
        isOpen={drawerView !== null}
        view={drawerView}
        onClose={closeDrawer}
        closeLabel={contact.drawer.closeLabel}
      >
        {drawerView === 'book' ? (
          <BookMeetingPanel onClose={closeDrawer} />
        ) : (
          <ContactWritePanel onClose={closeDrawer} />
        )}
      </ContactDrawer>
    </>
  )
}
