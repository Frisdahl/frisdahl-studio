import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { BookMeetingPanel } from '../components/contact/BookMeetingPanel'
import { ContactDrawer, type ContactDrawerView } from '../components/contact/ContactDrawer'
import { ContactWritePanel } from '../components/contact/ContactWritePanel'
import { getHomeContent } from '../data/home'
import { ContactDrawerContext } from './ContactDrawerContext'
import { useLocale } from './LocaleContext'

export function ContactDrawerProvider({ children }: { children: ReactNode }) {
  const [drawerView, setDrawerView] = useState<ContactDrawerView | null>(null)
  const { locale } = useLocale()
  const { contact } = getHomeContent(locale)

  const openDrawer = useCallback((view: ContactDrawerView) => {
    setDrawerView(view)
  }, [])

  const closeDrawer = useCallback(() => {
    setDrawerView(null)
  }, [])

  const value = useMemo(
    () => ({
      openDrawer,
      closeDrawer,
    }),
    [openDrawer, closeDrawer],
  )

  return (
    <ContactDrawerContext.Provider value={value}>
      {children}
      <ContactDrawer
        isOpen={drawerView !== null}
        view={drawerView}
        onClose={closeDrawer}
        closeLabel={contact.drawer.closeLabel}
      >
        {drawerView === 'book' ? (
          <BookMeetingPanel onClose={closeDrawer} />
        ) : drawerView === 'contact' ? (
          <ContactWritePanel onClose={closeDrawer} />
        ) : null}
      </ContactDrawer>
    </ContactDrawerContext.Provider>
  )
}
