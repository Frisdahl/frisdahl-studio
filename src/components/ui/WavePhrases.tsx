import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { HeadingDot } from './HeadingDot'

interface WavePhrasesProps {
  /** The phrases to cycle through; a trailing full stop becomes the heading's red dot. */
  phrases: readonly string[]
  className?: string
}

// How long a phrase stays before the next one takes its place (s).
const HOLD = 2.8
// A wave runs left to right: each character starts this much after the one before it (s).
const STAGGER = 0.035
// Leaving is quicker than arriving.
const EXIT_DURATION = 0.5
const EXIT_EASE = 'power3.in'
const ENTER_DURATION = 0.75
const ENTER_EASE = 'power3.out'
// The next phrase starts rising once the old one is this far into leaving (s), so the two
// waves overlap into one movement.
const ENTER_DELAY = 0.22

/** A phrase as one span per character (spaces kept), the closing full stop as the red dot. */
function Phrase({ text, active }: { text: string; active: boolean }) {
  const hasDot = text.endsWith('.')
  const letters = Array.from(hasDot ? text.slice(0, -1) : text)
  return (
    <span className="wave-phrase" data-active={active ? 'true' : undefined} aria-hidden="true">
      {letters.map((char, index) => (
        <span key={index} className="wave-char">
          {char === ' ' ? ' ' : char}
        </span>
      ))}
      {hasDot ? (
        <span className="wave-char wave-char-dot">
          <HeadingDot />
        </span>
      ) : null}
    </span>
  )
}

/**
 * A line of text that swaps between phrases. The current phrase leaves in a wave from
 * left to right, each character sliding up out of the line, while the next phrase's
 * characters rise into place from below in the same left-to-right wave.
 *
 * All the phrases sit in one grid cell, so the line is as wide as the widest and nothing
 * around it moves. Only the first is shown at rest: with reduced motion it simply stays.
 * Spoken text is the first phrase only (the rest is decoration, hidden from screen readers).
 */
export function WavePhrases({ phrases, className = '' }: WavePhrasesProps) {
  const rootRef = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || phrases.length < 2) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const items = gsap.utils.toArray<HTMLElement>('.wave-phrase', root)
      const chars = (item: HTMLElement) => gsap.utils.toArray<HTMLElement>('.wave-char', item)
      let current = 0
      // What is running now, so leaving the page stops all of it.
      let wait: gsap.core.Tween | null = null
      let running: gsap.core.Timeline | null = null

      // The others wait below their line, hidden.
      items.forEach((item, index) => {
        if (index !== 0) gsap.set(chars(item), { yPercent: 115 })
      })

      const swap = () => {
        const from = items[current]
        const next = (current + 1) % items.length
        const to = items[next]
        current = next

        gsap.set(to, { visibility: 'visible' })
        gsap.set(chars(to), { yPercent: 115 })
        running = gsap
          .timeline({
            onComplete: () => {
              gsap.set(from, { visibility: 'hidden' })
              wait = gsap.delayedCall(HOLD, swap)
            },
          })
          .to(chars(from), { yPercent: -115, duration: EXIT_DURATION, ease: EXIT_EASE, stagger: STAGGER }, 0)
          .to(chars(to), { yPercent: 0, duration: ENTER_DURATION, ease: ENTER_EASE, stagger: STAGGER }, ENTER_DELAY)
      }

      wait = gsap.delayedCall(HOLD, swap)
      return () => {
        wait?.kill()
        running?.kill()
      }
    })

    return () => mm.revert()
  }, [phrases])

  return (
    <span ref={rootRef} className={`wave-phrases ${className}`.trim()}>
      <span className="wave-phrases-label">{phrases[0]}</span>
      {phrases.map((text, index) => (
        <Phrase key={text} text={text} active={index === 0} />
      ))}
    </span>
  )
}
