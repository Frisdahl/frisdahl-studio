import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { BookMeetingPanel } from '../components/contact/BookMeetingPanel'
import { ContactDrawer, type ContactDrawerView } from '../components/contact/ContactDrawer'
import { ContactWritePanel } from '../components/contact/ContactWritePanel'
import { getHomeContent } from '../data/home'
import { useLocale } from './LocaleContext'

interface ContactDrawerContextValue {
  openDrawer: (view: ContactDrawerView) => void
  closeDrawer: () => void
}

const ContactDrawerContext = createContext<ContactDrawerContextValue | null>(null)

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

export function useContactDrawer() {
  const context = useContext(ContactDrawerContext)

  if (!context) {
    throw new Error('useContactDrawer must be used within ContactDrawerProvider')
  }

  return context
}
