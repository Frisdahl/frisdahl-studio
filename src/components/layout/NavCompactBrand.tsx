import { Link } from 'react-router-dom'

export function NavCompactBrand() {
  return (
    <li className="nav-compact-brand-item">
      <Link to="/" className="nav-compact-brand" aria-label="Frisdahl Studio">
        <span className="nav-compact-brand-inner">
          <span className="nav-compact-brand-stack" aria-hidden="true">
            <span className="nav-compact-brand-letter">F</span>
            <span className="nav-compact-brand-letter">S</span>
          </span>
          <span className="nav-compact-brand-mark" aria-hidden="true">
            ®
          </span>
        </span>
      </Link>
    </li>
  )
}
