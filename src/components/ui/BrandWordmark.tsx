import { motion, useReducedMotion } from 'framer-motion'
import { brandLetters, BRAND_LETTER_EASE, getLetterWidth, type BrandPhase } from '../../lib/brand'

interface BrandWordmarkProps {
  phase?: BrandPhase
}

export function BrandWordmark({ phase = 0 }: BrandWordmarkProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <span className="brand-wordmark">
      <span className="brand-wordmark-inner">
        <span className="brand-wordmark-letters-wrap">
          <span className="brand-wordmark-reg" aria-hidden="true">
            ®
          </span>

          <span className="brand-wordmark-letters" aria-hidden={phase > 0}>
            {brandLetters.map((letter, index) => {
              const letterWidth = getLetterWidth(letter.char)
              const isRemoved = Boolean(letter.remove)
              const opacity = !isRemoved || phase === 0 ? 1 : 0
              const maxWidth = isRemoved ? (phase === 2 ? 0 : letterWidth) : letterWidth

              return (
                <motion.span
                  key={`${letter.char}-${index}`}
                  className="brand-wordmark-letter"
                  aria-hidden={isRemoved && phase > 0}
                  animate={{ opacity, maxWidth }}
                  transition={{
                    opacity: {
                      duration: shouldReduceMotion ? 0 : 0.28,
                      ease: BRAND_LETTER_EASE,
                      delay: shouldReduceMotion
                        ? 0
                        : phase === 0
                          ? 0.28 + (brandLetters.length - index) * 0.012
                          : index * 0.014,
                    },
                    maxWidth: {
                      duration: shouldReduceMotion ? 0 : 0.36,
                      ease: BRAND_LETTER_EASE,
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
    </span>
  )
}
