import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocale } from '../../context/LocaleContext'
import { getFooterContent } from '../../data/footer'
import { navigateWithTransition } from '../../lib/pageTransition'
import { getNavigation } from '../../data/navigation'
import { CASES_PATH, CONTACT_PATH, MEET_US_PATH, toAppHref } from '../../lib/routes'
import { lockScroll, prefersReducedMotion, unlockScroll } from '../../lib/scroll'
import { Container, DanishFlagIcon } from '../ui'
import { useHeaderInk } from '../../hooks/useHeaderInk'
import { HeaderBrand } from './HeaderBrand'
import { MenuImageStack } from './MenuImageStack'

/** The picture shown for each menu link, to the right of the links (decorative; hidden on phones). */
const MENU_IMAGES: Record<string, string> = {
  '/': '/images/hero/hero-2-montra-iphone.webp',
  [CASES_PATH]: '/cases/peter-salling/main-higgs--16-9.webp',
  [MEET_US_PATH]: '/images/team/alexander-portrait.webp',
  [CONTACT_PATH]: '/images/hero/id-kort-frisdahl-studio.webp',
}
// The pictures crop to the frame (a 16:9 one is about 1.5 times as wide as the frame), so the hint is larger than the frame.
const MENU_IMAGE_SIZES = '(min-width: 64rem) 46vw, 52vw'

/** How long the overlay takes to leave: --menu-close-delay + --menu-close-duration in index.css. */
const MENU_CLOSE_MS = 800
/** Reduced motion: the overlay only fades (0.2s). */
const MENU_CLOSE_REDUCED_MS = 200

interface MenuToggleIconProps {
  isOpen: boolean
}

/** Two lines that turn into an X while the menu is open (see .menu-toggle-line). */
function MenuToggleIcon({ isOpen }: MenuToggleIconProps) {
  return (
    <svg
      className={`menu-toggle-icon h-6 w-[1.875rem]${isOpen ? ' is-open' : ''}`}
      viewBox="0 0 30 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line className="menu-toggle-line menu-toggle-line-top" x1="2" y1="8" x2="28" y2="8" />
      <line className="menu-toggle-line menu-toggle-line-bottom" x1="2" y1="16" x2="28" y2="16" />
    </svg>
  )
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  // The page the menu highlights: taken when the menu opens, so the active
  // link never changes while the menu is on screen.
  const [menuPath, setMenuPath] = useState('/')
  // The link whose picture is shown (the hovered or focused one), and a counter that
  // starts the picture stack over each time the menu opens.
  const [activeImage, setActiveImage] = useState(0)
  const [menuOpenCount, setMenuOpenCount] = useState(0)
  // A link chosen in the menu: followed once the page has slid back.
  const pendingHrefRef = useRef<string | null>(null)
  const navigate = useNavigate()
  const headerRef = useRef<HTMLElement>(null)
  const { locale } = useLocale()
  const { pathname, hash } = useLocation()
  useHeaderInk(pathname)
  const { menuLinks, navAriaLabel, menuOpen, menuClose } = getNavigation(locale)
  const footer = getFooterContent(locale)
  const { logoLabel } = footer


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

  useEffect(() => {
    setIsOpen(false)
  }, [pathname, hash])

  // Opening: the grey overlay slides down over the page (CSS: .menu-active shows
  // it and locks the scroll, .menu-open slides it). The page behind is inert, so
  // the keyboard can't wander into it. Closing slides it back up; only then does
  // the page unlock and a link chosen in the menu get followed.
  useEffect(() => {
    const root = document.documentElement
    const shell = document.querySelector<HTMLElement>('.page-shell')

    if (isOpen) {
      root.classList.add('menu-active')
      lockScroll()
      if (shell) shell.inert = true
      // Next frame, so the overlay is in place above the screen before it slides.
      const frame = requestAnimationFrame(() => root.classList.add('menu-open'))
      return () => cancelAnimationFrame(frame)
    }

    if (!root.classList.contains('menu-active')) return
    root.classList.remove('menu-open')
    const closeMs = prefersReducedMotion() ? MENU_CLOSE_REDUCED_MS : MENU_CLOSE_MS
    const timer = window.setTimeout(() => {
      root.classList.remove('menu-active')
      if (shell) shell.inert = false
      unlockScroll()
      const href = pendingHrefRef.current
      pendingHrefRef.current = null
      if (href) navigateWithTransition(href, navigate)
    }, closeMs)
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

  // Close first, then go: the overlay slides back up, and only then does the page change.
  const closeMenuAndGo = (href: string) => {
    pendingHrefRef.current = href
    setIsOpen(false)
  }

  const toggleMenu = () => {
    if (!isOpen) {
      setMenuPath(pathname)
      setActiveImage(0)
      setMenuOpenCount((count) => count + 1)
    }
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
      <nav id="mobile-menu" className="menu-panel" aria-label={navAriaLabel} inert={!isOpen}>
        <Container columns className="menu-panel-container" contentClassName="menu-panel-grid">
          <div className="menu-panel-main">
            <ul className="menu-links">
              {menuLinks.map(({ label, href }, index) => (
                <li key={href} className="menu-link-item">
                  <Link
                    to={toAppHref(href)}
                    className="menu-link"
                    aria-current={isActiveLink(href) ? 'page' : undefined}
                    onPointerEnter={(event) => {
                      if (event.pointerType === 'mouse') setActiveImage(index)
                    }}
                    onFocus={() => setActiveImage(index)}
                    onClick={(event) => {
                      // Plain clicks wait for the menu to close; new-tab clicks behave as usual.
                      if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
                      event.preventDefault()
                      closeMenuAndGo(toAppHref(href))
                    }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Where to find us, along the bottom of the overlay. */}
          <div className="menu-info">
            <p className="menu-info-location">
              <span>
                {footer.locationTitle}, {footer.country}
              </span>
              <DanishFlagIcon />
            </p>
            <a href={footer.emailHref} className="menu-info-link">
              {footer.email}
            </a>
            <ul className="menu-info-socials">
              {footer.socialLinks.map((social) => (
                <li key={social.href}>
                  <a href={social.href} className="menu-info-link" target="_blank" rel="noreferrer noopener">
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="menu-panel-media" aria-hidden="true">
            <MenuImageStack
              sources={menuLinks.map(({ href }) => MENU_IMAGES[href])}
              activeIndex={activeImage}
              resetKey={menuOpenCount}
              sizes={MENU_IMAGE_SIZES}
            />
          </div>
        </Container>
      </nav>

      <header ref={headerRef} className="site-header">
        <Container fullWidth>
          <div className="site-header-bar">
            <HeaderBrand label={logoLabel} />

            <div className="site-header-actions">
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
