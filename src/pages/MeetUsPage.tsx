import { PageMeta } from '../components/layout'
import { ContactSection, MeetUsPageSection } from '../components/sections'
import { useLocale } from '../context/LocaleContext'
import { getPageMetaContent } from '../data/pageMeta'

export function MeetUsPage() {
  const { locale } = useLocale()
  const { titles } = getPageMetaContent(locale)

  return (
    <main className="page-surface bg-background">
      <PageMeta title={titles.meetUs} />
      <MeetUsPageSection />
      <ContactSection />
    </main>
  )
}
