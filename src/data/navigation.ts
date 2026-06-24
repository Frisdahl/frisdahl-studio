export type Locale = 'da' | 'en'

export const defaultLocale: Locale = 'da'

export interface NavItem {
  href: string
  labels: Record<Locale, string>
}

export type NavDropdownIcon = 'code' | 'design' | 'content' | 'maintenance'

export interface NavDropdownColumn {
  title: string
  description: string
  href: string
  icon: NavDropdownIcon
}

const servicesDropdownColumns = {
  da: [
    {
      title: 'Webudvikling',
      description: 'Moderne, hurtige websites skræddersyet til jeres behov.',
      href: '#webudvikling',
      icon: 'code',
    },
    {
      title: 'Grafisk design',
      description: 'Visuel identitet og UI-design der styrker jeres brand.',
      href: '#grafisk-design',
      icon: 'design',
    },
    {
      title: 'Content & Koncept',
      description: 'Strategi, tekst og koncept der skaber klarhed og værdi.',
      href: '#content-koncept',
      icon: 'content',
    },
    {
      title: 'Vedligeholdelse',
      description: 'Løbende support, opdateringer og forbedringer efter lancering.',
      href: '#vedligeholdelse',
      icon: 'maintenance',
    },
  ],
  en: [
    {
      title: 'Web development',
      description: 'Modern, fast websites tailored to your needs.',
      href: '#web-development',
      icon: 'code',
    },
    {
      title: 'Graphic design',
      description: 'Visual identity and UI design that strengthens your brand.',
      href: '#graphic-design',
      icon: 'design',
    },
    {
      title: 'Content & concept',
      description: 'Strategy, copy and concept that create clarity and value.',
      href: '#content-concept',
      icon: 'content',
    },
    {
      title: 'Maintenance',
      description: 'Ongoing support, updates and improvements after launch.',
      href: '#maintenance',
      icon: 'maintenance',
    },
  ],
} as const satisfies Record<Locale, NavDropdownColumn[]>

export const navDropdownHrefs = new Set(['#services', '#om-os'])

export const navItems: NavItem[] = [
  { href: '#services', labels: { da: 'Services', en: 'Services' } },
  { href: '#portfolio', labels: { da: 'Cases', en: 'Cases' } },
  { href: '#om-os', labels: { da: 'Om os', en: 'About us' } },
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
    hrefs: ['#portfolio', '#om-os', '#contact'],
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
  servicesDropdown: NavDropdownColumn[]
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
    servicesDropdown: [...servicesDropdownColumns[locale]],
    ...navigationCopy[locale],
  }
}
