import type { CasesHeroSlide } from './cases'

export interface CaseDetailHeroMeta {
  label: string
  value?: string
  href?: string
}

export interface CaseDetailHero {
  eyebrow: string
  title: string
  /** The case's client name alone, shown as the hero heading. */
  name: string
  description: string
  sliderAriaLabel: string
  slides: CasesHeroSlide[]
  meta: CaseDetailHeroMeta[]
}

export interface CaseDetailColumn {
  title: string
  paragraphs: [string, string]
}

export interface CaseDetailGalleryImage {
  imageSrc: string | null
  imageAlt: string
  placeholderClassName?: string
}

export interface CaseDetailGallery {
  ariaLabel: string
  horizontalTop: CaseDetailGalleryImage
  verticalPairTop: [CaseDetailGalleryImage, CaseDetailGalleryImage]
  verticalPairBottom: [CaseDetailGalleryImage, CaseDetailGalleryImage]
  horizontalBottom: CaseDetailGalleryImage
}

export interface CaseDetailContent {
  id: string
  hero: CaseDetailHero
  columns: [CaseDetailColumn, CaseDetailColumn, CaseDetailColumn]
  gallery: CaseDetailGallery
  nextCase: CaseDetailNext
}

export interface CaseDetailNext {
  href: string
  label: string
  year: string
  image: CaseDetailGalleryImage
  ariaLabel: string
}
