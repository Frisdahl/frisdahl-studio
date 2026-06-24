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
                <span className="nav-mega-title">{column.title}</span>
                <span className="nav-mega-description">{column.description}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
