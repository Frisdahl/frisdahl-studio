import { CASES_PATH, CONTACT_PATH, MEET_US_PATH } from '../lib/routes'
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

// Set the studio phone number here (e.g. '+45 12 34 56 78') and the footer shows
// it with a tel: link. Empty means the line is hidden.
const PHONE: string = ''
const PHONE_HREF: string = PHONE ? `tel:${PHONE.replace(/[^+\d]/g, '')}` : ''

const footerContent = {
  da: {
    logoLabel: 'Frisdahl Studio',
    navAriaLabel: 'Footer navigation',
    // The four columns' small headings, left to right.
    columnTitles: { contact: 'Kontakt', nav: 'Navigation', studio: 'Studio', legal: 'Privatliv' },
    ctaTitle: 'Klar til at starte dit projekt?',
    backToTop: 'Tilbage til toppen',
    phone: PHONE,
    phoneHref: PHONE_HREF,
    image: { src: '/images/footer-sign--4-3.webp', alt: 'Skilt med teksten "Clearly its’ a Sign." og Frisdahl Studio' },
    // Tagensvej 55, 2200 Nørrebro (OpenStreetMap).
    coordinates: '55.7003° N, 12.5523° E',
    links: [
      { label: 'Cases', href: CASES_PATH },
      { label: 'Mød mig', href: MEET_US_PATH },
      { label: 'Kontakt', href: CONTACT_PATH },
    ],
    locationTitle: 'København',
    email: 'hello@frisdahlstudio.dk',
    emailHref: 'mailto:hello@frisdahlstudio.dk',
    copyright: '© Frisdahl Studio. Alle rettigheder forbeholdes.',
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
    ctaTitle: 'Ready to start your project?',
    backToTop: 'Back to top',
    phone: PHONE,
    phoneHref: PHONE_HREF,
    image: { src: '/images/footer-sign--4-3.webp', alt: 'A sign reading "Clearly its’ a Sign." with Frisdahl Studio' },
    coordinates: '55.7003° N, 12.5523° E',
    links: [
      { label: 'Cases', href: CASES_PATH },
      { label: 'Meet me', href: MEET_US_PATH },
      { label: 'Contact', href: CONTACT_PATH },
    ],
    locationTitle: 'Copenhagen',
    email: 'hello@frisdahlstudio.dk',
    emailHref: 'mailto:hello@frisdahlstudio.dk',
    copyright: '© Frisdahl Studio. All rights reserved.',
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
