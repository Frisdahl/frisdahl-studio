import {
  CasesSection,
  ConceptSection,
  ContactSection,
  FeatureSection,
  Hero,
  HeroDecorationLines,
  PartnershipSection,
  PromoSection,
} from '../components/sections'

export function HomePage() {
  return (
    <main className="overflow-x-clip">
      <div className="home-hero-promo">
        <HeroDecorationLines />
        <Hero showDecorations={false} showDecorationDots />
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
