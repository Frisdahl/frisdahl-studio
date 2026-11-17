import { forwardRef, useImperativeHandle, useLayoutEffect, useRef, type ElementType, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** The moving parts of a label, for a section that drives the opening itself (a timeline of its own). */
export interface SectionLabelParts {
  /** The closing bracket. */
  close: HTMLSpanElement
  /** The text that rises out of its mask. */
  text: HTMLSpanElement
  /** How far (px) the closing bracket must be moved back to stand right after the opening one. */
  travel: () => number
}

interface SectionLabelProps {
  children: ReactNode
  /** The heading level the label stands in (it is the section's heading). */
  as?: ElementType
  /** Classes for the label's box in the page grid (columns, margins). */
  className?: string
  /** Opens by itself (default). With false a parent animates it through `ref.current.parts()`. */
  autoplay?: boolean
  /**
   * Comes up early and holds (default): the label shows up a little before its section, stays put on
   * the screen while the page goes on scrolling and its opening plays, and docks in its own place
   * when the section's content reaches it. With false it just sits in its place.
   */
  early?: boolean
}

export interface SectionLabelHandle {
  parts: () => SectionLabelParts | null
}

/** How far ahead of its place the label comes up (and how long it holds), as a share of the screen's height. */
const LEAD = 0.14
/** Where on the screen it holds, as a share of the screen's height from the top. */
const HOLD_AT = 0.3
/** Its opening starts when it has come this far up the screen (a share of the screen's height). */
const OPEN_AT = 0.9

/**
 * A small section heading written as ( LABEL ). Both brackets start together at the left as "( )";
 * the closing bracket slides right to the end of the label, then the text rises out of a mask
 * between them. The label is laid out in its final state from the start, so nothing shifts; only
 * the closing bracket, the text and (while it holds) the label itself are moved, by transform.
 *
 * Early and hold: `y` below is where the label's own place is on the screen. While that place is
 * lower than HOLD_AT, the label is lifted by up to LEAD of the screen's height, so it comes into view
 * earlier; for the next LEAD of scrolling it stays at HOLD_AT; then its own place has caught up and
 * it moves with the page. The opening plays during the approach, so it has finished when the
 * section's content arrives.
 *
 * Reduced motion: the finished label in its place, no movement. The brackets are decoration, so only
 * the text is the heading's accessible name.
 */
export const SectionLabel = forwardRef<SectionLabelHandle, SectionLabelProps>(function SectionLabel(
  { children, as: Tag = 'h2', className = '', autoplay = true, early = true },
  handle,
) {
  const anchorRef = useRef<HTMLDivElement>(null)
  const rootRef = useRef<HTMLElement>(null)
  const openRef = useRef<HTMLSpanElement>(null)
  const closeRef = useRef<HTMLSpanElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

  useImperativeHandle(
    handle,
    () => ({
      parts: () => {
        const open = openRef.current
        const close = closeRef.current
        const text = textRef.current
        if (!open || !close || !text) return null
        return { close, text, travel: () => close.offsetLeft - (open.offsetLeft + open.offsetWidth) }
      },
    }),
    [],
  )

  useLayoutEffect(() => {
    const anchor = anchorRef.current
    const root = rootRef.current
    const open = openRef.current
    const close = closeRef.current
    const text = textRef.current
    if (!anchor || !root || !open || !close || !text) return
    if (!autoplay && !early) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const travel = () => close.offsetLeft - (open.offsetLeft + open.offsetWidth)
      let tl: gsap.core.Timeline | null = null
      if (autoplay) {
        gsap.set(text, { yPercent: 115 })
        tl = gsap
          .timeline({ paused: true })
          .fromTo(close, { x: () => -travel() }, { x: 0, duration: 1.2, ease: 'power3.out', immediateRender: true })
          .to(text, { yPercent: 0, duration: 0.8, ease: 'power3.out' }, '-=0.1')
      }

      let shift = 0
      let opened = false
      const update = () => {
        const height = window.innerHeight
        // Where the label's own place is on the screen (the anchor is never moved).
        const y = anchor.getBoundingClientRect().top
        if (early) {
          const next = gsap.utils.clamp(0, LEAD * height, y - HOLD_AT * height)
          if (next !== shift) {
            shift = next
            gsap.set(root, { y: -shift })
          }
        }
        // Where it is shown now.
        if (tl && !opened && y - shift <= OPEN_AT * height) {
          opened = true
          tl.play()
        }
      }

      const trigger = ScrollTrigger.create({
        trigger: anchor,
        start: () => `top bottom+=${Math.round(LEAD * window.innerHeight)}`,
        end: 'top top',
        invalidateOnRefresh: true,
        onUpdate: update,
        onRefresh: update,
      })
      update()

      return () => {
        trigger.kill()
        tl?.kill()
        gsap.set([root, close, text], { clearProps: 'transform' })
      }
    })
    return () => mm.revert()
  }, [autoplay, early])

  return (
    <div ref={anchorRef} className={`section-label-anchor ${className}`.trim()}>
      <Tag ref={rootRef} className="section-label">
        <span ref={openRef} className="section-label-paren" aria-hidden="true">
          (
        </span>
        <span className="section-label-mask">
          <span ref={textRef} className="section-label-text">
            {children}
          </span>
        </span>
        <span ref={closeRef} className="section-label-paren" aria-hidden="true">
          )
        </span>
      </Tag>
    </div>
  )
})
