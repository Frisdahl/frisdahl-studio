import { type CSSProperties } from 'react'
import type { IconType } from 'react-icons'
import {
  HiCodeBracket,
  HiLightBulb,
  HiPaintBrush,
  HiWrenchScrewdriver,
} from 'react-icons/hi2'
import type { NavDropdownColumn, NavDropdownIcon } from '../../data/navigation'
import { NavArrowIcon } from '../ui/NavArrowIcon'

const iconMap: Record<NavDropdownIcon, IconType> = {
  code: HiCodeBracket,
  design: HiPaintBrush,
  content: HiLightBulb,
  maintenance: HiWrenchScrewdriver,
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
              <a
                key={column.href}
                href={column.href}
                className="nav-mega-item"
                role="menuitem"
              >
                <Icon className="nav-mega-icon" aria-hidden />
                <span className="nav-mega-title-row">
                  <span className="nav-mega-title">{column.title}</span>
                  <NavArrowIcon className="nav-mega-arrow" />
                </span>
                <span className="nav-mega-description">{column.description}</span>
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
