import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, type ReactNode } from 'react'

const drawerEase = [0.4, 0, 0.2, 1] as const

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const panelVariants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { duration: 0.35, ease: drawerEase },
  },
  exit: {
    x: '100%',
    transition: { duration: 0.25, ease: drawerEase },
  },
}

export type ContactDrawerView = 'contact' | 'book'

interface ContactDrawerProps {
  isOpen: boolean
  view: ContactDrawerView | null
  onClose: () => void
  closeLabel: string
  children: ReactNode
}

export function ContactDrawer({
  isOpen,
  view,
  onClose,
  closeLabel,
  children,
}: ContactDrawerProps) {
  const shouldReduceMotion = useReducedMotion()
  const motionTransition = shouldReduceMotion ? { duration: 0 } : undefined

  useEffect(() => {
    if (!isOpen) return

    document.body.style.overflow = 'hidden'

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && view && (
        <>
          <motion.button
            type="button"
            className="site-overlay contact-drawer-overlay"
            aria-label={closeLabel}
            onClick={onClose}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={motionTransition ?? { duration: 0.25, ease: drawerEase }}
          />

          <motion.aside
            className="contact-drawer-panel"
            role="dialog"
            aria-modal="true"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={motionTransition}
          >
            {children}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
