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
    <main className="page-surface bg-home-page overflow-x-clip">
      <div className="home-hero-promo">
        <Hero />
        <PromoSection className="promo-section-home" />
      </div>
      <FeatureSection />
      <CasesSection />
      <ConceptSection />
      <PartnershipSection />
      <ContactSection />
    </main>
  )
}
