import { useCallback, useLayoutEffect, useRef } from 'react'
import type { KeyboardEvent } from 'react'
import gsap from 'gsap'
import { IMAGE_SIZES, responsiveImageProps } from '../../lib/responsiveImage'
import { prefersReducedMotion } from '../../lib/scroll'

export type OrbitItem = {
  title: string
  imageSrc: string
  imageAlt: string
}

type AddedValueOrbitProps = {
  items: readonly OrbitItem[]
  activeIndex: number
  onSelect: (index: number) => void
}

/**
 * A swap in two beats. The chosen card first slides to the centre while still
 * landscape (large movement: `power3.inOut`, like the case reveals), then grows
 * to portrait once it is centred. The old centre card shrinks to landscape as
 * it leaves, during the slide.
 */
const SLIDE_DURATION = 0.85
const SLIDE_EASE = 'power3.inOut'
const GROW_DURATION = 0.6
const GROW_EASE = 'power3.out'
const SHRINK_DURATION = 0.6
const SHRINK_EASE = 'power3.inOut'

/**
 * Line geometry, as fractions of the stage. The active image sits in the
 * centre, in portrait. The others sit on one straight line through it, in list
 * order, two on each side: a near pair and a far pair. A card's place on the
 * line is its `pos` (0 is the centre, ±1 the near pair, ±2 the far pair), and
 * everything about how it is drawn is read off that number, so a card keeps
 * changing smoothly while it travels. The near pair is small and sharp, the far
 * pair larger, softer and fainter, as in the reference.
 */
const LINE_OFFSET = [0, 0.56, 0.74] // × stage width, at pos 0, 1, 2
const LINE_SCALE = [1, 0.22, 0.36] // width of a card, relative to the centre card
const LINE_OPACITY = [1, 0.95, 0.8]
const LINE_BLUR_PX = [0, 1, 3]
/**
 * Landscape window on the line: the share of the portrait card's height hidden
 * at the top and at the bottom.
 */
const LINE_CROP_PERCENT = 26
const CARD_RADIUS_PX = 8
/**
 * The line never stops turning clockwise around the centre card, as in the
 * reference (about 9° a second, measured from it): degrees per second. The
 * angle only grows; the line looks the same after 180°, so it simply keeps going.
 */
const SPIN_DEGREES_PER_SECOND = 9
const SPIN_START_DEGREES = 8

/**
 * The centre card follows the cursor: it drifts a little towards it and tilts
 * in 3D to face it. The cursor's distance from the stage centre, in stage
 * widths and heights, maps to -1…1. The follow is smoothed (time constant in
 * seconds) so it trails the pointer instead of snapping to it.
 */
const FOLLOW_DRIFT = 0.03 // × stage width, at full follow
const FOLLOW_TILT_DEGREES = 9
const FOLLOW_SMOOTHING_SECONDS = 0.18
const FOLLOW_PERSPECTIVE_PX = 900

/** Linear interpolation through a three-point table, by |pos| (0 to 2). */
function along(table: readonly number[], distance: number) {
  const d = Math.min(Math.abs(distance), 2)
  const i = Math.min(Math.floor(d), 1)
  return table[i] + (table[i + 1] - table[i]) * (d - i)
}

/**
 * Per-card state. `pos` is the card's place on the line (see above); it
 * animates between slots. `tall` is its height: 1 is the full portrait card, 0
 * the landscape window; it animates separately, so a card can arrive at the
 * centre still landscape and grow afterwards. `slot` is the card's place among
 * the inactive cards (0…count-2), or -1 for the centre. It is exact and only
 * ever changes in a swap, so an interrupted animation can never corrupt it.
 */
type CardState = { pos: number; tall: number; slot: number }

/** The line position of an inactive slot: -2, -1, 1, 2 for four of them. */
const slotPos = (slot: number, count: number) => {
  const rank = slot - (count - 2) / 2 // centred on zero, in steps of one
  return rank < 0 ? rank - 0.5 : rank + 0.5
}

function createCards(count: number, centre: number): CardState[] {
  let slot = 0
  return Array.from({ length: count }, (_, index) => {
    if (index === centre) return { pos: 0, tall: 1, slot: -1 }
    const state = { pos: slotPos(slot, count), tall: 0, slot }
    slot += 1
    return state
  })
}

/**
 * Image carousel for "Hvad jeg kan tilbyde". It is controlled: the accordion
 * beside it owns which item is active, and clicking an image here reports the
 * same choice back through `onSelect`.
 *
 * Choosing an image swaps just two cards, whichever one it is: the chosen card
 * slides in from its place on the line to the centre, still landscape, and
 * only then grows to portrait, while the old centre card slides out into that
 * place and shrinks back to landscape. The other cards stay in their places on
 * the line. The landscape/portrait change is a clip window over an unstretched
 * portrait image.
 *
 * The line itself never stops turning around the centre card, so the inactive
 * cards orbit it constantly, never pausing for the pointer. It only stops while
 * the carousel is off screen, and entirely with reduced motion.
 *
 * Behaviour (an image selector with the inactive images on a turning line) is
 * the general technique seen on kommakomma.is; no code or assets were taken
 * from it.
 */
export function AddedValueOrbit({ items, activeIndex, onSelect }: AddedValueOrbitProps) {
  const count = items.length
  const stageRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([])
  const cards = useRef<CardState[]>(createCards(count, activeIndex))
  const centre = useRef(activeIndex)
  // How far the line has turned, in degrees (0 is horizontal, positive turns
  // clockwise). Only the ticker below changes it.
  const spin = useRef({ degrees: SPIN_START_DEGREES })
  // Where the cursor is (`pointer`, -1…1 from the stage centre) and where the
  // centre card has got to in following it (`follow`).
  const pointer = useRef({ x: 0, y: 0 })
  const follow = useRef({ x: 0, y: 0 })

  const render = useCallback(() => {
    const stage = stageRef.current
    if (!stage) return
    const width = stage.clientWidth
    const height = stage.clientHeight
    const tilt = (spin.current.degrees * Math.PI) / 180

    cardRefs.current.forEach((card, index) => {
      const state = cards.current[index]
      if (!card || !state) return
      const distance = Math.abs(state.pos)
      const offset = Math.sign(state.pos) * along(LINE_OFFSET, distance) * width
      const blur = along(LINE_BLUR_PX, distance)
      const crop = (LINE_CROP_PERCENT * (1 - state.tall)).toFixed(2)
      // Only the card in the centre follows the cursor (fading out as it leaves).
      const centred = Math.max(0, 1 - distance)
      gsap.set(card, {
        xPercent: -50,
        yPercent: -50,
        x: Math.cos(tilt) * offset + follow.current.x * FOLLOW_DRIFT * width * centred,
        y: Math.sin(tilt) * offset + follow.current.y * FOLLOW_DRIFT * height * centred,
        transformPerspective: FOLLOW_PERSPECTIVE_PX,
        rotationY: follow.current.x * FOLLOW_TILT_DEGREES * centred,
        rotationX: -follow.current.y * FOLLOW_TILT_DEGREES * centred,
        scale: along(LINE_SCALE, distance),
        opacity: along(LINE_OPACITY, distance),
        zIndex: Math.round(200 - distance * 50),
        filter: blur > 0.01 ? `blur(${blur.toFixed(2)}px)` : 'none',
        clipPath: `inset(${crop}% 0% ${crop}% 0% round ${CARD_RADIUS_PX}px)`,
      })
    })
  }, [])

  // First paint and every resize: place the cards.
  useLayoutEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    render()
    const observer = new ResizeObserver(render)
    observer.observe(stage)
    return () => observer.disconnect()
  }, [render])

  // The constant turn, and the smoothed follow of the cursor. Runs on the GSAP ticker, only while the stage is on
  // screen, and only when the visitor has not asked for reduced motion.
  useLayoutEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      let visible = false
      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting
      })
      observer.observe(stage)

      const clamp = (value: number) => Math.max(-1, Math.min(1, value))
      const handlePointerMove = (event: PointerEvent) => {
        if (event.pointerType === 'touch') return
        const box = stage.getBoundingClientRect()
        pointer.current.x = clamp((event.clientX - (box.left + box.width / 2)) / box.width)
        pointer.current.y = clamp((event.clientY - (box.top + box.height / 2)) / box.height)
      }
      const handlePointerLeave = () => {
        pointer.current.x = 0
        pointer.current.y = 0
      }
      window.addEventListener('pointermove', handlePointerMove, { passive: true })
      document.documentElement.addEventListener('pointerleave', handlePointerLeave)

      const tick = (_time: number, deltaTime: number) => {
        if (!visible) return
        const seconds = deltaTime / 1000
        spin.current.degrees += SPIN_DEGREES_PER_SECOND * seconds
        const ease = 1 - Math.exp(-seconds / FOLLOW_SMOOTHING_SECONDS)
        follow.current.x += (pointer.current.x - follow.current.x) * ease
        follow.current.y += (pointer.current.y - follow.current.y) * ease
        render()
      }
      gsap.ticker.add(tick)

      return () => {
        gsap.ticker.remove(tick)
        window.removeEventListener('pointermove', handlePointerMove)
        document.documentElement.removeEventListener('pointerleave', handlePointerLeave)
        observer.disconnect()
      }
    })

    return () => mm.revert()
  }, [render])

  // Swap the chosen card with the centre card whenever the active item changes
  // (from here or from the accordion).
  useLayoutEffect(() => {
    const chosen = cards.current[activeIndex]
    const previous = cards.current[centre.current]
    if (!chosen || !previous || activeIndex === centre.current) return
    centre.current = activeIndex

    gsap.killTweensOf([chosen, previous])

    // Swap the slots first, exactly. Everything below only animates towards them.
    const slot = chosen.slot
    previous.slot = slot
    chosen.slot = -1
    const target = slotPos(slot, count)

    if (prefersReducedMotion()) {
      previous.pos = target
      previous.tall = 0
      chosen.pos = 0
      chosen.tall = 1
      render()
      return
    }

    const timeline = gsap.timeline({ onUpdate: render })
    // Beat 1: the chosen card slides in, still landscape; the old centre card
    // slides out and shrinks to landscape.
    timeline.to(chosen, { pos: 0, duration: SLIDE_DURATION, ease: SLIDE_EASE }, 0)
    timeline.to(previous, { pos: target, duration: SLIDE_DURATION, ease: SLIDE_EASE }, 0)
    timeline.to(previous, { tall: 0, duration: SHRINK_DURATION, ease: SHRINK_EASE }, 0)
    // Beat 2: once it is centred, the chosen card grows to portrait.
    timeline.to(chosen, { tall: 1, duration: GROW_DURATION, ease: GROW_EASE }, SLIDE_DURATION)
  }, [activeIndex, count, render])

  useLayoutEffect(() => {
    const states = cards.current
    return () => {
      gsap.killTweensOf(states)
    }
  }, [])

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 0
    if (step === 0) return
    event.preventDefault()
    const next = (activeIndex + step + count) % count
    onSelect(next)
    cardRefs.current[next]?.focus({ preventScroll: true })
  }

  return (
    <div
      ref={stageRef}
      className="added-value-orbit"
      role="group"
      aria-label="Billeder af det jeg tilbyder"
      onKeyDown={handleKeyDown}
    >
      {items.map((item, index) => {
        const isActive = index === activeIndex
        return (
          <button
            key={item.imageSrc}
            ref={(node) => {
              cardRefs.current[index] = node
            }}
            type="button"
            className={`added-value-orbit-card${isActive ? ' is-active' : ''}`}
            aria-label={item.title}
            aria-pressed={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(index)}
          >
            <img
              {...responsiveImageProps(item.imageSrc, IMAGE_SIZES.halfFromDesktop)}
              alt={item.imageAlt}
              className="added-value-orbit-image"
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </button>
        )
      })}
    </div>
  )
}
