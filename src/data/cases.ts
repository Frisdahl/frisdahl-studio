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
    // A newline in the title is a line break in the heading.
    title: 'Gode idéer.\nDigitale oplevelser.',
    description:
      'Produkter, platforme og brands, jeg har designet og bygget. Filtrer efter ydelse eller branche.',
    filters: {
      allCases: 'Alle cases',
      byService: 'Efter ydelse',
      byIndustry: 'Efter branche',
      all: 'Alle',
      // A case matches a service when it carries one of these keywords.
      services: [
        { id: 'web-design', label: 'Web Design', keywords: ['Design', 'Redesign'] },
        { id: 'ui-design', label: 'UI Design', keywords: ['Design', 'Redesign'] },
        { id: 'ux-research', label: 'UX Research', keywords: ['UX-design'] },
        { id: 'webudvikling', label: 'Webudvikling', keywords: ['Udvikling'] },
        { id: 'branding', label: 'Branding', keywords: ['Branding'] },
      ],
      // A case matches an industry by its own industry label.
      industries: [
        { id: 'mode', label: 'Mode', industry: 'Mode' },
        { id: 'moebler', label: 'Møbler', industry: 'Møbler' },
        { id: 'movie-industry', label: 'Movie Industry', industry: 'Film' },
        { id: 'musik', label: 'Musik', industry: 'Musik' },
      ],
    },
    items: [
      {
        id: 'peter-salling',
        client: 'Peter Salling',
        industry: 'Film',
        category: 'website',
        href: '/cases/peter-salling',
        imageSrc: '/cases/peter-salling/main--16-9.webp',
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
        imageSrc: '/cases/nordwear/main-v2--16-9.webp',
        imageAlt: 'Nordwear case',
        panelHoverColor: '#f0e0e4',
        keywords: ['Website', 'UX-design', 'Branding', 'Udvikling'],
        description:
          'En skarp digital platform til et moderne tøjbrand med fokus på performance og en stærk visuel identitet.',
      },
      {
        id: 'rethink-furniture',
        client: 'Rethink Furniture',
        industry: 'Møbler',
        category: 'website',
        href: '/cases/rethink-furniture',
        imageSrc: '/cases/rethink-furniture/macbook-main--4-3.webp',
        imageAlt: 'Rethink Furniture case',
        keywords: ['Website', 'Design', 'Udvikling', 'Animation'],
        description:
          'En webshop til et dansk møbelbrand, hvor rolige animationer og store billeder får håndværket til at stå i centrum.',
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
        id: 'offscript',
        client: 'OFFSCRIPT®',
        industry: 'Musik',
        category: 'website',
        href: '/cases/offscript',
        imageSrc: '/cases/offscript/mockup--4-3.webp',
        imageAlt: 'OFFSCRIPT® case',
        keywords: ['Website', 'Design', 'Udvikling', 'Animation'],
        description:
          'Et redaktionelt site til et uafhængigt kunstnerbureau med store portrætter, store typografiske flader og rolig bevægelse.',
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
