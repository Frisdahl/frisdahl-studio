import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLocale } from '../../context/LocaleContext'
import { getNavigation } from '../../data/navigation'
import { Container, LanguageSwitcher, UnderlineLink } from '../ui'

const menuEase = [0.4, 0, 0.2, 1] as const

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
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollLocked, setScrollLocked] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const { locale } = useLocale()
  const { items, mobileGroups, navAriaLabel, menuOpen, menuClose } = getNavigation(locale)

  useEffect(() => {
    if (isOpen) setScrollLocked(true)
  }, [isOpen])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
      <AnimatePresence onExitComplete={handleMenuExitComplete}>
        {isOpen && (
          <>
            <motion.button
              type="button"
              className="mobile-menu-overlay lg:hidden"
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
                            <a href={href} className="mobile-nav-link" onClick={closeMenu}>
                              {label}
                            </a>
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

      <header
        className={`sticky top-0 z-50 bg-background transition-[background-color,box-shadow] duration-600 ${isScrolled ? 'shadow-soft' : ''}`}
      >
        <Container>
          <div className="flex h-16 items-center justify-between gap-4 px-2 sm:px-3 lg:h-20 lg:px-0">
            <a
              href="/"
              className="font-heading py-2 text-body-lg font-bold tracking-tight text-primary transition-colors hover:text-accent"
            >
              Frisdahl Studio
            </a>

            <div className="hidden items-center gap-8 lg:flex">
              <nav aria-label={navAriaLabel}>
                <ul className="flex items-center gap-8">
                  {items.map(({ label, href }) => (
                    <li key={href}>
                      <UnderlineLink href={href}>{label}</UnderlineLink>
                    </li>
                  ))}
                </ul>
              </nav>

              <LanguageSwitcher />
            </div>

            <div className="flex items-center gap-1 sm:gap-2 lg:hidden">
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
