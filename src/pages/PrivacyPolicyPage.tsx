import { PageMeta } from '../components/layout'
import { ContactSection, PrivacyPolicyPageSection } from '../components/sections'
import { useLocale } from '../context/LocaleContext'
import { getPageMetaContent } from '../data/pageMeta'

export function PrivacyPolicyPage() {
  const { locale } = useLocale()
  const { titles } = getPageMetaContent(locale)

  return (
    <main className="page-surface bg-background">
      <PageMeta title={titles.privacyPolicy} />
      <PrivacyPolicyPageSection />
      <ContactSection surface="plain" />
    </main>
  )
}
