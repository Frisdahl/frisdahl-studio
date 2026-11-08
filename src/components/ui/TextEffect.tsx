// Per-character text reveal after the TextEffect component in motion-primitives
// (https://motion-primitives.com/docs/text-effect, ibelick, MIT, checked 2026-11-08).
// Changes: only `per="char"`, written for this project; it can wait for a start event
// (the shared page transition fires one when the picture lands) and respects reduced motion.
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { useEffect, useState } from 'react'

export const TEXT_EFFECT_START_EVENT = 'text-effect-start'

const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item: Variants = {
  hidden: { opacity: 0, rotateX: 90, y: 10 },
  visible: { opacity: 1, rotateX: 0, y: 0, transition: { duration: 0.2 } },
}

interface TextEffectProps {
  children: string
  className?: string
  /** Seconds before it plays on its own. */
  delay?: number
  /**
   * Hold the text until the page's shared-image transition says so (it fires
   * TEXT_EFFECT_START_EVENT when the picture lands). Falls back after a few seconds.
   */
  waitForTransition?: boolean
}

export function TextEffect({ children, className, delay = 0, waitForTransition = false }: TextEffectProps) {
  const shouldReduceMotion = useReducedMotion()
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (shouldReduceMotion) return
    const waiting = waitForTransition && document.documentElement.classList.contains('is-shared-image')
    if (!waiting) {
      const timer = window.setTimeout(() => setStarted(true), delay * 1000)
      return () => window.clearTimeout(timer)
    }
    const start = () => setStarted(true)
    window.addEventListener(TEXT_EFFECT_START_EVENT, start, { once: true })
    const fallback = window.setTimeout(start, 6000)
    return () => {
      window.removeEventListener(TEXT_EFFECT_START_EVENT, start)
      window.clearTimeout(fallback)
    }
  }, [delay, shouldReduceMotion, waitForTransition])

  if (shouldReduceMotion) return <span className={className}>{children}</span>

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      animate={started ? 'visible' : 'hidden'}
      aria-label={children}
      style={{ display: 'inline-block' }}
    >
      {children.split('').map((char, index) => (
        <motion.span
          key={index}
          variants={item}
          aria-hidden="true"
          style={{ display: 'inline-block', whiteSpace: 'pre', transformPerspective: 400 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}
