import {
  CasesSection,
  ConceptSection,
  ContactSection,
  FeatureSection,
  Hero,
  PartnershipSection,
} from '../components/sections'

export function HomePage() {
  return (
    <main className="page-surface bg-home-page overflow-x-clip">
      <Hero />
      <FeatureSection />
      <CasesSection />
      <ConceptSection />
      <PartnershipSection />
      <ContactSection />
    </main>
  )
}
