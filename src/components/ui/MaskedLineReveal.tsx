// Adapted from Masked Line Reveal by Made for Award,
// https://www.madeforaward.com/ui/text/masked-line-reveal (MIT, repo https://github.com/shivc868/madeforaward-ui,
// licence checked 2026-11-07). Changes: no @gsap/react (gsap.context/matchMedia in useLayoutEffect, as the rest of
// this project does), reduced motion through gsap.matchMedia, and an exit that lifts the lines out of their masks
// when an AnimatePresence removes the element.
import { useLayoutEffect, useRef, type ElementType, type ReactNode } from 'react'
import { usePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

interface MaskedLineRevealProps {
  children: ReactNode
  /** Seconds each line takes to rise. */
  duration?: number
  /** Seconds between lines. */
  stagger?: number
  /** 'view' waits until the text scrolls into view, 'mount' starts at once. */
  trigger?: 'view' | 'mount'
  /** ScrollTrigger start, for trigger 'view'. */
  start?: string
  as?: ElementType
  className?: string
}

/**
 * Each rendered line rises out of its own mask, one after another. Lines are
 * measured by SplitText after layout and re-split when fonts load or the width
 * changes, so the reveal follows the real line breaks. Inside an AnimatePresence
 * the lines continue upward out of their masks before the element is removed.
 * Under reduced motion the text is simply shown.
 */
export function MaskedLineReveal({
  children,
  duration = 1.1,
  stagger = 0.1,
  trigger = 'view',
  start = 'top 85%',
  as: Tag = 'p',
  className,
}: MaskedLineRevealProps) {
  const rootRef = useRef<HTMLElement>(null)
  const linesRef = useRef<Element[]>([])
  const [isPresent, safeToRemove] = usePresence()

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      SplitText.create(root, {
        type: 'lines',
        mask: 'lines',
        // Gives each line's mask a class (.masked-line-reveal-line-mask in index.css).
        linesClass: 'masked-line-reveal-line',
        autoSplit: true,
        // Returned, so a re-split (resize, font load) keeps the progress.
        onSplit: (self) => {
          linesRef.current = self.lines
          gsap.set(root, { visibility: 'visible' })
          return gsap.from(self.lines, {
            yPercent: 125,
            duration,
            stagger,
            ease: 'expo.out',
            scrollTrigger: trigger === 'view' ? { trigger: root, start, once: true } : undefined,
          })
        },
      })
    })

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(root, { visibility: 'visible' })
    })

    return () => {
      linesRef.current = []
      mm.revert()
    }
  }, [duration, stagger, trigger, start])

  // Exit: the lines keep travelling upward, out of their masks.
  useLayoutEffect(() => {
    if (isPresent || !safeToRemove) return
    const lines = linesRef.current
    if (lines.length === 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      safeToRemove()
      return
    }
    const tween = gsap.to(lines, {
      yPercent: -110,
      duration: 0.5,
      stagger: 0.05,
      ease: 'power3.in',
      overwrite: true,
      onComplete: safeToRemove,
    })
    return () => {
      tween.kill()
    }
  }, [isPresent, safeToRemove])

  return (
    // Hidden until split, so the unsplit text never flashes.
    <Tag ref={rootRef} className={className} style={{ visibility: 'hidden' }}>
      {children}
    </Tag>
  )
}
