import { useNavigate } from 'react-router-dom'
import { PricingCard } from '../cards/PricingCard'
import { useContactDrawer } from '../../context/ContactDrawerContext'
import { useLocale } from '../../context/LocaleContext'
import { getHomeContent } from '../../data/home'
import { navigateWithTransition } from '../../lib/pageTransition'
import { CONTACT_PATH } from '../../lib/routes'

export function PricingCards() {
  const { locale } = useLocale()
  const { pricingPage } = getHomeContent(locale)
  const { plans } = pricingPage
  const { openDrawer } = useContactDrawer()
  const navigate = useNavigate()

  return (
    <ul className="pricing-cards-grid">
      {plans.items.map((plan) => (
        <li key={plan.id} className={plan.featured ? 'pricing-cards-item-featured' : undefined}>
          {/* Booking still opens its drawer; writing goes to the contact page. */}
          <PricingCard
            plan={plan}
            onCtaClick={() =>
              plan.ctaAction === 'book'
                ? openDrawer('book')
                : navigateWithTransition(CONTACT_PATH, navigate)
            }
          />
        </li>
      ))}
    </ul>
  )
}
