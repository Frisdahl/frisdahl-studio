import { useEffect, useRef, useState } from 'react'
import { HiChevronDown } from 'react-icons/hi2'
import { useLocale } from '../../context/LocaleContext'
import { getNavigation, type Locale } from '../../data/navigation'
import { FlagIcon } from './FlagIcon'

const localeOptions: Locale[] = ['da', 'en']

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale()
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { languageLabel, languages } = getNavigation(locale)

  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const handleSelect = (nextLocale: Locale) => {
    setLocale(nextLocale)
    setIsOpen(false)
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        className="language-switcher-trigger"
        aria-label={languageLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="language-switcher-flag">
          <FlagIcon locale={locale} className="h-full w-full" />
        </span>
        <HiChevronDown
          className={`language-switcher-chevron ${isOpen ? 'language-switcher-chevron-open' : ''}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <ul
          className="language-switcher-menu"
          role="listbox"
          aria-label={languageLabel}
        >
          {localeOptions.map((option) => {
            const isSelected = option === locale

            return (
              <li key={option} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  className={`language-switcher-option ${isSelected ? 'language-switcher-option-active' : ''}`}
                  onClick={() => handleSelect(option)}
                >
                  <span className="language-switcher-flag">
                    <FlagIcon locale={option} className="h-full w-full" />
                  </span>
                  <span>{languages[option]}</span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
