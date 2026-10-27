import { CASES_PATH, MEET_US_PATH, PROCESS_PATH } from '../lib/routes'

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

const aboutUsDropdownColumns = {
  da: [
    {
      title: 'Mød mig',
      description: 'Lær mig bag Frisdahl Studio at kende – og min tilgang til samarbejde.',
      href: MEET_US_PATH,
      icon: 'meet',
    },
    {
      title: 'Proces',
      description: 'Sådan arbejder jeg — fra første idé til lancering og videre.',
      href: PROCESS_PATH,
      icon: 'process',
    },
    {
      title: 'Kultur',
      description: 'Værdier, mindset og det, der driver mig i hverdagen.',
      href: '#kultur',
      icon: 'culture',
    },
    {
      title: 'Blog',
      description: 'Indsigt, erfaringer og tanker fra min hverdag i studiet.',
      href: '#blog',
      icon: 'blog',
    },
  ],
  en: [
    {
      title: 'Meet me',
      description: 'Get to know the person behind Frisdahl Studio and how I work with clients.',
      href: MEET_US_PATH,
      icon: 'meet',
    },
    {
      title: 'Process',
      description: 'How I work — from first idea to launch and beyond.',
      href: PROCESS_PATH,
      icon: 'process',
    },
    {
      title: 'Culture',
      description: 'Values, mindset and what drives me every day.',
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

// No nav item opens a dropdown any more; "Om mig" links straight to the Mød mig page.
export const navDropdownHrefs = new Set<string>()

export const navItems: NavItem[] = [
  { href: CASES_PATH, labels: { da: 'Cases', en: 'Cases' } },
  { href: MEET_US_PATH, labels: { da: 'Om mig', en: 'About me' } },
  { href: '/#priser', labels: { da: 'Priser', en: 'Pricing' } },
  { href: '/#contact', labels: { da: 'Kontakt', en: 'Contact' } },
]

const mobileNavGroups = [
  {
    title: { da: 'Samarbejde', en: 'Collaboration' },
    hrefs: ['/#priser'],
  },
  {
    title: { da: 'Om mig', en: 'About me' },
    hrefs: [CASES_PATH, MEET_US_PATH, '/#contact'],
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

  return []
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
    aboutUsDropdown: [...aboutUsDropdownColumns[locale]],
    ...navigationCopy[locale],
  }
}
