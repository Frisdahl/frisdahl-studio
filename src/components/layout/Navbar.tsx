import { Link, useLocation } from 'react-router-dom'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocale } from '../../context/LocaleContext'
import { useContactDrawer } from '../../context/ContactDrawerContext'
import { getNavigation, getNavDropdownColumns, navDropdownHrefs } from '../../data/navigation'
import { toAppHref } from '../../lib/routes'
import { useFixedNav } from '../../hooks/useFixedNav'
import { useNavLinkHighlight } from '../../hooks/useNavLinkHighlight'
import { Container, LanguageSwitcher, NavContactLink, UnderlineLink } from '../ui'
import { HeaderBrand } from './HeaderBrand'
import { NavCompactBrand } from './NavCompactBrand'
import { NavDropdown } from './NavDropdown'
import { NavMegaMenu } from './NavMegaMenu'

interface MenuToggleIconProps {
  isOpen: boolean
}

function MenuToggleIcon({ isOpen }: MenuToggleIconProps) {
  if (isOpen) {
    return (
      <svg
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <line x1="6" y1="6" x2="18" y2="18" />
        <line x1="6" y1="18" x2="18" y2="6" />
      </svg>
    )
  }

  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  )
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [caretOffset, setCaretOffset] = useState(0)
  const headerRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const navClusterRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const navListRef = useRef<HTMLUListElement>(null)
  const navPlaceholderRef = useRef<HTMLDivElement>(null)
  const triggerRefs = useRef(new Map<string, HTMLDivElement>())
  const { locale } = useLocale()
  const { openDrawer } = useContactDrawer()
  const { pathname, hash } = useLocation()
  const { isReady: isNavReady, navSize, isPinned: isNavPinned } = useFixedNav({
    headerRef,
    navRef,
    clusterRef: navClusterRef,
    placeholderRef: navPlaceholderRef,
  })
  const { metrics: navHighlight, updateHighlight, hideHighlight } = useNavLinkHighlight(navListRef)
  const { items, mobileGroups, navAriaLabel, menuOpen, menuClose } = getNavigation(locale)
  const activeDropdownLabel =
    items.find((item) => item.href === activeDropdown)?.label ?? ''
  const activeDropdownColumns = activeDropdown
    ? getNavDropdownColumns(activeDropdown, locale)
    : []

  const updateCaretOffset = useCallback((href: string) => {
    const trigger = triggerRefs.current.get(href)
    const container = containerRef.current

    if (!trigger || !container) return

    const triggerRect = trigger.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()

    setCaretOffset(triggerRect.left + triggerRect.width / 2 - containerRect.left)
  }, [])

  const openDropdown = useCallback(
    (href: string) => {
      updateCaretOffset(href)
      setActiveDropdown(href)

      const trigger = triggerRefs.current.get(href)
      const link = trigger?.querySelector('a')

      if (link instanceof HTMLElement) {
        updateHighlight(link)
      }
    },
    [updateCaretOffset, updateHighlight],
  )

  const closeDropdown = useCallback(() => {
    setActiveDropdown(null)
  }, [])

  const handleNavClusterLeave = useCallback(() => {
    closeDropdown()
    hideHighlight()
  }, [closeDropdown, hideHighlight])

  const handleNavItemHighlight = useCallback(
    (target: EventTarget & HTMLElement) => {
      const link = target.querySelector('a')

      if (link instanceof HTMLElement) {
        updateHighlight(link)
      }
    },
    [updateHighlight],
  )

  const setTriggerRef = useCallback((href: string, element: HTMLDivElement | null) => {
    if (element) {
      triggerRefs.current.set(href, element)
      return
    }

    triggerRefs.current.delete(href)
  }, [])

  useEffect(() => {
    if (!activeDropdown) return

    const handleResize = () => {
      updateCaretOffset(activeDropdown)

      const trigger = triggerRefs.current.get(activeDropdown)
      const link = trigger?.querySelector('a')

      if (link instanceof HTMLElement && navHighlight.opacity > 0) {
        updateHighlight(link)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [activeDropdown, navHighlight.opacity, updateCaretOffset, updateHighlight])

  useEffect(() => {
    setIsOpen(false)
    closeDropdown()
    hideHighlight()
  }, [pathname, hash, closeDropdown, hideHighlight])

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = ''
      return
    }

    document.body.style.overflow = 'hidden'

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)

  return (
    <>
      {activeDropdown ? <div className="nav-dropdown-overlay" aria-hidden="true" /> : null}

      {isOpen ? (
        <>
          <button
            type="button"
            className="site-overlay mobile-menu-overlay"
            aria-label={menuClose}
            onClick={closeMenu}
          />

          <nav id="mobile-menu" className="mobile-menu-panel" aria-label={navAriaLabel}>
            <Container>
              <div className="mobile-menu-content">
                {mobileGroups.map(({ title, items: groupItems }) => (
                  <div key={title} className="mobile-nav-group">
                    <p className="mobile-nav-heading">{title}</p>
                    <ul className="mobile-nav-list">
                      {groupItems.map(({ label, href }) => (
                        <li key={href}>
                          {href === '/#contact' ? (
                            <button
                              type="button"
                              className="mobile-nav-link w-full"
                              onClick={() => {
                                openDrawer('contact')
                                closeMenu()
                              }}
                            >
                              {label}
                            </button>
                          ) : (
                            <Link
                              to={toAppHref(href)}
                              className="mobile-nav-link"
                              onClick={closeMenu}
                            >
                              {label}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Container>
          </nav>
        </>
      ) : null}

      <header ref={headerRef} className="site-header">
        <Container ref={containerRef}>
          <div className="site-header-bar">
            <HeaderBrand />

            <div className="site-header-nav-slot">
              <div
                className="site-header-nav-placeholder"
                ref={navPlaceholderRef}
                style={
                  isNavReady
                    ? { width: navSize.width, height: navSize.height }
                    : undefined
                }
                aria-hidden="true"
              />

              <div
                ref={navClusterRef}
                className={[
                  'site-header-nav-cluster hidden lg:block',
                  isNavPinned ? 'site-header-nav-cluster-fixed' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onMouseLeave={handleNavClusterLeave}
              >
                <nav ref={navRef} className="site-header-nav" aria-label={navAriaLabel}>
                  <ul ref={navListRef} className="site-header-nav-list">
                    <NavCompactBrand />
                    <span
                      className="nav-link-highlight"
                      aria-hidden="true"
                      style={{
                        left: navHighlight.left,
                        width: navHighlight.width,
                        opacity: navHighlight.opacity,
                      }}
                    />
                    {items.map(({ label, href }) =>
                      navDropdownHrefs.has(href) ? (
                        <NavDropdown
                          key={href}
                          label={label}
                          href={href}
                          isOpen={activeDropdown === href}
                          onOpen={() => openDropdown(href)}
                          triggerRef={(element) => setTriggerRef(href, element)}
                        />
                      ) : href === '/#contact' ? (
                        <li
                          key={href}
                          onMouseEnter={() => {
                            closeDropdown()
                            hideHighlight()
                          }}
                        >
                          <NavContactLink label={label} />
                        </li>
                      ) : (
                        <li
                          key={href}
                          onMouseEnter={(event) => {
                            closeDropdown()
                            handleNavItemHighlight(event.currentTarget)
                          }}
                        >
                          <UnderlineLink href={href}>{label}</UnderlineLink>
                        </li>
                      ),
                    )}
                  </ul>
                </nav>

                {activeDropdown && (
                  <div className="nav-mega-menu-shell">
                    <Container>
                      <NavMegaMenu
                        columns={activeDropdownColumns}
                        menuLabel={activeDropdownLabel}
                        caretOffset={caretOffset}
                      />
                    </Container>
                  </div>
                )}
              </div>
            </div>

            <div className="site-header-actions">
              <LanguageSwitcher />

              <button
                type="button"
                className="inline-flex items-center justify-center rounded-control p-2.5 text-primary transition-colors hover:bg-peach-hover/50 lg:hidden"
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label={isOpen ? menuClose : menuOpen}
                onClick={() => setIsOpen((open) => !open)}
              >
                <MenuToggleIcon isOpen={isOpen} />
              </button>
            </div>
          </div>
        </Container>
      </header>
    </>
  )
}
