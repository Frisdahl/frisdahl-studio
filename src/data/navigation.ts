export type Locale = 'da' | 'en'

export const defaultLocale: Locale = 'da'

export interface NavItem {
  href: string
  labels: Record<Locale, string>
}

export const navItems: NavItem[] = [
  { href: '#services', labels: { da: 'Ydelser', en: 'Services' } },
  { href: '#portfolio', labels: { da: 'Portfolio', en: 'Portfolio' } },
  { href: '#process', labels: { da: 'Proces', en: 'Process' } },
  { href: '#pricing', labels: { da: 'Priser', en: 'Pricing' } },
  { href: '#contact', labels: { da: 'Kontakt', en: 'Contact' } },
]

const mobileNavGroups = [
  {
    title: { da: 'Samarbejde', en: 'Collaboration' },
    hrefs: ['#services', '#process', '#pricing'],
  },
  {
    title: { da: 'Om os', en: 'About us' },
    hrefs: ['#portfolio', '#contact'],
  },
] as const

const navigationCopy = {
  da: {
    cta: 'Start et projekt',
    navAriaLabel: 'Hovednavigation',
    menuOpen: '\u00c5bn navigationsmenu',
    menuClose: 'Luk navigationsmenu',
    languageLabel: 'V\u00e6lg sprog',
    languages: {
      da: 'Dansk',
      en: 'Engelsk',
    },
  },
  en: {
    cta: 'Start a project',
    navAriaLabel: 'Main navigation',
    menuOpen: 'Open navigation menu',
    menuClose: 'Close navigation menu',
    languageLabel: 'Select language',
    languages: {
      da: 'Danish',
      en: 'English',
    },
  },
} as const

export interface NavigationContent {
  items: { href: string; label: string }[]
  mobileGroups: { title: string; items: { href: string; label: string }[] }[]
  cta: string
  navAriaLabel: string
  menuOpen: string
  menuClose: string
  languageLabel: string
  languages: { da: string; en: string }
}

export function getNavigation(locale: Locale = defaultLocale): NavigationContent {
  const items = navItems.map(({ href, labels }) => ({
    href,
    label: labels[locale],
  }))

  const itemsByHref = Object.fromEntries(items.map((item) => [item.href, item]))

  const mobileGroups = mobileNavGroups.map(({ title, hrefs }) => ({
    title: title[locale],
    items: hrefs.map((href) => itemsByHref[href]),
  }))

  return {
    items,
    mobileGroups,
    ...navigationCopy[locale],
  }
}
