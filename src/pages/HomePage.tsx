import { PageMeta } from '../components/layout'
import {
  AddedValueSection,
  CasesSection,
  ContactSection,
  FaqSection,
  Hero,
  PartnershipSection,
  PricingPlansSection,
  SplitPanelSection,
  WhyChooseUsSection,
} from '../components/sections'
import { useLocale } from '../context/LocaleContext'
import { getWebudviklingContent } from '../data/webudvikling'

export function HomePage() {
  const { locale } = useLocale()
  // The split panel, the "why choose me" marquee and the FAQ were moved here
  // from /webudvikling; their copy still lives in data/webudvikling.ts.
  const { splitPanel, whyChooseUs, faq } = getWebudviklingContent(locale)

  return (
    <main className="page-surface bg-home-page overflow-x-clip">
      <PageMeta />
      {/* The hero stays pinned inside this wrapper while the cases section
          rolls up over it; the wrapper ends where the cases do. */}
      <div>
        <Hero />
        <CasesSection />
      </div>
      <AddedValueSection />
      <SplitPanelSection content={splitPanel} />
      <WhyChooseUsSection content={whyChooseUs} />
      <PartnershipSection />
      <PricingPlansSection />
      <FaqSection content={faq} />
      <ContactSection />
    </main>
  )
}
