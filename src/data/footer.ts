import {
  CASES_PATH,
  MEET_US_PATH,
  PRICING_PATH,
  PRIVACY_POLICY_PATH,
  PROCESS_PATH,
} from '../lib/routes'
import type { Locale } from './navigation'
import { defaultLocale } from './navigation'

export interface FooterLink {
  label: string
  href: string
}

export interface FooterColumn {
  links: FooterLink[]
}

export interface FooterSocialLink {
  label: string
  href: string
  icon: 'facebook' | 'behance' | 'github'
}

const footerContent = {
  da: {
    logoLabel: 'Frisdahl Studio',
    columnsAriaLabel: 'Footer navigation',
    // Every href here is a route that exists; no #anchors.
    columns: [
      {
        links: [
          { label: 'Cases', href: CASES_PATH },
          { label: 'Proces', href: PROCESS_PATH },
          { label: 'Priser', href: PRICING_PATH },
        ],
      },
      {
        links: [
          { label: 'Mød mig', href: MEET_US_PATH },
          { label: 'Kontakt', href: '/#contact' },
        ],
      },
    ],
    locationTitle: 'København',
    address: 'Tagensvej 55, 2200 Nørrebro',
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
        icon: 'facebook',
      },
      {
        label: 'Behance',
        href: 'https://www.behance.net/frisdahlstudio',
        icon: 'behance',
      },
      {
        label: 'GitHub',
        href: 'https://github.com/frisdahlstudio',
        icon: 'github',
      },
    ] as FooterSocialLink[],
  },
  en: {
    logoLabel: 'Frisdahl Studio',
    columnsAriaLabel: 'Footer navigation',
    // Every href here is a route that exists; no #anchors.
    columns: [
      {
        links: [
          { label: 'Cases', href: CASES_PATH },
          { label: 'Process', href: PROCESS_PATH },
          { label: 'Pricing', href: PRICING_PATH },
        ],
      },
      {
        links: [
          { label: 'Meet me', href: MEET_US_PATH },
          { label: 'Contact', href: '/#contact' },
        ],
      },
    ],
    locationTitle: 'Copenhagen',
    address: 'Tagensvej 55, 2200 Nørrebro',
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
        icon: 'facebook',
      },
      {
        label: 'Behance',
        href: 'https://www.behance.net/frisdahlstudio',
        icon: 'behance',
      },
      {
        label: 'GitHub',
        href: 'https://github.com/frisdahlstudio',
        icon: 'github',
      },
    ] as FooterSocialLink[],
  },
} as const

export type FooterContent = (typeof footerContent)[Locale]

export function getFooterContent(locale: Locale = defaultLocale): FooterContent {
  return footerContent[locale]
}
