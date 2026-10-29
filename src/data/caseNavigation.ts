import type { CaseDetailGalleryImage } from '../types/caseDetail'
import type { Locale } from './navigation'
import { getCaseGallery } from './caseGallery'
import { getCaseItemSummary } from './cases'

export interface CaseDetailNext {
  href: string
  /** The next case's client name, shown as the big title. */
  name: string
  label: string
  year: string
  image: CaseDetailGalleryImage
  ariaLabel: string
}

export const caseOrder = [
  'peter-salling',
  'nordwear',
  'fresh-cut',
  'det-kollektive-klaedeskab',
  'northline',
  'urban-supply',
] as const

export type CaseSlug = (typeof caseOrder)[number]

const caseYears: Record<CaseSlug, string> = {
  nordwear: '2026',
  'fresh-cut': '2026',
  'peter-salling': '2026',
  'det-kollektive-klaedeskab': '2026',
  northline: '2024',
  'urban-supply': '2024',
}

export function getCaseYear(caseSlug: string): string | null {
  return caseYears[caseSlug as CaseSlug] ?? null
}

const nextCaseLabels: Record<Locale, string> = {
  da: 'Se næste projekt',
  en: 'View next project',
}

const nextCaseAriaLabels: Record<Locale, Record<(typeof caseOrder)[number], string>> = {
  da: {
    nordwear: 'Se næste case: Nordwear',
    'fresh-cut': 'Se næste case: Fresh Cut',
    'peter-salling': 'Se næste case: Peter Salling',
    'det-kollektive-klaedeskab': 'Se næste case: Det Kollektive Klædeskab',
    northline: 'Se næste case: Northline',
    'urban-supply': 'Se næste case: Urban Supply',
  },
  en: {
    nordwear: 'View next case: Nordwear',
    'fresh-cut': 'View next case: Fresh Cut',
    'peter-salling': 'View next case: Peter Salling',
    'det-kollektive-klaedeskab': 'View next case: Det Kollektive Klædeskab',
    northline: 'View next case: Northline',
    'urban-supply': 'View next case: Urban Supply',
  },
}

/** Links to the cases before and after this one, in caseOrder (wrapping around at the ends). */
export function getAdjacentCaseHrefs(
  currentSlug: string,
): { previous: string; next: string } | null {
  const currentIndex = caseOrder.indexOf(currentSlug as CaseSlug)
  if (currentIndex === -1) return null

  const at = (offset: number) =>
    `/cases/${caseOrder[(currentIndex + offset + caseOrder.length) % caseOrder.length]}`
  return { previous: at(-1), next: at(1) }
}

/**
 * The next case's preview card. `mainImage` resolves a case's main image (the
 * image at the top of its page); without it the card falls back to the first
 * gallery image.
 */
export function getNextCasePreview(
  locale: Locale,
  currentSlug: string,
  mainImage?: (caseSlug: string) => CaseDetailGalleryImage | null,
): CaseDetailNext | null {
  const currentIndex = caseOrder.indexOf(currentSlug as (typeof caseOrder)[number])
  if (currentIndex === -1) return null

  const nextSlug = caseOrder[(currentIndex + 1) % caseOrder.length]
  const gallery = getCaseGallery(locale, nextSlug)
  if (!gallery) return null

  return {
    href: `/cases/${nextSlug}`,
    name: getCaseItemSummary(locale, nextSlug)?.client ?? nextSlug,
    label: nextCaseLabels[locale],
    year: caseYears[nextSlug],
    image: mainImage?.(nextSlug) ?? gallery.horizontalTop,
    ariaLabel: nextCaseAriaLabels[locale][nextSlug],
  }
}
