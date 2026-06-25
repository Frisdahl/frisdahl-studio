import type { CaseCategory, CasesPageContent } from '../types/cases'
import type { Locale } from './navigation'
import { defaultLocale } from './navigation'

const categoryLabels: Record<Locale, Record<CaseCategory, string>> = {
  da: {
    website: 'Website',
    webshop: 'Webshop',
    grafisk: 'Grafisk',
    content: 'Content',
    ecommerce: 'E-commerce',
  },
  en: {
    website: 'Website',
    webshop: 'Webshop',
    grafisk: 'Graphic',
    content: 'Content',
    ecommerce: 'E-commerce',
  },
}

const casesPageContent = {
  da: {
    eyebrow: 'Se et uddrag af vores cases',
    title: 'Vores resultater for de virksomheder, der former morgendagen',
    filtersAriaLabel: 'Filtrer cases efter kategori',
    filters: [
      { id: 'website', label: 'Website' },
      { id: 'webshop', label: 'Webshop' },
      { id: 'grafisk', label: 'Grafisk' },
      { id: 'content', label: 'Content' },
      { id: 'ecommerce', label: 'E-commerce' },
    ],
    items: [
      {
        id: 'nordwear',
        client: 'Nordwear',
        industry: 'Mode',
        category: 'website',
        href: '/cases/nordwear',
        imageSrc: '/cases/Nordwear-mobile.webp',
        imageAlt: 'Nordwear case',
        panelHoverColor: '#f0e0e4',
        keywords: ['Website', 'UX-DESIGN', 'Branding', 'Udvikling'],
        description:
          'En skarp digital platform til et moderne tøjbrand med fokus på performance og en stærk visuel identitet.',
      },
      {
        id: 'fresh-cut',
        client: 'Fresh Cut',
        industry: 'Skønhed',
        category: 'website',
        href: '/cases/fresh-cut',
        imageSrc: '/cases/freshCut-thumbnail.webp',
        imageAlt: 'Fresh Cut case',
        keywords: ['Website', 'Design', 'Content', 'SEO'],
        description:
          'En levende hjemmeside til en lokal salon med tydelig bookingflow og et udtryk, der matcher brandet.',
      },
      {
        id: 'atelier-noir',
        client: 'Atelier Noir',
        industry: 'Mode',
        category: 'webshop',
        href: '/cases/atelier-noir',
        imageSrc: null,
        imageAlt: 'Atelier Noir webshop case',
        keywords: ['Webshop', 'E-commerce', 'UX-DESIGN', 'Integration'],
        description:
          'En elegant webshop med fokus på produktoplevelse, hurtig checkout og en premium brandfølelse.',
      },
      {
        id: 'forma-studio',
        client: 'Forma Studio',
        industry: 'Arkitektur',
        category: 'grafisk',
        href: '/cases/forma-studio',
        imageSrc: null,
        imageAlt: 'Forma Studio grafisk case',
        keywords: ['Grafisk', 'Identitet', 'Print', 'Art direction'],
        description:
          'Visuel identitet og designmanual til et arkitekturstudio med fokus på balance mellem ro og præcision.',
      },
      {
        id: 'northline',
        client: 'Northline',
        industry: 'Rådgivning',
        category: 'content',
        href: '/cases/northline',
        imageSrc: null,
        imageAlt: 'Northline content case',
        keywords: ['Content', 'Strategi', 'Tekst', 'Tone of voice'],
        description:
          'Contentstrategi og tekstunivers til en vækstvirksomhed med behov for klar kommunikation på tværs af kanaler.',
      },
      {
        id: 'urban-supply',
        client: 'Urban Supply',
        industry: 'Retail',
        category: 'ecommerce',
        href: '/cases/urban-supply',
        imageSrc: null,
        imageAlt: 'Urban Supply e-commerce case',
        keywords: ['E-commerce', 'Platform', 'Integration', 'Automation'],
        description:
          'Skalerbar e-commerce løsning med fokus på drift, produktdata og en strømlinet kundeoplevelse.',
      },
    ],
  },
  en: {
    eyebrow: 'See a selection of our cases',
    title: 'Our results for the companies shaping tomorrow',
    filtersAriaLabel: 'Filter cases by category',
    filters: [
      { id: 'website', label: 'Website' },
      { id: 'webshop', label: 'Webshop' },
      { id: 'grafisk', label: 'Graphic' },
      { id: 'content', label: 'Content' },
      { id: 'ecommerce', label: 'E-commerce' },
    ],
    items: [
      {
        id: 'nordwear',
        client: 'Nordwear',
        industry: 'Fashion',
        category: 'website',
        href: '/cases/nordwear',
        imageSrc: '/cases/Nordwear-mobile.webp',
        imageAlt: 'Nordwear case',
        panelHoverColor: '#f0e0e4',
        keywords: ['Website', 'UX-DESIGN', 'Branding', 'Development'],
        description:
          'A sharp digital platform for a modern apparel brand focused on performance and a strong visual identity.',
      },
      {
        id: 'fresh-cut',
        client: 'Fresh Cut',
        industry: 'Beauty',
        category: 'website',
        href: '/cases/fresh-cut',
        imageSrc: '/cases/freshCut-thumbnail.webp',
        imageAlt: 'Fresh Cut case',
        keywords: ['Website', 'Design', 'Content', 'SEO'],
        description:
          'A vibrant website for a local salon with a clear booking flow and an expression that matches the brand.',
      },
      {
        id: 'atelier-noir',
        client: 'Atelier Noir',
        industry: 'Fashion',
        category: 'webshop',
        href: '/cases/atelier-noir',
        imageSrc: null,
        imageAlt: 'Atelier Noir webshop case',
        keywords: ['Webshop', 'E-commerce', 'UX-DESIGN', 'Integration'],
        description:
          'An elegant webshop focused on product experience, fast checkout, and a premium brand feel.',
      },
      {
        id: 'forma-studio',
        client: 'Forma Studio',
        industry: 'Architecture',
        category: 'grafisk',
        href: '/cases/forma-studio',
        imageSrc: null,
        imageAlt: 'Forma Studio graphic case',
        keywords: ['Graphic', 'Identity', 'Print', 'Art direction'],
        description:
          'Visual identity and design guidelines for an architecture studio balancing calm and precision.',
      },
      {
        id: 'northline',
        client: 'Northline',
        industry: 'Consulting',
        category: 'content',
        href: '/cases/northline',
        imageSrc: null,
        imageAlt: 'Northline content case',
        keywords: ['Content', 'Strategy', 'Copy', 'Tone of voice'],
        description:
          'Content strategy and copy for a growth company needing clear communication across channels.',
      },
      {
        id: 'urban-supply',
        client: 'Urban Supply',
        industry: 'Retail',
        category: 'ecommerce',
        href: '/cases/urban-supply',
        imageSrc: null,
        imageAlt: 'Urban Supply e-commerce case',
        keywords: ['E-commerce', 'Platform', 'Integration', 'Automation'],
        description:
          'Scalable e-commerce setup focused on operations, product data, and a streamlined customer experience.',
      },
    ],
  },
} as const satisfies Record<Locale, CasesPageContent>

export function getCasesResultsCountLabel(locale: Locale, count: number): string {
  if (locale === 'da') {
    return count === 1 ? '1 case vist' : `${count} cases vist`
  }

  return count === 1 ? '1 case shown' : `${count} cases shown`
}

export function getCasesPageContent(locale: Locale = defaultLocale): CasesPageContent {
  return casesPageContent[locale]
}

export function getCaseCategoryLabel(
  locale: Locale,
  category: CaseCategory,
): string {
  return categoryLabels[locale][category]
}
