import { CASES_PATH, CONTACT_PATH, MEET_US_PATH, PRIVACY_POLICY_PATH, PROCESS_PATH } from '../lib/routes'
import type { Locale } from './navigation'
import { defaultLocale } from './navigation'

export interface FooterLink {
  label: string
  href: string
}

export interface FooterSocialLink {
  label: string
  href: string
}

const footerContent = {
  da: {
    logoLabel: 'Frisdahl Studio',
    navAriaLabel: 'Footernavigation',
    // The four columns' small headings, left to right.
    columnTitles: { contact: 'Kontakt', nav: 'Navigation', studio: 'Studio', legal: 'Privatliv' },
    // Tagensvej 55, 2200 Nørrebro (OpenStreetMap).
    coordinates: '55.7003° N, 12.5523° E',
    // The full-width wordmark along the bottom.
    wordmark: 'Frisdahl Studio',
    links: [
      { label: 'Cases', href: CASES_PATH },
      { label: 'Proces', href: PROCESS_PATH },
      { label: 'Mød mig', href: MEET_US_PATH },
      { label: 'Kontakt', href: CONTACT_PATH },
    ],
    locationTitle: 'København',
    country: 'Danmark',
    email: 'hello@frisdahlstudio.dk',
    emailHref: 'mailto:hello@frisdahlstudio.dk',
    copyright: '© Frisdahl Studio. Alle rettigheder forbeholdes.',
    legalLinks: [
      { label: 'Datapolitik', href: PRIVACY_POLICY_PATH },
      { label: 'Databehandleraftale', href: '#databehandleraftale' },
      { label: 'Salgs- og leveringsaftaler', href: '#salgs-og-leveringsaftaler' },
    ],
    // PLACEHOLDER profile URLs — replace with the verified profiles before launch.
    socialLinks: [
      {
        label: 'Facebook',
        href: 'https://www.facebook.com/frisdahlstudio',
      },
      {
        label: 'Instagram',
        href: 'https://www.instagram.com/frisdahlstudio',
      },
      {
        label: 'GitHub',
        href: 'https://github.com/frisdahlstudio',
      },
    ] as FooterSocialLink[],
  },
} as const

export type FooterContent = (typeof footerContent)[Locale]

export function getFooterContent(locale: Locale = defaultLocale): FooterContent {
  return footerContent[locale]
}
