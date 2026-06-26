export interface FaqItem {
  question: string
  answer: string
}

export interface FaqContent {
  eyebrow: string
  title: string
  items: FaqItem[]
}
