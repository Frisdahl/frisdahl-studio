import { CASES_PATH, MEET_US_PATH, PRIVACY_POLICY_PATH, PROCESS_PATH } from '../lib/routes'
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
    navAriaLabel: 'Footer navigation',
    // The four columns' small headings, left to right.
    columnTitles: { contact: 'Kontakt', nav: 'Navigation', studio: 'Studio', legal: 'Privatliv' },
    // Tagensvej 55, 2200 Nørrebro (OpenStreetMap).
    coordinates: '55.7003° N, 12.5523° E',
    // The full-width wordmark along the bottom.
    wordmark: 'Frisdahl Studio',
    // '/#contact' opens the contact drawer (see Footer); the rest are routes.
    links: [
      { label: 'Cases', href: CASES_PATH },
      { label: 'Proces', href: PROCESS_PATH },
      { label: 'Mød mig', href: MEET_US_PATH },
      { label: 'Kontakt', href: '/#contact' },
    ],
    locationTitle: 'København',
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
  en: {
    logoLabel: 'Frisdahl Studio',
    navAriaLabel: 'Footer navigation',
    columnTitles: { contact: 'Contact', nav: 'Navigation', studio: 'Studio', legal: 'Privacy' },
    coordinates: '55.7003° N, 12.5523° E',
    wordmark: 'Frisdahl Studio',
    // '/#contact' opens the contact drawer (see Footer); the rest are routes.
    links: [
      { label: 'Cases', href: CASES_PATH },
      { label: 'Process', href: PROCESS_PATH },
      { label: 'Meet me', href: MEET_US_PATH },
      { label: 'Contact', href: '/#contact' },
    ],
    locationTitle: 'Copenhagen',
    email: 'hello@frisdahlstudio.dk',
    emailHref: 'mailto:hello@frisdahlstudio.dk',
    copyright: '© Frisdahl Studio. All rights reserved.',
    legalLinks: [
      { label: 'Privacy policy', href: PRIVACY_POLICY_PATH },
      { label: 'Data processing agreement', href: '#data-processing-agreement' },
      { label: 'Sales and delivery terms', href: '#sales-and-delivery-terms' },
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
