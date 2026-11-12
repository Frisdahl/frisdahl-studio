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
 * Orbit geometry, as fractions of the stage. The active image sits in the
 * centre, in portrait. The others sit on an ellipse around it in landscape,
 * slightly blurred and faded.
 */
const RING_RADIUS_X = 0.37 // × stage width
const RING_RADIUS_Y = 0.4 // × stage height
const RING_START_ANGLE = 300 // degrees clockwise from the top: upper left, upper right, bottom
const ORBIT_SCALE = 0.48 // width of a card on the ring, relative to the centre card
const ORBIT_OPACITY = 0.75
const ORBIT_BLUR_PX = 2.5
/**
 * Landscape window on the ring: the share of the portrait card's height hidden
 * at the top and at the bottom. Together with ORBIT_SCALE this makes a ring card
 * lose a little width but much more height than the centre card.
 */
const ORBIT_CROP_PERCENT = 26
const CARD_RADIUS_PX = 8

/** The ring never stops turning: degrees per second (one full turn in 40s). */
const SPIN_DEGREES_PER_SECOND = 9

/**
 * Per-card state. `reach` is how far the card is from the centre: 0 is the
 * centre (full width, sharp), 1 is on the ring (narrower, blurred, faded).
 * `tall` is its height: 1 is the full portrait card, 0 the landscape window.
 * They animate separately, so a card can arrive at the centre still landscape
 * and grow afterwards. `slot` is the card's place on the ring (0…count-2), or
 * -1 for the centre. It is exact and only ever changes in a swap. `base` is
 * the angle the card is currently drawn at, in degrees before the spin; it
 * animates towards its slot's angle, so an interrupted animation can never
 * corrupt the slot.
 */
type CardState = { reach: number; tall: number; base: number; slot: number }

/** The angle of a ring slot, in degrees before the spin. */
const slotAngle = (slot: number, count: number) => RING_START_ANGLE + (slot / (count - 1)) * 360

function createCards(count: number, centre: number): CardState[] {
  let slot = 0
  return Array.from({ length: count }, (_, index) => {
    if (index === centre) return { reach: 0, tall: 1, base: RING_START_ANGLE, slot: -1 }
    const state = { reach: 1, tall: 0, base: slotAngle(slot, count), slot }
    slot += 1
    return state
  })
}

/** Shortest signed turn from one angle to another, in degrees. */
const shortestTurn = (from: number, to: number) => ((((to - from) % 360) + 540) % 360) - 180

/**
 * Circular image carousel for "Hvad jeg kan tilbyde". It is controlled: the
 * accordion beside it owns which item is active, and clicking an image here
 * reports the same choice back through `onSelect`.
 *
 * Choosing an image swaps just two cards, whichever one it is: the chosen card
 * slides in from its slot to the centre, still landscape, and only then grows
 * to portrait, while the old centre card slides out into that slot and shrinks
 * back to landscape. The other cards stay in their slots. The
 * landscape/portrait change is a clip window over an unstretched portrait image.
 *
 * The ring also turns slowly and constantly, never pausing for the pointer.
 * It only stops while the carousel is off screen, and entirely with reduced
 * motion.
 *
 * Behaviour (an orbiting image selector) is the general technique seen on
 * kommakomma.is; no code or assets were taken from it.
 */
export function AddedValueOrbit({ items, activeIndex, onSelect }: AddedValueOrbitProps) {
  const count = items.length
  const stageRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([])
  const cards = useRef<CardState[]>(createCards(count, activeIndex))
  const centre = useRef(activeIndex)
  // Constant turn of the ring on top of the slots: how far it has turned.
  const spin = useRef({ degrees: 0 })

  const render = useCallback(() => {
    const stage = stageRef.current
    if (!stage) return
    const width = stage.clientWidth
    const height = stage.clientHeight

    cardRefs.current.forEach((card, index) => {
      const state = cards.current[index]
      if (!card || !state) return
      const { reach } = state
      const angle = ((state.base + spin.current.degrees) * Math.PI) / 180
      const crop = (ORBIT_CROP_PERCENT * (1 - state.tall)).toFixed(2)
      gsap.set(card, {
        xPercent: -50,
        yPercent: -50,
        x: Math.sin(angle) * RING_RADIUS_X * width * reach,
        y: -Math.cos(angle) * RING_RADIUS_Y * height * reach,
        scale: 1 - (1 - ORBIT_SCALE) * reach,
        opacity: 1 - (1 - ORBIT_OPACITY) * reach,
        zIndex: Math.round(200 - reach * 100),
        filter: reach > 0.001 ? `blur(${(ORBIT_BLUR_PX * reach).toFixed(2)}px)` : 'none',
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

  // The constant orbit. Runs on the GSAP ticker, only while the stage is on
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

      const tick = (_time: number, deltaTime: number) => {
        if (!visible) return
        spin.current.degrees += SPIN_DEGREES_PER_SECOND * (deltaTime / 1000)
        render()
      }
      gsap.ticker.add(tick)

      return () => {
        gsap.ticker.remove(tick)
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
    const target = slotAngle(slot, count)

    if (prefersReducedMotion()) {
      previous.base = target
      previous.reach = 1
      previous.tall = 0
      chosen.reach = 0
      chosen.tall = 1
      render()
      return
    }

    const timeline = gsap.timeline({ onUpdate: render })
    // Beat 1: the chosen card slides in, still landscape; the old centre card
    // slides out and shrinks to landscape.
    timeline.to(chosen, { reach: 0, duration: SLIDE_DURATION, ease: SLIDE_EASE }, 0)
    timeline.to(previous, { reach: 1, duration: SLIDE_DURATION, ease: SLIDE_EASE }, 0)
    timeline.to(previous, { tall: 0, duration: SHRINK_DURATION, ease: SHRINK_EASE }, 0)
    // Beat 2: once it is centred, the chosen card grows to portrait.
    timeline.to(chosen, { tall: 1, duration: GROW_DURATION, ease: GROW_EASE }, SLIDE_DURATION)
    // The old centre card leaves along the chosen card's slot. A card sitting in
    // the centre has no angle worth keeping, so it simply takes that slot's; a
    // card still on its way in (rapid clicks) turns to it by the shortest way.
    if (previous.reach < 0.02) {
      previous.base = target
    } else {
      timeline.to(previous, { base: previous.base + shortestTurn(previous.base, target), duration: SLIDE_DURATION, ease: SLIDE_EASE }, 0)
    }
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
