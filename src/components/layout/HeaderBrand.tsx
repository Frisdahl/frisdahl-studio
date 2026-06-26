import { Link } from 'react-router-dom'
import { useBrandWordmarkAnimation } from '../../hooks/useBrandWordmarkAnimation'
import { BRAND_LABEL } from '../../lib/brand'
import { BrandWordmark } from '../ui'

export function HeaderBrand() {
  const { phase, wordmarkHandlers } = useBrandWordmarkAnimation()

  return (
    <Link
      to="/"
      className="site-header-brand"
      aria-label={BRAND_LABEL}
      {...wordmarkHandlers}
    >
      <BrandWordmark phase={phase} />
    </Link>
  )
}
