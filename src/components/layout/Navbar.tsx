import { Link, useLocation } from 'react-router-dom'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocale } from '../../context/LocaleContext'
import { useContactDrawer } from '../../context/ContactDrawerContext'
import { getFooterContent } from '../../data/footer'
import { getNavigation } from '../../data/navigation'
import { toAppHref } from '../../lib/routes'
import { ContactButton, Container, LanguageSwitcher } from '../ui'
import { HeaderBrand } from './HeaderBrand'

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
      <line x1="2" y1="8" x2="22" y2="8" />
      <line x1="2" y1="16" x2="22" y2="16" />
    </svg>
  )
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isOnDark, setIsOnDark] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const { locale } = useLocale()
  const { openDrawer } = useContactDrawer()
  const { pathname, hash } = useLocation()
  const { items, mobileGroups, navAriaLabel, menuOpen, menuClose } = getNavigation(locale)
  const { logoLabel } = getFooterContent(locale)
  const contactLabel =
    items.find((item) => item.href === '/#contact')?.label ?? 'Kontakt'

  // The header is fixed at every width, so its height positions the menu
  // panel and offsets the page surface below it.
  useLayoutEffect(() => {
    const header = headerRef.current
    if (!header) return

    const sync = () => {
      document.documentElement.style.setProperty(
        '--site-header-height',
        `${header.offsetHeight}px`,
      )
    }

    sync()

    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(sync) : null
    observer?.observe(header)
    window.addEventListener('resize', sync)

    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', sync)
    }
  }, [])

  // The header is transparent, so it switches to its light variant while a
  // section marked data-header-theme="dark" is behind its middle line.
  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    let frame = 0
    const check = () => {
      frame = 0
      const line = header.offsetHeight / 2
      const onDark = Array.from(
        document.querySelectorAll('[data-header-theme="dark"]'),
      ).some((section) => {
        const rect = section.getBoundingClientRect()
        return rect.top <= line && rect.bottom >= line
      })
      setIsOnDark(onDark)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check)
    }

    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [pathname])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname, hash])

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
      {isOpen ? (
        <>
          <button
            type="button"
            className="site-overlay mobile-menu-overlay"
            aria-label={menuClose}
            onClick={closeMenu}
          />

          <nav id="mobile-menu" className="mobile-menu-panel" aria-label={navAriaLabel}>
            <Container fullWidth>
              <div className="mobile-menu-content">
                <div className="mobile-menu-language">
                  <LanguageSwitcher />
                </div>

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

      <header ref={headerRef} className={`site-header${isOnDark ? ' is-on-dark' : ''}`}>
        <Container fullWidth>
          <div className="site-header-bar">
            <HeaderBrand label={logoLabel} />

            <div className="site-header-actions">
              <ContactButton onClick={() => openDrawer('contact')}>{contactLabel}</ContactButton>

              <button
                type="button"
                className="header-menu-toggle"
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
