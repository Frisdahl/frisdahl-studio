import {
  CasesSection,
  ConceptSection,
  ContactSection,
  FeatureSection,
  Hero,
  PartnershipSection,
  PromoSection,
} from '../components/sections'

export function HomePage() {
  return (
    <main>
      <Hero />
      <PromoSection />
      <FeatureSection />
      <CasesSection />
      <ConceptSection />
      <PartnershipSection />
      <ContactSection />
    </main>
  )
}
