import { PageMeta } from '../components/layout'
import { AddedValueSection, CasesSection, Hero, ReviewsSection, StudioStatement } from '../components/sections'

export function HomePage() {
  return (
    <main id="main-content" className="page-surface home-page bg-home-page overflow-x-clip">
      <PageMeta />
      <Hero />
      <StudioStatement />
      <CasesSection />
      <AddedValueSection />
      <ReviewsSection />
    </main>
  )
}
