import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Footer, Navbar, ScrollToTop, SmoothScroll } from './components/layout'
import { ContactDrawerProvider } from './context/ContactDrawerProvider'
import { LocaleProvider } from './context/LocaleProvider'
import {
  CASES_PATH,
  MEET_US_PATH,
  PRICING_PATH,
  PRIVACY_POLICY_PATH,
  PROCESS_PATH,
} from './lib/routes'
import {
  CaseDetailPage,
  CasesPage,
  HomePage,
  MeetUsPage,
  NotFoundPage,
  PrivacyPolicyPage,
  ProcessPage,
} from './pages'

function App() {
  return (
    <LocaleProvider>
      <ContactDrawerProvider>
        <BrowserRouter>
          <SmoothScroll />
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* The pricing page was folded into the homepage; keep old links working. */}
            <Route path={PRICING_PATH} element={<Navigate to="/#priser" replace />} />
            <Route path={CASES_PATH} element={<CasesPage />} />
            <Route path={`${CASES_PATH}/:caseSlug`} element={<CaseDetailPage />} />
            <Route path={MEET_US_PATH} element={<MeetUsPage />} />
            <Route path={PROCESS_PATH} element={<ProcessPage />} />
            <Route path={PRIVACY_POLICY_PATH} element={<PrivacyPolicyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ContactDrawerProvider>
    </LocaleProvider>
  )
}

export default App
