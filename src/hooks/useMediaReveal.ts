import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DUR, EASE, REVEAL_START } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

const CLOSED = 'inset(50% 0% 50% 0%)'
const OPEN = 'inset(0% 0% 0% 0%)'

/**
 * A picture or panel that is below the fold opens from its vertical centre to its full height when
 * it scrolls in: the same gesture as the images of a page's entrance (lib/pageEntrance.ts), so
 * what arrives on load and what arrives on scroll belong together.
 *
 * - Only what starts below the first screen is touched; the first screen is the page's entrance's.
 * - A clip-path, so nothing moves or reflows; it is removed when it has played.
 * - It plays once and stays (scrolling back up does not close it again).
 * - Reduced motion: nothing is hidden, nothing plays.
 *
 * `delay` (seconds) lets the second of a pair open a beat after the first.
 */
export function useMediaReveal<T extends HTMLElement = HTMLElement>(delay = 0) {
  const ref = useRef<T>(null)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Measured in the document, not the window: the page may still be scrolled when this mounts.
      const top = element.getBoundingClientRect().top + window.scrollY
      if (top < window.innerHeight * 0.88) return

      gsap.set(element, { clipPath: CLOSED })
      const reveal = gsap.fromTo(
        element,
        { clipPath: CLOSED },
        { clipPath: OPEN, duration: DUR.imageOpen, delay, ease: EASE.reveal, clearProps: 'clipPath', paused: true },
      )
      const trigger = ScrollTrigger.create({
        trigger: element,
        start: REVEAL_START,
        once: true,
        onEnter: () => reveal.play(),
      })
      return () => {
        trigger.kill()
        reveal.kill()
        gsap.set(element, { clearProps: 'clipPath' })
      }
    })

    return () => mm.revert()
  }, [delay])

  return ref
}
