import { useLocale } from '../../context/LocaleContext'
import { getHomeContent } from '../../data/home'
import { Container } from '../ui'
import { PricingCards } from './PricingCards'

export function PricingHeroSection() {
  const { locale } = useLocale()
  const { pricingPage } = getHomeContent(locale)
  const { hero } = pricingPage

  return (
    <section className="pricing-hero" aria-labelledby="pricing-hero-title">
      <Container fullWidth>
        <div className="pricing-hero-grid">
          <div className="pricing-hero-grid-layout">
            <div className="pricing-hero-grid-content">
              <div className="pricing-hero-header">
                <p className="pricing-hero-eyebrow">{hero.eyebrow}</p>
                <h1 id="pricing-hero-title" className="pricing-hero-title">
                  {hero.headlineLine1}
                  {hero.headlineLine2 ? (
                    <>
                      <br />
                      {hero.headlineLine2}
                    </>
                  ) : null}
                </h1>
              </div>

              <PricingCards />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
