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
import { DUR, EASE, STAGGER } from '../../lib/motion'

gsap.registerPlugin(ScrollTrigger, SplitText)

interface MaskedLineRevealProps {
  children: ReactNode
  /** Seconds each line takes to rise. */
  duration?: number
  /** Seconds between lines. */
  stagger?: number
  /** GSAP ease of the rise. */
  ease?: string
  /** 'view' waits until the text scrolls into view, 'mount' starts at once. */
  trigger?: 'view' | 'mount'
  /** ScrollTrigger start, for trigger 'view'. */
  start?: string
  /** For trigger 'view': start when the nearest ancestor matching this selector reaches `start`
   *  (a card's row), instead of when the text itself does. */
  triggerClosest?: string
  /** Undo the split once the reveal has played, so the text is plain again afterwards (and later
   *  code that splits it, such as a page transition, finds ordinary text). It then no longer
   *  re-splits on resize. */
  revertWhenDone?: boolean
  /** Seconds to wait before the first line starts. */
  delay?: number
  /** Hold the reveal until this has resolved (the page cover going, see lib/pageReveal.ts). */
  startAfter?: Promise<void>
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
  duration = DUR.lineLong,
  stagger = STAGGER.slow,
  ease = EASE.reveal,
  trigger = 'view',
  start = 'top 85%',
  triggerClosest,
  revertWhenDone = false,
  delay = 0,
  startAfter,
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
    // With startAfter the reveal is built paused and played once that has resolved; a
    // re-split (resize, fonts) before then builds the next one paused too.
    let started = !startAfter
    let reveal: gsap.core.Tween | null = null
    let cancelled = false
    startAfter?.then(() => {
      started = true
      if (!cancelled) reveal?.play()
    })

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      SplitText.create(root, {
        type: 'lines',
        mask: 'lines',
        // Keeps the text readable to assistive tech (the default hides the lines and puts an
        // aria-label on the parent, which is not allowed on a <p>, <span> or <div>).
        aria: 'none',
        // Gives each line's mask a class (.masked-line-reveal-line-mask in index.css).
        linesClass: 'masked-line-reveal-line',
        autoSplit: true,
        // Returned, so a re-split (resize, font load) keeps the progress.
        onSplit: (self) => {
          linesRef.current = self.lines
          gsap.set(root, { visibility: 'visible' })
          // Splitting a link leaves an empty copy of it beside the real one (until the split is
          // undone): out of the tab order and the accessibility tree, so there is no second link.
          root.querySelectorAll('a:empty').forEach((link) => {
            link.setAttribute('tabindex', '-1')
            link.setAttribute('aria-hidden', 'true')
          })
          reveal = gsap.from(self.lines, {
            yPercent: 125,
            duration,
            stagger,
            delay,
            ease,
            paused: !started,
            scrollTrigger:
              trigger === 'view'
                ? { trigger: (triggerClosest ? root.closest(triggerClosest) : null) ?? root, start, once: true }
                : undefined,
            onComplete: revertWhenDone
              ? () => {
                  linesRef.current = []
                  self.revert()
                }
              : undefined,
          })
          return reveal
        },
      })
    })

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(root, { visibility: 'visible' })
    })

    return () => {
      cancelled = true
      linesRef.current = []
      mm.revert()
    }
  }, [duration, stagger, ease, trigger, start, triggerClosest, revertWhenDone, delay, startAfter])

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
