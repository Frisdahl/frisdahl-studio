export type CaseCategory = 'website' | 'webshop' | 'grafisk' | 'content' | 'ecommerce'

export interface CaseItem {
  id: string
  client: string
  industry: string
  category: CaseCategory
  href: string
  imageSrc: string | null
  imageAlt: string
  keywords: string[]
  description: string
  panelHoverColor?: string
}

/** "Efter ydelse": a case matches when it has one of these keywords. */
export interface CaseServiceFilter {
  id: string
  label: string
  keywords: string[]
}

/** "Efter branche": a case matches when its industry is this one. */
export interface CaseIndustryFilter {
  id: string
  label: string
  industry: string
}

export interface CasesHeroSlide {
  imageSrc: string | null
  imageAlt: string
  placeholderClassName?: string
}

export interface CasesPageContent {
  title: string
  description: string
  filters: {
    allCases: string
    byService: string
    byIndustry: string
    all: string
    services: CaseServiceFilter[]
    industries: CaseIndustryFilter[]
  }
  items: CaseItem[]
}
