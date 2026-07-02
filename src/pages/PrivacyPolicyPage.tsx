import { ContactSection, PrivacyPolicyPageSection } from '../components/sections'

export function PrivacyPolicyPage() {
  return (
    <main className="page-surface bg-background">
      <PrivacyPolicyPageSection />
      <ContactSection surface="plain" />
    </main>
  )
}
