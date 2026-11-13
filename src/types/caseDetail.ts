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
  /** The main image as a clip: plays in the hero image while it is on screen. */
  video?: CaseDetailGalleryVideo
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

/** One measured result, e.g. page speed or an SEO score. */
export interface CaseDetailMetric {
  label: string
  /** The figure itself, already formatted: '0,4 s', '100'. */
  value: string
  /** What was measured, in a short sentence. */
  detail: string
}

/** Measured performance of the live site: speed, stability, quality and SEO. */
export interface CaseDetailResults {
  title: string
  description: string
  metrics: CaseDetailMetric[]
  /** How and when it was measured. */
  note: string
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

/** A silent looping clip that plays in place of a still: the device stays still, only its screen plays. */
export interface CaseDetailGalleryVideo {
  src: string
  /** Shown until the clip plays, and instead of it when the visitor prefers reduced motion. */
  poster: string
}

export interface CaseDetailGalleryImage {
  imageSrc: string | null
  imageAlt: string
  /** When set, the figure plays this clip instead of showing imageSrc (which other places still use). */
  video?: CaseDetailGalleryVideo
  placeholderClassName?: string
  /** Frame ratio when the image isn't the slot's default (16:9 or 5:6), e.g. '5 / 4'. */
  aspectRatio?: string
  /** For images with a transparent background: no frame colour or shadow behind them. */
  transparent?: boolean
}

export interface CaseDetailGallery {
  ariaLabel: string
  /** The solid colour behind images with a transparent background (the project's primary colour), e.g. '#0C0C0C'. */
  mockupBackground?: string
  /** A pair shown on its own right under the overview, before the columns. */
  introPair?: [CaseDetailGalleryImage, CaseDetailGalleryImage]
  /** One full-width image shown under the colour palette, at the end of the page. */
  afterPalette?: CaseDetailGalleryImage
  /** Left, middle and right image of the home page hover (otherwise the first three images of the page). */
  hoverTrio?: [CaseDetailGalleryImage, CaseDetailGalleryImage, CaseDetailGalleryImage]
  horizontalTop: CaseDetailGalleryImage
  /** Replaces horizontalTop with a two-column pair, shown above the columns
      after introPair. horizontalTop still supplies the next-case preview image. */
  horizontalTopPair?: [CaseDetailGalleryImage, CaseDetailGalleryImage]
  /** True when horizontalTop only supplies the next-case preview image and is not shown in the gallery. */
  horizontalTopHidden?: boolean
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
  results?: CaseDetailResults
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
