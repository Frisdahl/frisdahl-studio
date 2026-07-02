import { PricingCard } from '../cards/PricingCard'
import { useContactDrawer } from '../../context/ContactDrawerContext'
import { useLocale } from '../../context/LocaleContext'
import { getHomeContent } from '../../data/home'

export function PricingCards() {
  const { locale } = useLocale()
  const { pricingPage } = getHomeContent(locale)
  const { plans } = pricingPage
  const { openDrawer } = useContactDrawer()

  return (
    <ul className="pricing-cards-grid">
      {plans.items.map((plan) => (
        <li key={plan.id} className={plan.featured ? 'pricing-cards-item-featured' : undefined}>
          <PricingCard plan={plan} onCtaClick={() => openDrawer(plan.ctaAction)} />
        </li>
      ))}
    </ul>
  )
}
