import { CASES_PATH, CONTACT_PATH, MEET_US_PATH } from '../lib/routes'

export type Locale = 'da'

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
} as const satisfies Record<Locale, NavDropdownColumn[]>

// No nav item opens a dropdown any more; "Mød mig" links straight to the Mød mig page.
export const navDropdownHrefs = new Set<string>()

export const navItems: NavItem[] = [
  { href: CASES_PATH, labels: { da: 'Cases',  } },
  { href: MEET_US_PATH, labels: { da: 'Mød mig',  } },
  { href: CONTACT_PATH, labels: { da: 'Kontakt',  } },
]

/** The burger menu's links, in order. '/' is the front page, labelled by homeLabel. */
const menuLinkHrefs = ['/', CASES_PATH, MEET_US_PATH, CONTACT_PATH] as const

const navigationCopy = {
  da: {
    cta: 'Start et projekt',
    homeLabel: 'Forside',
    navAriaLabel: 'Hovednavigation',
    menuOpen: '\u00c5bn navigationsmenu',
    menuClose: 'Luk navigationsmenu',
  },
} as const

export interface NavigationContent {
  items: { href: string; label: string }[]
  menuLinks: { href: string; label: string }[]
  aboutUsDropdown: NavDropdownColumn[]
  cta: string
  navAriaLabel: string
  menuOpen: string
  menuClose: string
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

  const menuLinks = menuLinkHrefs.map((href) =>
    href === '/' ? { href, label: navigationCopy[locale].homeLabel } : itemsByHref[href],
  )

  return {
    items,
    menuLinks,
    aboutUsDropdown: [...aboutUsDropdownColumns[locale]],
    ...navigationCopy[locale],
  }
}
