import { PageEntrance } from '../components/layout/PageEntrance'
import { PageMeta } from '../components/layout'
import { PrivacyPolicyPageSection } from '../components/sections'
import { useLocale } from '../context/LocaleContext'
import { getPageMetaContent } from '../data/pageMeta'

export function PrivacyPolicyPage() {
  const { locale } = useLocale()
  const { titles } = getPageMetaContent(locale)

  return (
    <main id="main-content" className="page-surface bg-background">
      <PageEntrance />
      <PageMeta title={titles.privacyPolicy} />
      <PrivacyPolicyPageSection />
    </main>
  )
}
