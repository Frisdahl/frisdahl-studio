import { Link } from 'react-router-dom'
import { BrandMonogram } from '../ui'

interface HeaderBrandProps {
  label: string
}

export function HeaderBrand({ label }: HeaderBrandProps) {
  return (
    <Link to="/" className="site-header-logo" aria-label={label}>
      <BrandMonogram />
    </Link>
  )
}
