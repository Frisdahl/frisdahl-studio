import type { ReactNode } from 'react'
import { defaultLocale } from '../data/navigation'
import { LocaleContext } from './LocaleContext'

interface LocaleProviderProps {
  children: ReactNode
}

export function LocaleProvider({ children }: LocaleProviderProps) {
  return (
    <LocaleContext.Provider value={{ locale: defaultLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}
