import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocale } from '../../context/LocaleContext'
import { useContactDrawer } from '../../context/ContactDrawerContext'
import { getFooterContent } from '../../data/footer'
import { navigateWithTransition } from '../../lib/pageTransition'
import { getNavigation } from '../../data/navigation'
import { CASES_PATH, toAppHref } from '../../lib/routes'
import { getSmoothScroll, prefersReducedMotion } from '../../lib/smoothScroll'
import { ContactButton, Container, LanguageSwitcher, RollLabel } from '../ui'
import { HeaderBrand } from './HeaderBrand'

interface MenuToggleIconProps {
  isOpen: boolean
}

/** Two lines that turn into an X while the menu is open (see .menu-toggle-line). */
function MenuToggleIcon({ isOpen }: MenuToggleIconProps) {
  return (
    <svg
      className={`menu-toggle-icon h-6 w-6${isOpen ? ' is-open' : ''}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line className="menu-toggle-line menu-toggle-line-top" x1="2" y1="8" x2="22" y2="8" />
      <line className="menu-toggle-line menu-toggle-line-bottom" x1="2" y1="16" x2="22" y2="16" />
    </svg>
  )
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  // The page the menu highlights: taken when the menu opens, so the active
  // link never changes while the menu is on screen.
  const [menuPath, setMenuPath] = useState('/')
  // A link chosen in the menu: followed once the page has slid back.
  const pendingHrefRef = useRef<string | null>(null)
  const navigate = useNavigate()
  const [isOnDark, setIsOnDark] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const { locale } = useLocale()
  const { openDrawer } = useContactDrawer()
  const { pathname, hash } = useLocation()
  const { items, menuLinks, navAriaLabel, menuOpen, menuClose } = getNavigation(locale)
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

  // Opening: the page (.page-shell) is clipped to the visible screen and
  // scaled around its middle, then slides left to reveal the menu behind it.
  // Closing reverses the slide and only then drops the clip.
  useEffect(() => {
    const root = document.documentElement
    const shell = document.querySelector<HTMLElement>('.page-shell')
    if (!shell) return

    if (isOpen) {
      // The clip is the scroll position plus one screen (see .page-shell), so it
      // holds even if the page's height changes while open, e.g. a language switch.
      const top = window.scrollY
      shell.style.setProperty('--shell-clip-top', `${top}px`)
      shell.style.setProperty('--shell-origin-y', `${top + window.innerHeight / 2}px`)
      root.classList.add('menu-active')
      getSmoothScroll()?.stop()
      // Next frame, so the clip is in place before the transform transitions.
      const frame = requestAnimationFrame(() => root.classList.add('menu-open'))
      return () => cancelAnimationFrame(frame)
    }

    if (!root.classList.contains('menu-active')) return
    root.classList.remove('menu-open')
    const timer = window.setTimeout(
      () => {
        root.classList.remove('menu-active')
        getSmoothScroll()?.start()
        const href = pendingHrefRef.current
        pendingHrefRef.current = null
        if (href) navigateWithTransition(href, navigate)
      },
      // Matches --menu-close-duration in index.css.
      prefersReducedMotion() ? 0 : 1000,
    )
    return () => window.clearTimeout(timer)
  }, [isOpen, navigate])

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

  // Close first, then go: the page slides back, and only then changes.
  const closeMenuAndGo = (href: string) => {
    pendingHrefRef.current = href
    setIsOpen(false)
  }

  const toggleMenu = () => {
    if (!isOpen) setMenuPath(pathname)
    setIsOpen((open) => !open)
  }

  // The menu link for the page being viewed; case pages count as Cases.
  const isActiveLink = (href: string) => {
    if (href === '/') return menuPath === '/'
    if (href === CASES_PATH) return menuPath === CASES_PATH || menuPath.startsWith(`${CASES_PATH}/`)
    if (href.startsWith('/#')) return false
    return menuPath === href
  }

  return (
    <>
      {/* Covers the page card while the menu is open; clicking it closes the menu. */}
      {isOpen ? (
        <button type="button" className="menu-page-close" aria-label={menuClose} onClick={closeMenu} />
      ) : null}

      <nav id="mobile-menu" className="menu-panel" aria-label={navAriaLabel} inert={!isOpen}>
        <div className="menu-panel-content">
          <ul className="menu-links">
            {menuLinks.map(({ label, href }) => (
              <li key={href}>
                {href === '/#contact' ? (
                  <button
                    type="button"
                    className="menu-link"
                    onClick={() => {
                      openDrawer('contact')
                      closeMenu()
                    }}
                  >
                    <RollLabel>{label}</RollLabel>
                  </button>
                ) : (
                  <Link
                    to={toAppHref(href)}
                    className={`menu-link${isActiveLink(href) ? ' is-active' : ''}`}
                    aria-current={isActiveLink(href) ? 'page' : undefined}
                    onClick={(event) => {
                      // Plain clicks wait for the menu to close; new-tab clicks behave as usual.
                      if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
                      event.preventDefault()
                      closeMenuAndGo(toAppHref(href))
                    }}
                  >
                    <RollLabel>{label}</RollLabel>
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="menu-language">
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

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
                onClick={toggleMenu}
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
