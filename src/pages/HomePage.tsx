import { PageMeta } from '../components/layout'
import { AddedValueSection, CasesSection, Hero, ReviewsSection } from '../components/sections'

export function HomePage() {
  return (
    <main className="page-surface bg-home-page overflow-x-clip">
      <PageMeta />
      <Hero />
      <CasesSection />
      <ReviewsSection />
      <AddedValueSection />
    </main>
  )
}
