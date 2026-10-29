import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Footer, Navbar, PageTransition, ScrollToTop, SmoothScroll } from './components/layout'
import { ContactDrawerProvider } from './context/ContactDrawerProvider'
import { LocaleProvider } from './context/LocaleProvider'
import {
  CASES_PATH,
  MEET_US_PATH,
  PRICING_PATH,
  PRIVACY_POLICY_PATH,
  PROCESS_PATH,
} from './lib/routes'
import { HomePage } from './pages/HomePage'

// The homepage is where most visits start, so it ships in the main bundle.
// Every other page is its own chunk, loaded when its route is first visited.
const CasesPage = lazy(() => import('./pages/CasesPage').then((m) => ({ default: m.CasesPage })))
const CaseDetailPage = lazy(() =>
  import('./pages/CaseDetailPage').then((m) => ({ default: m.CaseDetailPage })),
)
const MeetUsPage = lazy(() => import('./pages/MeetUsPage').then((m) => ({ default: m.MeetUsPage })))
const ProcessPage = lazy(() => import('./pages/ProcessPage').then((m) => ({ default: m.ProcessPage })))
const PrivacyPolicyPage = lazy(() =>
  import('./pages/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage })),
)
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
)

function App() {
  return (
    <LocaleProvider>
      <ContactDrawerProvider>
        <BrowserRouter>
          <SmoothScroll />
          <ScrollToTop />
          <Navbar />
          <PageTransition />
          {/* The page itself: Navbar scales and slides this aside to reveal the menu. */}
          <div className="page-shell">
            {/* A screen-tall placeholder keeps the footer below the fold while a page chunk loads. */}
            <Suspense fallback={<div className="min-h-screen" aria-busy="true" />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                {/* Old pricing links: the pricing section is gone, so land on the homepage. */}
                <Route path={PRICING_PATH} element={<Navigate to="/" replace />} />
                <Route path={CASES_PATH} element={<CasesPage />} />
                <Route path={`${CASES_PATH}/:caseSlug`} element={<CaseDetailPage />} />
                <Route path={MEET_US_PATH} element={<MeetUsPage />} />
                <Route path={PROCESS_PATH} element={<ProcessPage />} />
                <Route path={PRIVACY_POLICY_PATH} element={<PrivacyPolicyPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
            <Footer />
          </div>
        </BrowserRouter>
      </ContactDrawerProvider>
    </LocaleProvider>
  )
}

export default App
