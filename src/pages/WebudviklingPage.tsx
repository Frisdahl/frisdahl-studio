import { PageMeta } from '../components/layout'
import { ContactSection, FaqSection, ProcessSliderSection, SplitPanelSection, WhyChooseUsSection } from '../components/sections'
import { useLocale } from '../context/LocaleContext'
import { getPageMetaContent } from '../data/pageMeta'
import { getWebudviklingContent } from '../data/webudvikling'

export function WebudviklingPage() {
  const { locale } = useLocale()
  const { splitPanel, whyChooseUs, process, faq } = getWebudviklingContent(locale)
  const { titles } = getPageMetaContent(locale)

  return (
    <main className="page-surface bg-background">
      <PageMeta title={titles.webDevelopment} />
      {/* The page opens with the shared contact section, so the page heading is
          visually hidden to keep the visible design unchanged. */}
      <h1 className="sr-only">{titles.webDevelopment}</h1>
      <ContactSection surface="plain" />
      <SplitPanelSection content={splitPanel} />
      <WhyChooseUsSection content={whyChooseUs} />
      <ProcessSliderSection content={process} />
      <FaqSection content={faq} />
    </main>
  )
}
