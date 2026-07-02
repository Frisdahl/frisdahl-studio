export type PrivacyPolicyBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'bullets'; items: string[] }

export interface PrivacyPolicySection {
  title: string
  blocks: PrivacyPolicyBlock[]
}

export interface PrivacyPolicyPageContent {
  eyebrow: string
  title: string
  lastUpdatedLabel: string
  lastUpdated: string
  intro: string
  sections: PrivacyPolicySection[]
}
