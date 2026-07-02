import { Link } from 'react-router-dom'
import { BRAND_LABEL } from '../../lib/brand'
import { BrandWordmark } from '../ui'

export function HeaderBrand() {
  return (
    <Link to="/" className="site-header-brand" aria-label={BRAND_LABEL}>
      <BrandWordmark />
    </Link>
  )
}
