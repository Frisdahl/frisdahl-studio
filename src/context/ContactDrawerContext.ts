import { createContext, useContext } from 'react'
import type { ContactDrawerView } from '../components/contact/ContactDrawer'

export interface ContactDrawerContextValue {
  openDrawer: (view: ContactDrawerView) => void
  closeDrawer: () => void
}

// The provider lives in ContactDrawerProvider.tsx so this module exports no
// components (keeps React Fast Refresh working for both files).
export const ContactDrawerContext = createContext<ContactDrawerContextValue | null>(null)

export function useContactDrawer() {
  const context = useContext(ContactDrawerContext)

  if (!context) {
    throw new Error('useContactDrawer must be used within ContactDrawerProvider')
  }

  return context
}
