import { ContactSection, Hero, PricingSection } from '../components/sections'

export function PricingPage() {
  return (
    <main className="page-surface bg-background">
      <Hero variant="pricing" />
      <PricingSection />
      <ContactSection />
    </main>
  )
}
