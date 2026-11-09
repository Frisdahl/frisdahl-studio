import type { CaseDetailGalleryImage } from '../types/caseDetail'
import type { Locale } from './navigation'
import { getCaseGallery } from './caseGallery'
import { getCaseItemSummary, hiddenCaseIds } from './cases'

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
] as const

/** The cases that are shown: the order the next-project links follow. */
const visibleCaseOrder = caseOrder.filter((slug) => !hiddenCaseIds.includes(slug))

export type CaseSlug = (typeof caseOrder)[number]

const caseYears: Record<CaseSlug, string> = {
  nordwear: '2026',
  'fresh-cut': '2026',
  'peter-salling': '2026',
  'det-kollektive-klaedeskab': '2026',
}

export function getCaseYear(caseSlug: string): string | null {
  return caseYears[caseSlug as CaseSlug] ?? null
}

const nextCaseLabels: Record<Locale, string> = {
  da: 'Se næste projekt',
}

const nextCaseAriaLabels: Record<Locale, Record<(typeof caseOrder)[number], string>> = {
  da: {
    nordwear: 'Se næste projekt: Nordwear',
    'fresh-cut': 'Se næste projekt: Fresh Cut',
    'peter-salling': 'Se næste projekt: Peter Salling',
    'det-kollektive-klaedeskab': 'Se næste projekt: Det Kollektive Klædeskab',
  },
}

/** Links to the cases before and after this one, in caseOrder (wrapping around at the ends). */
export function getAdjacentCaseHrefs(
  currentSlug: string,
): { previous: string; next: string } | null {
  const currentIndex = visibleCaseOrder.indexOf(currentSlug as CaseSlug)
  if (currentIndex === -1) return null

  const at = (offset: number) =>
    `/cases/${visibleCaseOrder[(currentIndex + offset + visibleCaseOrder.length) % visibleCaseOrder.length]}`
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
  const currentIndex = visibleCaseOrder.indexOf(currentSlug as (typeof visibleCaseOrder)[number])
  if (currentIndex === -1) return null

  const nextSlug = visibleCaseOrder[(currentIndex + 1) % visibleCaseOrder.length]
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
