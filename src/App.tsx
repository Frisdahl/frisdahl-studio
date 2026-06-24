import { LocaleProvider } from './context/LocaleContext'
import { Footer, Navbar } from './components/layout'
import { Hero, PromoSection, FeatureSection, CasesSection, PartnershipSection, ConceptSection, ContactSection } from './components/sections'

function App() {
  return (
    <LocaleProvider>
      <Navbar />
      <main>
        <Hero />
        <PromoSection />
        <FeatureSection />
        <CasesSection />
        <ConceptSection />
        <PartnershipSection />
        <ContactSection />
      </main>
      <Footer />
    </LocaleProvider>
  )
}

export default App
