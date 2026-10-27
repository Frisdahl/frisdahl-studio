import { HiPlus } from 'react-icons/hi2'

export interface PricingPlan {
  id: string
  eyebrow: string
  title: string
  cta: string
  ctaAction: 'book' | 'contact'
  featured?: boolean
  features: readonly string[]
}

export interface PricingCardProps {
  plan: PricingPlan
  onCtaClick: () => void
}

export function PricingCard({ plan, onCtaClick }: PricingCardProps) {
  return (
    <article className={`pricing-card ${plan.featured ? 'pricing-card-featured' : ''}`}>
      <div className="pricing-card-intro">
        <p className="pricing-card-eyebrow">
          <span className="pricing-card-marker" aria-hidden="true" />
          {plan.eyebrow}
        </p>
        <h3 className="pricing-card-title">{plan.title}</h3>
      </div>

      <ul className="pricing-card-features">
        {plan.features.map((feature) => (
          <li key={feature} className="pricing-card-feature">
            {feature}
          </li>
        ))}
      </ul>

      <div className="pricing-card-footer">
        <div className="pricing-card-actions">
          <button type="button" className="pricing-card-action-primary" onClick={onCtaClick}>
            {plan.cta}
          </button>
          <button
            type="button"
            className="pricing-card-action-icon"
            onClick={onCtaClick}
            aria-label={plan.cta}
          >
            <HiPlus className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  )
}
