import type { Locale } from './navigation'
import { defaultLocale } from './navigation'

export interface FooterLink {
  label: string
  href: string
}

export interface FooterColumn {
  title: string
  links: FooterLink[]
}

export interface FooterSocialLink {
  label: string
  href: string
  icon: 'facebook' | 'instagram' | 'tiktok' | 'linkedin'
}

const footerContent = {
  da: {
    logoLabel: 'Frisdahl Studio',
    columnsAriaLabel: 'Footer navigation',
    columns: [
      {
        title: 'Webudvikling',
        links: [
          { label: 'Wordpress', href: '#wordpress' },
          { label: 'Shopify', href: '#shopify' },
          { label: 'Kodet løsninger', href: '#kodet-loesninger' },
        ],
      },
      {
        title: 'Marketing & kommunikation',
        links: [
          { label: 'Content & koncept', href: '#content-koncept' },
          { label: 'Lead generering', href: '#lead-generering' },
          { label: 'SEO', href: '#seo' },
        ],
      },
      {
        title: 'Support og vedligehold',
        links: [
          { label: 'Wordpress support', href: '#wordpress-support' },
          { label: 'Shopify support', href: '#shopify-support' },
          { label: 'Kodet løsning support', href: '#kodet-loesning-support' },
        ],
      },
      {
        title: 'Mød os',
        links: [
          { label: 'Om os', href: '#om-os' },
          { label: 'Kultur', href: '#kultur' },
        ],
      },
    ],
    locationTitle: 'København',
    address: 'Tagensvej 55, 2200 Nørrebro',
    phone: '+45 12 34 56 78',
    phoneHref: 'tel:+4512345678',
    copyright: '© Frisdahl Studio. Alle rettigheder forbeholdes.',
    legalLinks: [
      { label: 'Datapolitik', href: '#datapolitik' },
      { label: 'Databehandleraftale', href: '#databehandleraftale' },
      { label: 'Salgs- og leveringsaftaler', href: '#salgs-og-leveringsaftaler' },
    ],
    socialLinks: [
      { label: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
      { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
      { label: 'TikTok', href: 'https://tiktok.com', icon: 'tiktok' },
      { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
    ],
  },
  en: {
    logoLabel: 'Frisdahl Studio',
    columnsAriaLabel: 'Footer navigation',
    columns: [
      {
        title: 'Web development',
        links: [
          { label: 'WordPress', href: '#wordpress' },
          { label: 'Shopify', href: '#shopify' },
          { label: 'Custom coded solutions', href: '#custom-solutions' },
        ],
      },
      {
        title: 'Marketing & communication',
        links: [
          { label: 'Content & concept', href: '#content-concept' },
          { label: 'Lead generation', href: '#lead-generation' },
          { label: 'SEO', href: '#seo' },
        ],
      },
      {
        title: 'Support & maintenance',
        links: [
          { label: 'WordPress support', href: '#wordpress-support' },
          { label: 'Shopify support', href: '#shopify-support' },
          { label: 'Custom solution support', href: '#custom-solution-support' },
        ],
      },
      {
        title: 'Meet us',
        links: [
          { label: 'About us', href: '#about' },
          { label: 'Culture', href: '#culture' },
        ],
      },
    ],
    locationTitle: 'Copenhagen',
    address: 'Tagensvej 55, 2200 Nørrebro',
    phone: '+45 12 34 56 78',
    phoneHref: 'tel:+4512345678',
    copyright: '© Frisdahl Studio. All rights reserved.',
    legalLinks: [
      { label: 'Privacy policy', href: '#privacy-policy' },
      { label: 'Data processing agreement', href: '#data-processing-agreement' },
      { label: 'Sales and delivery terms', href: '#sales-and-delivery-terms' },
    ],
    socialLinks: [
      { label: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
      { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
      { label: 'TikTok', href: 'https://tiktok.com', icon: 'tiktok' },
      { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
    ],
  },
} as const

export type FooterContent = (typeof footerContent)[Locale]

export function getFooterContent(locale: Locale = defaultLocale): FooterContent {
  return footerContent[locale]
}
