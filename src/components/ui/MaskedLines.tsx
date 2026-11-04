import { Fragment, useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'

/** Waits between the lines, so they cascade down on enter and up on exit. */
const stackVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
  exit: { transition: { staggerChildren: 0.05 } },
}

/** Each line slides inside its own overflow-hidden mask. */
const lineVariants: Variants = {
  hidden: { y: '-110%' },
  show: { y: '0%', transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  exit: { y: '-110%', transition: { duration: 0.4, ease: [0.6, 0, 0.9, 1] } },
}

/** Groups the measure layer's word spans into lines by their vertical offset. */
function measureLines(container: HTMLElement): string[] {
  const words = Array.from(container.querySelectorAll<HTMLElement>('[data-word]'))
  const lines: string[][] = []
  let currentTop: number | null = null

  for (const word of words) {
    const top = Math.round(word.offsetTop)
    if (currentTop === null || Math.abs(top - currentTop) > 2) {
      lines.push([word.textContent ?? ''])
      currentTop = top
    } else {
      lines[lines.length - 1].push(word.textContent ?? '')
    }
  }

  return lines.map((line) => line.join(' '))
}

interface MaskedLinesProps {
  text: string
  /**
   * Animate on mount (the reviews, inside an AnimatePresence that also
   * plays their exit). Ignored when `inView` is set.
   */
  play?: boolean
  /**
   * Animate whenever the text scrolls into view instead of on mount: down
   * into the masks on entry, back up on leave, again on re-entry — the same
   * feel as the reviews' switching quotes.
   */
  inView?: boolean
}

/**
 * Text split into its rendered lines, measured from a hidden word layer so
 * the breaks match the real wrap. Each line lives in an overflow-hidden mask
 * and slides down from above when it plays, up and out on exit (instant
 * under reduced motion). Re-measures on resize and once the webfonts load.
 */
export function MaskedLines({ text, play = true, inView = false }: MaskedLinesProps) {
  const reduced = useReducedMotion() === true
  const measureRef = useRef<HTMLSpanElement>(null)
  const [lines, setLines] = useState<string[] | null>(null)

  // Measured before paint, so the lines are in place on the first frame.
  useLayoutEffect(() => {
    let cancelled = false
    let frame = 0

    const measure = () => {
      const container = measureRef.current
      if (!container) return
      const next = measureLines(container)
      if (cancelled || next.length === 0) return
      setLines((current) => {
        if (current && current.length === next.length && current.every((line, i) => line === next[i])) {
          return current
        }
        return next
      })
    }

    measure()
    document.fonts.ready.then(() => {
      if (!cancelled) measure()
    })
    const onResize = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(measure)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
    }
  }, [text])

  const words = text.split(' ')
  const measureLayer = (
    <span ref={measureRef} className="masked-lines-measure" aria-hidden="true">
      {words.map((word, index) => (
        <Fragment key={index}>
          <span data-word>{word}</span>{' '}
        </Fragment>
      ))}
    </span>
  )

  if (lines === null) return measureLayer

  if (reduced) {
    return (
      <>
        {measureLayer}
        <span className="masked-lines-stack">
          {lines.map((line, index) => (
            <span key={index} className="masked-lines-mask">
              <span className="masked-lines-line">{line}</span>
            </span>
          ))}
        </span>
      </>
    )
  }

  const stackChildren = lines.map((line, index) => (
    <span key={index} className="masked-lines-mask">
      <motion.span className="masked-lines-line" variants={lineVariants}>
        {line}
      </motion.span>
    </span>
  ))

  if (inView) {
    return (
      <>
        {measureLayer}
        <motion.span
          className="masked-lines-stack"
          variants={stackVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.5 }}
          exit="exit"
        >
          {stackChildren}
        </motion.span>
      </>
    )
  }

  return (
    <>
      {measureLayer}
      <motion.span
        className="masked-lines-stack"
        variants={stackVariants}
        initial="hidden"
        animate={play ? 'show' : 'hidden'}
        exit="exit"
      >
        {stackChildren}
      </motion.span>
    </>
  )
}
