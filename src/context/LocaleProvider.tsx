import { useState, type ReactNode } from 'react'
import { defaultLocale, type Locale } from '../data/navigation'
import { LocaleContext } from './LocaleContext'

interface LocaleProviderProps {
  children: ReactNode
}

export function LocaleProvider({ children }: LocaleProviderProps) {
  const [locale, setLocale] = useState<Locale>(defaultLocale)

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}
