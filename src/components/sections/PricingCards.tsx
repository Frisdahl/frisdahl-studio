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
    <div className="pricing-cards mt-4xl lg:mt-5xl">
      <ul className="pricing-cards-grid">
        {plans.items.map((plan) => (
          <li key={plan.id} className={plan.featured ? 'pricing-cards-item-featured' : undefined}>
            <PricingCard
              plan={plan}
              includesLabel={plans.includesLabel}
              onCtaClick={() => openDrawer(plan.ctaAction)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
