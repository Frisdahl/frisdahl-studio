import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocale } from '../../context/LocaleContext'
import { getNavigation, getNavDropdownColumns, navDropdownHrefs } from '../../data/navigation'
import { toAppHref } from '../../lib/routes'
import { useFixedNav } from '../../hooks/useFixedNav'
import { Container, LanguageSwitcher, UnderlineLink } from '../ui'
import { NavDropdown } from './NavDropdown'
import { NavMegaMenu } from './NavMegaMenu'

const menuEase = [0.4, 0, 0.2, 1] as const

const navDropdownOverlayEaseIn = [0.22, 1, 0.36, 1] as const
const navDropdownOverlayEaseOut = [0.4, 0, 0.2, 1] as const

const navDropdownOverlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.65, ease: navDropdownOverlayEaseIn },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.6, ease: navDropdownOverlayEaseOut },
  },
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const menuVariants = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: menuEase },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.2, ease: menuEase },
  },
}

const menuContentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.25, ease: menuEase, delay: 0.06 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.12, ease: menuEase },
  },
}

interface MenuToggleIconProps {
  isOpen: boolean
}

function MenuToggleIcon({ isOpen }: MenuToggleIconProps) {
  const shouldReduceMotion = useReducedMotion()
  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.25, ease: menuEase }

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
      <motion.line
        x1="4"
        y1="7"
        x2="20"
        y2="7"
        animate={
          isOpen
            ? { x1: 6, y1: 6, x2: 18, y2: 18 }
            : { x1: 4, y1: 7, x2: 20, y2: 7 }
        }
        transition={transition}
      />
      <motion.line
        x1="4"
        y1="12"
        x2="20"
        y2="12"
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        transition={transition}
      />
      <motion.line
        x1="4"
        y1="17"
        x2="20"
        y2="17"
        animate={
          isOpen
            ? { x1: 6, y1: 18, x2: 18, y2: 6 }
            : { x1: 4, y1: 17, x2: 20, y2: 17 }
        }
        transition={transition}
      />
    </svg>
  )
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrollLocked, setScrollLocked] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [caretOffset, setCaretOffset] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const navClusterRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const triggerRefs = useRef(new Map<string, HTMLDivElement>())
  const shouldReduceMotion = useReducedMotion()
  const { locale } = useLocale()
  const { isReady: isNavReady, pinnedTop, navSize, isScrolled: isNavScrolled } = useFixedNav(navRef)
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
    },
    [updateCaretOffset],
  )

  const closeDropdown = useCallback(() => {
    setActiveDropdown(null)
  }, [])

  const setTriggerRef = useCallback((href: string, element: HTMLDivElement | null) => {
    if (element) {
      triggerRefs.current.set(href, element)
      return
    }

    triggerRefs.current.delete(href)
  }, [])

  useEffect(() => {
    if (!activeDropdown) return

    const handleResize = () => updateCaretOffset(activeDropdown)

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [activeDropdown, updateCaretOffset])

  useEffect(() => {
    if (isOpen) setScrollLocked(true)
  }, [isOpen])

  useEffect(() => {
    if (!scrollLocked) return

    document.body.style.overflow = 'hidden'

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleEscape)
    }
  }, [scrollLocked])

  const closeMenu = () => setIsOpen(false)

  const handleMenuExitComplete = () => {
    if (!isOpen) setScrollLocked(false)
  }

  const motionTransition = shouldReduceMotion
    ? { duration: 0 }
    : undefined

  return (
    <>
      <AnimatePresence>
        {activeDropdown && (
          <motion.div
            key="nav-dropdown-overlay"
            className="nav-dropdown-overlay"
            variants={navDropdownOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={motionTransition}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <AnimatePresence onExitComplete={handleMenuExitComplete}>
        {isOpen && (
          <>
            <motion.button
              type="button"
              className="site-overlay mobile-menu-overlay"
              aria-label={menuClose}
              onClick={closeMenu}
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={motionTransition ?? { duration: 0.25, ease: menuEase }}
            />

            <motion.nav
              id="mobile-menu"
              className="mobile-menu-panel"
              aria-label={navAriaLabel}
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Container>
                <motion.div
                  className="mobile-menu-content"
                  variants={menuContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {mobileGroups.map(({ title, items: groupItems }) => (
                    <div key={title} className="mobile-nav-group">
                      <p className="mobile-nav-heading">{title}</p>
                      <ul className="mobile-nav-list">
                        {groupItems.map(({ label, href }) => (
                          <li key={href}>
                            <Link
                              to={toAppHref(href)}
                              className="mobile-nav-link"
                              onClick={closeMenu}
                            >
                              {label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </motion.div>
              </Container>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      <header className="site-header">
        <Container ref={containerRef}>
          <div className="site-header-bar">
            <Link to="/" className="site-header-brand">
              Frisdahl Studio
            </Link>

            <div className="site-header-nav-slot">
              <div
                className="site-header-nav-placeholder"
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
                  isNavReady ? 'site-header-nav-cluster-fixed' : '',
                  isNavScrolled ? 'site-header-nav-scrolled' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={isNavReady ? { top: pinnedTop } : undefined}
                onMouseLeave={closeDropdown}
              >
                <nav ref={navRef} className="site-header-nav" aria-label={navAriaLabel}>
                  <ul className="site-header-nav-list">
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
                      ) : (
                        <li key={href} onMouseEnter={closeDropdown}>
                          <UnderlineLink
                            href={href}
                            className={href === '/#contact' ? 'nav-link-contact' : ''}
                          >
                            {label}
                          </UnderlineLink>
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
