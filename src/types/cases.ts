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

export interface CaseFilter {
  id: CaseCategory
  label: string
}

export interface CasesPageContent {
  eyebrow: string
  title: string
  filtersAriaLabel: string
  items: CaseItem[]
  filters: CaseFilter[]
}
