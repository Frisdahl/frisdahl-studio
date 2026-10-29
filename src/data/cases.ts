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
    eyebrow: 'Udvalgte projekter',
    title: 'Digitale oplevelser, skabt fra bunden.',
    filtersAriaLabel: 'Filtrer cases efter kategori',
    sliderAriaLabel: 'Cases',
    sliderPrev: 'Forrige',
    sliderNext: 'Næste',
    sliderStatus: 'Case {current} af {total}',
    filters: [
      { id: 'website', label: 'Website' },
      { id: 'webshop', label: 'Webshop' },
      { id: 'grafisk', label: 'Grafisk' },
      { id: 'content', label: 'Content' },
      { id: 'ecommerce', label: 'E-commerce' },
    ],
    items: [
      {
        id: 'peter-salling',
        client: 'Peter Salling',
        industry: 'Film',
        category: 'website',
        href: '/cases/peter-salling',
        imageSrc: '/cases/peter-salling/hero-skaerm--6-7.webp',
        imageAlt: 'Peter Salling case',
        keywords: ['Website', 'Design', 'Udvikling', 'CMS'],
        description:
          'En filmisk portfolio til filmproducer Peter Salling, hvor filmene er i centrum, og indholdet styres i et indbygget admin-panel.',
      },
      {
        id: 'nordwear',
        client: 'Nordwear',
        industry: 'Mode',
        category: 'website',
        href: '/cases/nordwear',
        imageSrc: '/cases/nordwear/mobile--6-7.jpg',
        imageAlt: 'Nordwear case',
        panelHoverColor: '#f0e0e4',
        keywords: ['Website', 'UX-design', 'Branding', 'Udvikling'],
        description:
          'En skarp digital platform til et moderne tøjbrand med fokus på performance og en stærk visuel identitet.',
      },
      {
        id: 'fresh-cut',
        client: 'Fresh Cut',
        industry: 'Skønhed',
        category: 'website',
        href: '/cases/fresh-cut',
        imageSrc: '/cases/fresh-cut/thumbnail--6-7.jpg',
        imageAlt: 'Fresh Cut case',
        keywords: ['Website', 'Design', 'Content', 'SEO'],
        description:
          'En levende hjemmeside til en lokal salon med tydelig bookingflow og et udtryk, der matcher brandet.',
      },
      {
        id: 'det-kollektive-klaedeskab',
        client: 'Det Kollektive Klædeskab',
        industry: 'Cirkulær mode',
        category: 'website',
        href: '/cases/det-kollektive-klaedeskab',
        imageSrc: '/cases/det-kollektive-klaedeskab/forside--6-7.webp',
        imageAlt: 'Det Kollektive Klædeskab case',
        keywords: ['Website', 'Redesign', 'UX-design', 'Udvikling'],
        description:
          'Et redesign-koncept til en fælles garderobe i København, hvor medlemmer låner, bytter og deler tøj med point.',
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
    eyebrow: 'Selected work',
    title: "Websites and webshops I've designed and built from scratch",
    filtersAriaLabel: 'Filter cases by category',
    sliderAriaLabel: 'Cases',
    sliderPrev: 'Previous',
    sliderNext: 'Next',
    sliderStatus: 'Case {current} of {total}',
    filters: [
      { id: 'website', label: 'Website' },
      { id: 'webshop', label: 'Webshop' },
      { id: 'grafisk', label: 'Graphic' },
      { id: 'content', label: 'Content' },
      { id: 'ecommerce', label: 'E-commerce' },
    ],
    items: [
      {
        id: 'peter-salling',
        client: 'Peter Salling',
        industry: 'Film',
        category: 'website',
        href: '/cases/peter-salling',
        imageSrc: '/cases/peter-salling/hero-skaerm--6-7.webp',
        imageAlt: 'Peter Salling case',
        keywords: ['Website', 'Design', 'Development', 'CMS'],
        description:
          'A cinematic portfolio for film producer Peter Salling that puts the films first, with content managed in a built-in admin panel.',
      },
      {
        id: 'nordwear',
        client: 'Nordwear',
        industry: 'Fashion',
        category: 'website',
        href: '/cases/nordwear',
        imageSrc: '/cases/nordwear/mobile--6-7.jpg',
        imageAlt: 'Nordwear case',
        panelHoverColor: '#f0e0e4',
        keywords: ['Website', 'UX-design', 'Branding', 'Development'],
        description:
          'A sharp digital platform for a modern apparel brand focused on performance and a strong visual identity.',
      },
      {
        id: 'fresh-cut',
        client: 'Fresh Cut',
        industry: 'Beauty',
        category: 'website',
        href: '/cases/fresh-cut',
        imageSrc: '/cases/fresh-cut/thumbnail--6-7.jpg',
        imageAlt: 'Fresh Cut case',
        keywords: ['Website', 'Design', 'Content', 'SEO'],
        description:
          'A vibrant website for a local salon with a clear booking flow and an expression that matches the brand.',
      },
      {
        id: 'det-kollektive-klaedeskab',
        client: 'Det Kollektive Klædeskab',
        industry: 'Circular fashion',
        category: 'website',
        href: '/cases/det-kollektive-klaedeskab',
        imageSrc: '/cases/det-kollektive-klaedeskab/forside--6-7.webp',
        imageAlt: 'Det Kollektive Klædeskab case',
        keywords: ['Website', 'Redesign', 'UX design', 'Development'],
        description:
          'A redesign concept for a shared wardrobe in Copenhagen, where members borrow, swap and share clothes using points.',
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

export interface CaseItemSummary {
  client: string
  industry: string
  category: CaseCategory
  keywords: string[]
}

/** Client, industry, category and keywords for one case, used to build the case-detail hero and overview. */
export function getCaseItemSummary(
  locale: Locale,
  caseId: string,
): CaseItemSummary | null {
  const item = casesPageContent[locale].items.find((entry) => entry.id === caseId)
  if (!item) return null

  return { client: item.client, industry: item.industry, category: item.category, keywords: [...item.keywords] }
}
