import { PageMeta } from '../components/layout'
import { CasesPageSection } from '../components/sections'
import { useLocale } from '../context/LocaleContext'
import { getPageMetaContent } from '../data/pageMeta'

export function CasesPage() {
  const { locale } = useLocale()
  const { titles } = getPageMetaContent(locale)

  return (
    <main className="page-surface bg-background">
      <PageMeta title={titles.cases} />
      <CasesPageSection />
    </main>
  )
}
