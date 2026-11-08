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
        imageSrc: '/cases/peter-salling/main-higgs--16-9.webp',
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
        imageSrc: '/cases/nordwear/main-higgs--16-9.webp',
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
        imageSrc: '/cases/fresh-cut/official--6-7.webp',
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
        imageSrc: '/cases/det-kollektive-klaedeskab/official--6-7.webp',
        imageAlt: 'Det Kollektive Klædeskab case',
        keywords: ['Website', 'Redesign', 'UX-design', 'Udvikling'],
        description:
          'Et redesign-koncept til en fælles garderobe i København, hvor medlemmer låner, bytter og deler tøj med point.',
      },
    ],
  },
} as const satisfies Record<Locale, CasesPageContent>

export function getCasesResultsCountLabel(count: number): string {
  return count === 1 ? '1 case vist' : `${count} cases vist`
}

/**
 * Cases kept in the data but left out of every list, next-project link and page route
 * for now. Remove an id here to bring the case back.
 */
export const hiddenCaseIds: readonly string[] = ['fresh-cut', 'det-kollektive-klaedeskab']

export function getCasesPageContent(locale: Locale = defaultLocale): CasesPageContent {
  const content = casesPageContent[locale]
  return { ...content, items: content.items.filter((item) => !hiddenCaseIds.includes(item.id)) }
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
