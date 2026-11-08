import { useLocation, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocale } from '../../context/LocaleContext'
import { getFooterContent } from '../../data/footer'
import { navigateWithTransition } from '../../lib/pageTransition'
import { firstScreenImages, waitForPage } from '../../lib/pageSwap'
import { coverPage, revealPage } from '../../lib/pageReveal'
import { getNavigation } from '../../data/navigation'
import { CASES_PATH, toAppHref } from '../../lib/routes'
import { responsiveImageProps } from '../../lib/responsiveImage'
import { lockScroll, prefersReducedMotion, unlockScroll } from '../../lib/scroll'
import { Container, DanishFlagIcon } from '../ui'
import { useHeaderInk } from '../../hooks/useHeaderInk'
import { FooterLink } from './Footer'
import { HeaderBrand } from './HeaderBrand'

/** The picture to the right of the links (decorative; hidden on phones). */
const MENU_IMAGE = '/images/hero/hero-2-montra-iphone.webp'
const MENU_IMAGE_SIZES = '(min-width: 64rem) 25vw, 36vw'

/** How long the overlay takes to leave: --menu-close-delay + --menu-close-duration in index.css. */
const MENU_CLOSE_MS = 800
/** Reduced motion: the overlay only fades (0.2s). */
const MENU_CLOSE_REDUCED_MS = 200
/**
 * A link chosen in the menu: the links, info and picture leave while the panel stays
 * (.menu-leaving in index.css, about this long), the page changes under the panel, then
 * the panel fades away (MENU_FADE_MS, .menu-fade) as the new page rises in.
 */
const MENU_LEAVE_MS = 650
const MENU_FADE_MS = 550

const wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms))

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
  // A link chosen in the menu: followed once the page has slid back.
  const pendingHrefRef = useRef<string | null>(null)
  // The menu is leaving for a page (see leaveMenuTo): the panel stays up until the new page is in.
  const leavingRef = useRef(false)
  const navigate = useNavigate()
  const headerRef = useRef<HTMLElement>(null)
  const menuImageRef = useRef<HTMLImageElement>(null)
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

  // The menu's picture is decoded while the browser is idle, so the first time the
  // overlay slides in it doesn't have to be decoded then (a hitch on slow devices).
  // Only where it is shown: phones hide it and never download it.
  useEffect(() => {
    const image = menuImageRef.current
    if (!image || !window.matchMedia('(min-width: 48rem)').matches) return
    const warm = () => {
      image.loading = 'eager'
      image.decode().catch(() => {})
    }
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(warm, { timeout: 4000 })
      return () => window.cancelIdleCallback(id)
    }
    const timer = window.setTimeout(warm, 2000)
    return () => window.clearTimeout(timer)
  }, [])

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

    // Leaving for a page: leaveMenuTo takes the panel away once the new page is in.
    if (leavingRef.current) return
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

    // `clip`, not `hidden`: hidden would make the body a scroll container, and any
    // position: sticky element on the page (the Mød mig portrait) would then jump
    // by the scroll distance the moment the menu opens. The html element's own
    // overflow lock (html.scroll-locked) is what stops the page from scrolling.
    document.body.style.overflow = 'clip'

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  // The menu's own page change: its content animates out, the page changes behind the
  // panel (which is the page colour, so nothing shows), then the panel fades away while the
  // new page's content rises in. No wipe panels.
  const leaveMenuTo = async (href: string) => {
    const root = document.documentElement
    const shell = document.querySelector<HTMLElement>('.page-shell')
    root.classList.add('menu-leaving')
    coverPage()
    await wait(MENU_LEAVE_MS)

    const previous = shell?.querySelector(':scope > .global-layout > main') ?? null
    navigate(href)
    const main = shell ? await waitForPage(shell, previous) : null
    window.scrollTo(0, 0)
    await firstScreenImages(main, window.innerHeight)

    // A page with its own entrance (the home page's hero) plays that instead of the rise.
    if (main && !main.matches('[data-page-entrance]') && !main.querySelector('[data-page-entrance]')) {
      gsap.fromTo(
        main,
        { autoAlpha: 0, y: 48 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          clearProps: 'transform,opacity,visibility',
        },
      )
    }
    root.classList.add('menu-fade')
    revealPage()
    await wait(MENU_FADE_MS)

    root.classList.remove('menu-active', 'menu-open', 'menu-leaving', 'menu-fade')
    if (shell) shell.inert = false
    unlockScroll()
    ScrollTrigger.refresh()
    leavingRef.current = false
  }

  // A link chosen in the menu. To another page: the content leaves and the page changes
  // under the panel (leaveMenuTo). The same page (or a section on it), or reduced motion:
  // the overlay slides back up and then the link is followed.
  const closeMenuAndGo = (href: string) => {
    const samePage = new URL(href, window.location.href).pathname === pathname
    if (samePage || prefersReducedMotion() || leavingRef.current) {
      pendingHrefRef.current = href
      setIsOpen(false)
      return
    }
    leavingRef.current = true
    setIsOpen(false)
    void leaveMenuTo(href)
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
      <nav id="mobile-menu" className="menu-panel" aria-label={navAriaLabel} inert={!isOpen}>
        <Container columns className="menu-panel-container" contentClassName="menu-panel-grid">
          <div className="menu-panel-main">
            <ul className="menu-links">
              {menuLinks.map(({ label, href }) => (
                <li key={href} className="menu-link-item">
                  <FooterLink
                    href={toAppHref(href)}
                    className="menu-link"
                    aria-current={isActiveLink(href) ? 'page' : undefined}
                    onClick={(event) => {
                      // Plain clicks wait for the menu to close; new-tab clicks behave as usual.
                      if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
                      event.preventDefault()
                      closeMenuAndGo(toAppHref(href))
                    }}
                  >
                    {label}
                  </FooterLink>
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
            <FooterLink href={footer.emailHref} withArrow>
              {footer.email}
            </FooterLink>
            <ul className="menu-info-socials">
              {footer.socialLinks.map((social) => (
                <li key={social.href}>
                  <FooterLink href={social.href} target="_blank" rel="noreferrer noopener">
                    {social.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="menu-panel-media" aria-hidden="true">
            <img
              ref={menuImageRef}
              {...responsiveImageProps(MENU_IMAGE, MENU_IMAGE_SIZES)}
              alt=""
              loading="lazy"
              decoding="async"
              draggable={false}
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
