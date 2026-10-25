import { createContext, useContext } from 'react'
import type { Locale } from '../data/navigation'

export interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
}

// The provider lives in LocaleProvider.tsx so this module exports no components
// (keeps React Fast Refresh working for both files).
export const LocaleContext = createContext<LocaleContextValue | null>(null)

export function useLocale() {
  const context = useContext(LocaleContext)

  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }

  return context
}
