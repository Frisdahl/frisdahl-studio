import { ContactSection, FaqSection, SplitPanelSection } from '../components/sections'
import { useLocale } from '../context/LocaleContext'
import { getWebudviklingContent } from '../data/webudvikling'

export function WebudviklingPage() {
  const { locale } = useLocale()
  const { splitPanel, faq } = getWebudviklingContent(locale)

  return (
    <main className="page-surface bg-background">
      <ContactSection surface="plain" />
      <SplitPanelSection content={splitPanel} />
      <FaqSection content={faq} />
    </main>
  )
}
