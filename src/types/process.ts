export interface ProcessStep {
  title: string
  description: string
  keywords: string[]
}

export interface ProcessContent {
  eyebrow: string
  title: string
  steps: ProcessStep[]
}
