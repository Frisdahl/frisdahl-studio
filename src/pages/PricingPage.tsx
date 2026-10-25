import { PageMeta } from '../components/layout'
import { ContactSection, PricingHeroSection, PricingSection } from '../components/sections'
import { useLocale } from '../context/LocaleContext'
import { getHomeContent } from '../data/home'
import { getPageMetaContent } from '../data/pageMeta'

export function PricingPage() {
  const { locale } = useLocale()
  const { titles } = getPageMetaContent(locale)
  const { pricingPage } = getHomeContent(locale)

  return (
    <main className="page-surface bg-background">
      <PageMeta title={titles.pricing} description={pricingPage.hero.description} />
      <PricingHeroSection />
      <PricingSection />
      <ContactSection />
    </main>
  )
}
