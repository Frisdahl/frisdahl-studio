import { useLocale } from '../../context/LocaleContext'
import { getHomeContent } from '../../data/home'
import { Container } from '../ui'
import { PricingCards } from './PricingCards'

// The three packages, shown on the homepage. The nav's "Priser" link scrolls here.
export function PricingPlansSection() {
  const { locale } = useLocale()
  const { pricingPage } = getHomeContent(locale)
  const { hero } = pricingPage

  return (
    <section id="priser" className="pricing-hero" aria-labelledby="pricing-hero-title">
      <Container fullWidth>
        <div className="pricing-hero-grid">
          <div className="pricing-hero-grid-layout">
            <div className="pricing-hero-grid-content">
              <div className="pricing-hero-header">
                <p className="pricing-hero-eyebrow">{hero.eyebrow}</p>
                <h2 id="pricing-hero-title" className="pricing-hero-title">
                  {hero.headlineLine1}
                  {hero.headlineLine2 ? (
                    <>
                      <br />
                      {hero.headlineLine2}
                    </>
                  ) : null}
                </h2>
              </div>

              <PricingCards />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
