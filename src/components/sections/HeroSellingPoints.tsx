import type { IconType } from 'react-icons'
import { HiOutlineChartBar, HiOutlineSquares2X2, HiOutlineUsers } from 'react-icons/hi2'
import { useLocale } from '../../context/LocaleContext'
import { getHomeContent } from '../../data/home'

type SellingPointIcon = 'tailored' | 'results' | 'partnership'

const sellingPointIcons: Record<SellingPointIcon, IconType> = {
  tailored: HiOutlineSquares2X2,
  results: HiOutlineChartBar,
  partnership: HiOutlineUsers,
}

interface HeroSellingPointsProps {
  className?: string
}

// The three selling points at the bottom of the hero, below a divider.
export function HeroSellingPoints({ className = '' }: HeroSellingPointsProps) {
  const { locale } = useLocale()
  const { sellingPoints } = getHomeContent(locale)

  return (
    <div className={`selling-points ${className}`.trim()}>
      <hr className="selling-points-divider" />

      <ul className="selling-points-grid" aria-label={sellingPoints.ariaLabel}>
        {sellingPoints.items.map((item) => {
          const Icon = sellingPointIcons[item.icon]

          return (
            <li key={item.title} className="selling-point">
              <Icon className="selling-point-icon" aria-hidden="true" />
              <div className="selling-point-copy">
                <h2 className="selling-point-title">{item.title}</h2>
                <p className="selling-point-text">{item.description}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
