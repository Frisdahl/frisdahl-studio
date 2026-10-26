import { PageMeta } from '../components/layout'
import {
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
      <Hero />
      <SplitPanelSection content={splitPanel} />
      <WhyChooseUsSection content={whyChooseUs} />
      <CasesSection />
      <PartnershipSection />
      <PricingPlansSection />
      <FaqSection content={faq} />
      <ContactSection />
    </main>
  )
}
