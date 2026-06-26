import { PRICING_PATH, CASES_PATH, WEB_DEVELOPMENT_PATH } from '../lib/routes'

export type Locale = 'da' | 'en'

export const defaultLocale: Locale = 'da'

export interface NavItem {
  href: string
  labels: Record<Locale, string>
}

export type NavDropdownIcon =
  | 'code'
  | 'design'
  | 'content'
  | 'maintenance'
  | 'meet'
  | 'process'
  | 'culture'
  | 'blog'

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
      href: WEB_DEVELOPMENT_PATH,
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
      href: WEB_DEVELOPMENT_PATH,
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

const aboutUsDropdownColumns = {
  da: [
    {
      title: 'Mød os',
      description: 'Lær teamet bag Frisdahl Studio og vores tilgang til samarbejde.',
      href: '#om-os',
      icon: 'meet',
    },
    {
      title: 'Proces',
      description: 'Sådan arbejder vi — fra første idé til lancering og videre.',
      href: '#process',
      icon: 'process',
    },
    {
      title: 'Kultur',
      description: 'Værdier, mindset og det der driver os i hverdagen.',
      href: '#kultur',
      icon: 'culture',
    },
    {
      title: 'Blog',
      description: 'Indsigt, erfaringer og tanker fra vores hverdag i studiet.',
      href: '#blog',
      icon: 'blog',
    },
  ],
  en: [
    {
      title: 'Meet us',
      description: 'Get to know the Frisdahl Studio team and how we work together.',
      href: '#om-os',
      icon: 'meet',
    },
    {
      title: 'Process',
      description: 'How we work — from first idea to launch and beyond.',
      href: '#process',
      icon: 'process',
    },
    {
      title: 'Culture',
      description: 'Values, mindset and what drives us every day.',
      href: '#kultur',
      icon: 'culture',
    },
    {
      title: 'Blog',
      description: 'Insights, learnings and thoughts from life in the studio.',
      href: '#blog',
      icon: 'blog',
    },
  ],
} as const satisfies Record<Locale, NavDropdownColumn[]>

export const navDropdownHrefs = new Set(['/#services', '/#om-os'])

export const navItems: NavItem[] = [
  { href: '/#services', labels: { da: 'Services', en: 'Services' } },
  { href: CASES_PATH, labels: { da: 'Cases', en: 'Cases' } },
  { href: '/#om-os', labels: { da: 'Om os', en: 'About us' } },
  { href: PRICING_PATH, labels: { da: 'Priser', en: 'Pricing' } },
  { href: '/#contact', labels: { da: 'Kontakt', en: 'Contact' } },
]

const mobileNavGroups = [
  {
    title: { da: 'Samarbejde', en: 'Collaboration' },
    hrefs: ['/#services', PRICING_PATH],
  },
  {
    title: { da: 'Om os', en: 'About us' },
    hrefs: [CASES_PATH, '/#om-os', '/#contact'],
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
  aboutUsDropdown: NavDropdownColumn[]
  cta: string
  navAriaLabel: string
  menuOpen: string
  menuClose: string
  languageLabel: string
  languages: { da: string; en: string }
}

export function getNavDropdownColumns(
  href: string,
  locale: Locale = defaultLocale,
): NavDropdownColumn[] {
  if (href === '/#om-os') {
    return [...aboutUsDropdownColumns[locale]]
  }

  return [...servicesDropdownColumns[locale]]
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
    aboutUsDropdown: [...aboutUsDropdownColumns[locale]],
    ...navigationCopy[locale],
  }
}
