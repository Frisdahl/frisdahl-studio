import type { CasesHeroSlide } from './cases'

export interface CaseDetailHeroMeta {
  label: string
  value?: string
  href?: string
  /** Render the value as the text-and-arrow-chip link button. */
  button?: boolean
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

/** One project detail; cases only list the details they have. */
export interface CaseDetailFact {
  label: string
  value: string
}

/** The two-column overview under the hero: description, then project details. */
export interface CaseDetailOverview {
  descriptionTitle: string
  /** One or more paragraphs. */
  description: string[]
  detailsTitle: string
  details: CaseDetailFact[]
}

/** One colour of a case's palette. */
export interface CaseDetailSwatch {
  name: string
  hex: string
  /** Light label text for dark swatches. */
  dark: boolean
}

export interface CaseDetailPalette {
  title: string
  /** How the case uses its colours. */
  description: string
  swatches: CaseDetailSwatch[]
}

/** The case's typeface, shown as a specimen under the intro images. */
export interface CaseDetailTypography {
  title: string
  /** How the case uses the typeface. */
  description: string
  typefaceLabel: string
  typeface: string
  categoryLabel: string
  category: string
  capHeightLabel: string
  baselineLabel: string
  /** CSS font-family for the specimen; the font is loaded in index.css. */
  fontFamily: string
  /** Cap height as a fraction of the font size, so caps fill the specimen exactly. */
  capHeight: number
}

export interface CaseDetailColumn {
  title: string
  paragraphs: [string, string]
}

export interface CaseDetailGalleryImage {
  imageSrc: string | null
  imageAlt: string
  placeholderClassName?: string
  /** Frame ratio when the image isn't the slot's default (16:9 or 5:6), e.g. '5 / 4'. */
  aspectRatio?: string
  /** For images with a transparent background: no frame colour or shadow behind them. */
  transparent?: boolean
}

export interface CaseDetailGallery {
  ariaLabel: string
  /** A pair shown on its own right under the overview, before the columns. */
  introPair?: [CaseDetailGalleryImage, CaseDetailGalleryImage]
  horizontalTop: CaseDetailGalleryImage
  /** Replaces horizontalTop with a two-column pair, shown above the columns
      after introPair. horizontalTop still supplies the next-case preview image. */
  horizontalTopPair?: [CaseDetailGalleryImage, CaseDetailGalleryImage]
  /** Optional: a case can leave the top pair out. */
  verticalPairTop?: [CaseDetailGalleryImage, CaseDetailGalleryImage]
  /** Optional, like horizontalBottom: without both, the gallery ends after horizontalTop. */
  verticalPairBottom?: [CaseDetailGalleryImage, CaseDetailGalleryImage]
  horizontalBottom?: CaseDetailGalleryImage
  /** One full-width image in place of verticalPairBottom. */
  bottomWide?: CaseDetailGalleryImage
  /** Shown as a two-column pair in horizontalBottom's gallery slot. */
  horizontalBottomPair?: [CaseDetailGalleryImage, CaseDetailGalleryImage]
}

export interface CaseDetailContent {
  id: string
  hero: CaseDetailHero
  overview: CaseDetailOverview
  typography?: CaseDetailTypography
  palette?: CaseDetailPalette
  columns: [CaseDetailColumn, CaseDetailColumn, CaseDetailColumn]
  gallery: CaseDetailGallery
  nextCase: CaseDetailNext
}

export interface CaseDetailNext {
  href: string
  /** The next case's client name, shown as the big title. */
  name: string
  label: string
  year: string
  image: CaseDetailGalleryImage
  ariaLabel: string
}
