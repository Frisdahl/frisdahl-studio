import type { CaseDetailGalleryImage } from '../types/caseDetail'
import type { Locale } from './navigation'
import { getCaseGallery } from './caseGallery'

export interface CaseDetailNext {
  href: string
  label: string
  year: string
  image: CaseDetailGalleryImage
  ariaLabel: string
}

const caseOrder = [
  'nordwear',
  'fresh-cut',
  'atelier-noir',
  'forma-studio',
  'northline',
  'urban-supply',
] as const

const caseYears: Record<(typeof caseOrder)[number], string> = {
  nordwear: '2026',
  'fresh-cut': '2026',
  'atelier-noir': '2025',
  'forma-studio': '2025',
  northline: '2024',
  'urban-supply': '2024',
}

const nextCaseLabels: Record<Locale, string> = {
  da: 'Se næste case',
  en: 'View next case',
}

const nextCaseAriaLabels: Record<Locale, Record<(typeof caseOrder)[number], string>> = {
  da: {
    nordwear: 'Se næste case: Nordwear',
    'fresh-cut': 'Se næste case: Fresh Cut',
    'atelier-noir': 'Se næste case: Atelier Noir',
    'forma-studio': 'Se næste case: Forma Studio',
    northline: 'Se næste case: Northline',
    'urban-supply': 'Se næste case: Urban Supply',
  },
  en: {
    nordwear: 'View next case: Nordwear',
    'fresh-cut': 'View next case: Fresh Cut',
    'atelier-noir': 'View next case: Atelier Noir',
    'forma-studio': 'View next case: Forma Studio',
    northline: 'View next case: Northline',
    'urban-supply': 'View next case: Urban Supply',
  },
}

export function getNextCasePreview(
  locale: Locale,
  currentSlug: string,
): CaseDetailNext | null {
  const currentIndex = caseOrder.indexOf(currentSlug as (typeof caseOrder)[number])
  if (currentIndex === -1) return null

  const nextSlug = caseOrder[(currentIndex + 1) % caseOrder.length]
  const gallery = getCaseGallery(locale, nextSlug)
  if (!gallery) return null

  return {
    href: `/cases/${nextSlug}`,
    label: nextCaseLabels[locale],
    year: caseYears[nextSlug],
    image: gallery.horizontalTop,
    ariaLabel: nextCaseAriaLabels[locale][nextSlug],
  }
}
