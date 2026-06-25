import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

interface BrandLetter {
  char: string
  remove?: boolean
}

const brandLetters: BrandLetter[] = [
  { char: 'F' },
  { char: 'R' },
  { char: 'I', remove: true },
  { char: 'S' },
  { char: 'D' },
  { char: 'A', remove: true },
  { char: 'H' },
  { char: 'L' },
  { char: ' ', remove: true },
  { char: 'S', remove: true },
  { char: 'T', remove: true },
  { char: 'U', remove: true },
  { char: 'D', remove: true },
  { char: 'I', remove: true },
  { char: 'O', remove: true },
]

/** 0 = full, 1 = faded (width kept), 2 = collapsed */
type BrandPhase = 0 | 1 | 2

const letterEase = [0.22, 1, 0.36, 1] as const
const fadeStepMs = 300
const collapseStepMs = 360

function getLetterWidth(char: string) {
  if (char === ' ') return '0.38ch'
  if (char === 'O' || char === 'o' || char === 'M' || char === 'm' || char === 'W' || char === 'w') {
    return '1.32ch'
  }
  if (char === 'I' || char === 'i' || char === 'L' || char === 'l') return '0.92ch'
  return '1.18ch'
}

export function HeaderBrand() {
  const [phase, setPhase] = useState<BrandPhase>(0)
  const phaseRef = useRef<BrandPhase>(0)
  const stepTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const shouldReduceMotion = useReducedMotion()

  phaseRef.current = phase

  const clearStepTimeout = () => {
    if (stepTimeoutRef.current) {
      clearTimeout(stepTimeoutRef.current)
      stepTimeoutRef.current = null
    }
  }

  useEffect(() => clearStepTimeout, [])

  const handleEnter = () => {
    clearStepTimeout()
    setPhase(1)

    if (shouldReduceMotion) {
      setPhase(2)
      return
    }

    stepTimeoutRef.current = setTimeout(() => {
      setPhase(2)
      stepTimeoutRef.current = null
    }, fadeStepMs)
  }

  const handleLeave = () => {
    clearStepTimeout()

    if (shouldReduceMotion) {
      setPhase(0)
      return
    }

    if (phaseRef.current === 2) {
      setPhase(1)
      stepTimeoutRef.current = setTimeout(() => {
        setPhase(0)
        stepTimeoutRef.current = null
      }, collapseStepMs)
      return
    }

    setPhase(0)
  }

  return (
    <Link
      to="/"
      className="site-header-brand"
      aria-label="Frisdahl Studio"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
    >
      <span className="site-header-brand-inner">
        <span className="site-header-brand-letters-wrap">
          <span className="site-header-brand-mark" aria-hidden="true">
            ®
          </span>

          <span className="site-header-brand-letters">
            {brandLetters.map((letter, index) => {
              const letterWidth = getLetterWidth(letter.char)
              const isRemoved = Boolean(letter.remove)

              const opacity = !isRemoved || phase === 0 ? 1 : 0
              const maxWidth = isRemoved ? (phase === 2 ? 0 : letterWidth) : letterWidth

              return (
                <motion.span
                  key={`${letter.char}-${index}`}
                  className="site-header-brand-letter"
                  aria-hidden={isRemoved && phase > 0}
                  animate={{ opacity, maxWidth }}
                  transition={{
                    opacity: {
                      duration: shouldReduceMotion ? 0 : 0.28,
                      ease: letterEase,
                      delay: shouldReduceMotion
                        ? 0
                        : phase === 0
                          ? 0.28 + (brandLetters.length - index) * 0.012
                          : index * 0.014,
                    },
                    maxWidth: {
                      duration: shouldReduceMotion ? 0 : 0.36,
                      ease: letterEase,
                      delay: shouldReduceMotion
                        ? 0
                        : phase === 2
                          ? 0.06 + index * 0.01
                          : 0,
                    },
                  }}
                >
                  {letter.char}
                </motion.span>
              )
            })}
          </span>
        </span>
      </span>
    </Link>
  )
}
