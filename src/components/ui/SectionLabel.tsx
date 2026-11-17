import { forwardRef, useImperativeHandle, useLayoutEffect, useRef, type ElementType, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** The moving parts of a label, for a section that drives the opening itself (a scrubbed timeline). */
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
  className?: string
  /** Opens by itself when it scrolls into view (default). With false the label stays finished and a
   *  parent animates it through `ref.current.parts()`. */
  autoplay?: boolean
}

export interface SectionLabelHandle {
  parts: () => SectionLabelParts | null
}

/**
 * A small section heading written as ( LABEL ). When it scrolls into view both brackets
 * start together at the left as "( )"; the closing bracket slides right to the end of the
 * label, then the text rises out of a mask between them. The label is laid out in its final
 * state from the start, so nothing shifts; only the closing bracket and the text are moved
 * (transform only). Reduced motion: the finished label, no movement. The brackets are
 * decoration, so only the text is the heading's accessible name.
 */
export const SectionLabel = forwardRef<SectionLabelHandle, SectionLabelProps>(function SectionLabel(
  { children, as: Tag = 'h2', className = '', autoplay = true },
  handle,
) {
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
    if (!autoplay) return
    const root = rootRef.current
    const open = openRef.current
    const close = closeRef.current
    const text = textRef.current
    if (!root || !open || !close || !text) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // How far the closing bracket has to travel back to stand right after the opening one.
      const travel = () => close.offsetLeft - (open.offsetLeft + open.offsetWidth)
      gsap.set(text, { yPercent: 115 })
      const tl = gsap.timeline({
        paused: true,
        scrollTrigger: {
          trigger: root,
          start: 'top 80%',
          once: true,
          invalidateOnRefresh: true,
          onEnter: () => tl.play(),
        },
      })
      tl.fromTo(close, { x: () => -travel() }, { x: 0, duration: 1.2, ease: 'power3.out', immediateRender: true })
        .to(text, { yPercent: 0, duration: 0.8, ease: 'power3.out' }, '-=0.1')
      return () => {
        gsap.set([close, text], { clearProps: 'transform' })
      }
    })
    return () => mm.revert()
  }, [autoplay])

  return (
    <Tag ref={rootRef} className={`section-label ${className}`.trim()}>
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
  )
})
