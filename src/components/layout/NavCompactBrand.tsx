import { Link } from 'react-router-dom'
import { BrandMark } from '../ui'

export function NavCompactBrand() {
  return (
    <li className="nav-compact-brand-item">
      <Link to="/" className="nav-compact-brand" aria-label="Frisdahl Studio">
        <span className="nav-compact-brand-inner">
          <BrandMark />
        </span>
      </Link>
    </li>
  )
}
