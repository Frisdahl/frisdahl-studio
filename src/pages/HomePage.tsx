import { PageMeta } from '../components/layout'
import { AddedValueSection, CasesSection, Hero, ReviewsSection } from '../components/sections'

export function HomePage() {
  return (
    <main className="page-surface bg-home-page overflow-x-clip">
      <PageMeta />
      {/* The hero stays pinned inside this wrapper while the cases section
          rolls up over it; the wrapper ends where the cases do. */}
      <div>
        <Hero />
        <CasesSection />
      </div>
      <ReviewsSection />
      <AddedValueSection />
    </main>
  )
}
