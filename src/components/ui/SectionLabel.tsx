import { forwardRef, useImperativeHandle, useLayoutEffect, useRef, type ElementType, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export interface SectionLabelHandle {
  /** Plays the opening animation (for a label with `autoplay={false}`). */
  play: () => void
}

interface SectionLabelProps {
  children: ReactNode
  /** Start when the label scrolls into view (default). With false it waits for `play()` on the ref,
   *  for a section that decides itself when its opening begins. */
  autoplay?: boolean
  /** The heading level the label stands in (it is the section's heading). */
  as?: ElementType
  className?: string
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
  { children, autoplay = true, as: Tag = 'h2', className = '' },
  handle,
) {
  const rootRef = useRef<HTMLElement>(null)
  const timeline = useRef<gsap.core.Timeline | null>(null)
  const openRef = useRef<HTMLSpanElement>(null)
  const closeRef = useRef<HTMLSpanElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

  useImperativeHandle(handle, () => ({ play: () => timeline.current?.play() }), [])

  useLayoutEffect(() => {
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
        scrollTrigger: autoplay
          ? { trigger: root, start: 'top 90%', once: true, invalidateOnRefresh: true, onEnter: () => tl.play() }
          : undefined,
      })
      timeline.current = tl
      tl.fromTo(close, { x: () => -travel() }, { x: 0, duration: 0.9, ease: 'power3.out', immediateRender: true })
        .to(text, { yPercent: 0, duration: 0.55, ease: 'power3.out' }, '-=0.05')
      return () => {
        timeline.current = null
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
