import { PageMeta } from '../components/layout'
import { AddedValueSection, CasesSection, Hero, ReviewsSection } from '../components/sections'

export function HomePage() {
  return (
    <main id="main-content" className="page-surface bg-home-page overflow-x-clip">
      <PageMeta />
      <Hero />
      <CasesSection />
      <ReviewsSection />
      <AddedValueSection />
    </main>
  )
}
