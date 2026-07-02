export interface ProcessStep {
  title: string
  description: string
  keywords: string[]
}

export type ProcessSliderMediaLayout = 'single' | 'horizontal-reveal' | 'dual-portrait'

export interface ProcessSliderStep extends ProcessStep {
  imageSrc: string
  imageAlt: string
  layout?: ProcessSliderMediaLayout
  mediaPosition?: 'left' | 'right'
  imageOnly?: boolean
  imageSrcSecondary?: string
  imageAltSecondary?: string
}

export interface ProcessContent {
  eyebrow: string
  title: string
  steps: ProcessStep[]
}

export interface ProcessSliderContent {
  label: string
  steps: ProcessSliderStep[]
  sliderAriaLabel: string
  sliderStatus: string
}

export interface ProcessPageContent {
  eyebrow: string
  title: string
  description: string
  steps: ProcessStep[]
}
