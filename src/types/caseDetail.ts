import type { CasesHeroSlide } from './cases'

export interface CaseDetailHero {
  eyebrow: string
  title: string
  description: string
  sliderAriaLabel: string
  slides: CasesHeroSlide[]
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
