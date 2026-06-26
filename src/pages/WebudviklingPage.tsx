import { ContactSection, FaqSection, ProcessSection, SplitPanelSection, WhyChooseUsSection } from '../components/sections'
import { useLocale } from '../context/LocaleContext'
import { getWebudviklingContent } from '../data/webudvikling'

export function WebudviklingPage() {
  const { locale } = useLocale()
  const { splitPanel, whyChooseUs, process, faq } = getWebudviklingContent(locale)

  return (
    <main className="page-surface bg-background">
      <ContactSection surface="plain" />
      <SplitPanelSection content={splitPanel} />
      <WhyChooseUsSection content={whyChooseUs} />
      <ProcessSection content={process} />
      <FaqSection content={faq} />
    </main>
  )
}
