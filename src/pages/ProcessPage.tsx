import { PageMeta } from '../components/layout'
import { ContactSection, ProcessPageSection } from '../components/sections'
import { useLocale } from '../context/LocaleContext'
import { getPageMetaContent } from '../data/pageMeta'

export function ProcessPage() {
  const { locale } = useLocale()
  const { titles } = getPageMetaContent(locale)

  return (
    <main className="page-surface bg-background">
      <PageMeta title={titles.process} />
      <ProcessPageSection />
      <ContactSection />
    </main>
  )
}
