import { ContactSection, PricingHeroSection, PricingSection } from '../components/sections'

export function PricingPage() {
  return (
    <main className="page-surface bg-background">
      <PricingHeroSection />
      <PricingSection />
      <ContactSection />
    </main>
  )
}
