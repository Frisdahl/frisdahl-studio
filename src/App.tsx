import { LocaleProvider } from './context/LocaleContext'
import { Navbar } from './components/layout'
import { Hero, PromoSection, FeatureSection, CasesSection, PartnershipSection } from './components/sections'

function App() {
  return (
    <LocaleProvider>
      <Navbar />
      <main>
        <Hero />
        <PromoSection />
        <FeatureSection />
        <CasesSection />
        <PartnershipSection />
      </main>
    </LocaleProvider>
  )
}

export default App
