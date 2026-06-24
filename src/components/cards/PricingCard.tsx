import { HiCheck } from 'react-icons/hi2'
import { Button } from '../ui/Button'

export interface PricingPlan {
  id: string
  title: string
  subtitle: string
  description: string
  price: string
  cta: string
  ctaAction: 'book' | 'contact'
  featured?: boolean
  badge?: string | null
  features: readonly string[]
}

export interface PricingCardProps {
  plan: PricingPlan
  includesLabel: string
  onCtaClick: () => void
}

export function PricingCard({ plan, includesLabel, onCtaClick }: PricingCardProps) {
  return (
    <article className={`pricing-card ${plan.featured ? 'pricing-card-featured' : ''}`}>
      {plan.badge ? <span className="pricing-card-badge">{plan.badge}</span> : null}

      <header className="pricing-card-header">
        <h3 className="pricing-card-title">{plan.title}</h3>
        <p className="pricing-card-subtitle">{plan.subtitle}</p>
      </header>

      <p className="pricing-card-description">{plan.description}</p>

      <p className="pricing-card-price">{plan.price}</p>

      <Button type="button" className="pricing-card-cta" onClick={onCtaClick}>
        {plan.cta}
      </Button>

      <div className="pricing-card-features">
        <p className="pricing-card-features-label">{includesLabel}</p>
        <ul className="pricing-card-features-list">
          {plan.features.map((feature) => (
            <li key={feature} className="pricing-card-feature">
              <HiCheck className="pricing-card-feature-icon" aria-hidden="true" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
