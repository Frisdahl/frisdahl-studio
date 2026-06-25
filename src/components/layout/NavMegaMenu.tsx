import { type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import type { IconType } from 'react-icons'
import {
  HiArrowPath,
  HiCodeBracket,
  HiLightBulb,
  HiNewspaper,
  HiPaintBrush,
  HiSparkles,
  HiUserGroup,
  HiWrenchScrewdriver,
} from 'react-icons/hi2'
import type { NavDropdownColumn, NavDropdownIcon } from '../../data/navigation'
import { toAppHref } from '../../lib/routes'

const iconMap: Record<NavDropdownIcon, IconType> = {
  code: HiCodeBracket,
  design: HiPaintBrush,
  content: HiLightBulb,
  maintenance: HiWrenchScrewdriver,
  meet: HiUserGroup,
  process: HiArrowPath,
  culture: HiSparkles,
  blog: HiNewspaper,
}

function MegaMenuArrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="11"
      viewBox="0 0 14 11"
      fill="none"
      className="nav-mega-arrow"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="m9.84 1.08 3.977 3.978a.625.625 0 0 1 0 .884L9.839 9.919a.625.625 0 0 1-.883-.884l2.91-2.91H1.375a.625.625 0 0 1 0-1.25h10.491l-2.91-2.91a.625.625 0 1 1 .883-.884"
      />
    </svg>
  )
}

interface NavMegaMenuProps {
  columns: NavDropdownColumn[]
  menuLabel: string
  caretOffset: number
}

export function NavMegaMenu({ columns, menuLabel, caretOffset }: NavMegaMenuProps) {
  return (
    <div className="nav-mega-menu">
      <div
        className="nav-mega-panel"
        style={{ '--nav-caret-left': `${caretOffset}px` } as CSSProperties}
        role="menu"
        aria-label={menuLabel}
      >
        <div className="nav-mega-caret" aria-hidden />
        <div className="nav-mega-grid">
          {columns.map((column) => {
            const Icon = iconMap[column.icon]

            return (
              <Link
                key={column.href}
                to={toAppHref(column.href)}
                className="nav-mega-item"
                role="menuitem"
              >
                <Icon className="nav-mega-icon" aria-hidden />
                <span className="nav-mega-title-row">
                  <span className="nav-mega-title">{column.title}</span>
                  <MegaMenuArrow />
                </span>
                <span className="nav-mega-description">{column.description}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
