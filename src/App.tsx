import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Footer, Navbar, ScrollProgressButton, ScrollToTop } from './components/layout'
import { ContactDrawerProvider } from './context/ContactDrawerContext'
import { LocaleProvider } from './context/LocaleContext'
import { PRICING_PATH } from './lib/routes'
import { HomePage, PricingPage } from './pages'

function App() {
  return (
    <LocaleProvider>
      <ContactDrawerProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path={PRICING_PATH} element={<PricingPage />} />
          </Routes>
          <Footer />
          <ScrollProgressButton />
        </BrowserRouter>
      </ContactDrawerProvider>
    </LocaleProvider>
  )
}

export default App
