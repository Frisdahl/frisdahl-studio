import { HiChevronDown } from 'react-icons/hi2'
import { UnderlineLink } from '../ui'

interface NavDropdownProps {
  label: string
  href: string
  isOpen: boolean
  onOpen: () => void
  triggerRef: (element: HTMLDivElement | null) => void
}

export function NavDropdown({
  label,
  href,
  isOpen,
  onOpen,
  triggerRef,
}: NavDropdownProps) {
  return (
    <li className="nav-dropdown">
      <div
        ref={triggerRef}
        className="nav-dropdown-trigger"
        onMouseEnter={onOpen}
      >
        <UnderlineLink href={href} aria-expanded={isOpen} aria-haspopup="true">
          {label}
        </UnderlineLink>
        <HiChevronDown
          className={`nav-dropdown-arrow ${isOpen ? 'nav-dropdown-arrow-open' : ''}`}
          aria-hidden
        />
      </div>
    </li>
  )
}
