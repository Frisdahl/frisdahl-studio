import { useEffect, useId, useRef } from 'react'
import gsap from 'gsap'
import { motion, useReducedMotion } from 'framer-motion'
import { useLocale } from '../../context/LocaleContext'
import { getHomeContent } from '../../data/home'
import { Container, SectionLabel } from '../ui'

// The mark colour (--color-dark). SVG attributes cannot use CSS variables, so
// the value is repeated here.
const INK = '#131313'

type IconName = 'brand' | 'design' | 'development'

const PENTAGON = '16,19 26.5,26.6 22.5,38.9 9.5,38.9 5.5,26.6'
const SQUARE = '16,20.5 25.5,20.5 25.5,39.5 6.5,39.5 6.5,20.5'

// The layout mark's rectangles: x, y, w, h (and fill) for each of its two
// compositions. Rectangles that are not part of one collapse to zero height.
type Rect = { x: number; y: number; width: number; height: number; fill?: string }
const LAYOUTS: Rect[][] = [
  // One wide rectangle on top, two tall ones beneath.
  [
    { x: 6, y: 8, width: 36, height: 8 },
    { x: 6, y: 18, width: 17.5, height: 21 },
    { x: 24.5, y: 18, width: 17.5, height: 21 },
    { x: 6, y: 39, width: 36, height: 0 },
    { x: 6, y: 39, width: 36, height: 0 },
  ],
  // Three squares in a row, two wide rows beneath.
  [
    { x: 6, y: 8, width: 11, height: 11 },
    { x: 18.5, y: 8, width: 11, height: 11 },
    { x: 31, y: 8, width: 11, height: 11 },
    { x: 6, y: 21, width: 36, height: 8 },
    { x: 6, y: 31, width: 36, height: 8 },
  ],
]

/**
 * Looping marks, one per column: shapes that morph, a layout that re-flows and
 * arrowheads that flatten and return. Each timeline only runs while its mark
 * is on screen; with reduced motion the marks stay at rest.
 */
function ColumnIcon({ name, reduced }: { name: IconName; reduced: boolean }) {
  const ref = useRef<SVGSVGElement>(null)
  const clipId = useId().replace(/:/g, '')

  useEffect(() => {
    const svg = ref.current
    if (!svg || reduced) return
    const q = (selector: string) => svg.querySelectorAll<SVGElement>(selector)
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, paused: true })

      if (name === 'brand') {
        // One 3.8 s loop: the pentagon grows and turns, a circle grows in at the
        // top right, a triangle pops in, the pentagon turns into a square while the
        // circle shrinks away, then the triangle and the square shrink to nothing.
        const hex = '.av-pentagon'
        const circle = '.av-circle'
        const tri = '.av-triangle'
        gsap.set([hex, circle, tri], { transformOrigin: '50% 50%' })
        tl.fromTo(hex, { scale: 0.3, rotation: -30, attr: { points: PENTAGON } }, { scale: 1, rotation: 0, duration: 0.45, ease: 'power2.out' }, 0)
          .to(hex, { rotation: -16, duration: 2.2, ease: 'sine.inOut' }, 0.45)
          .fromTo(circle, { scale: 0 }, { scale: 1, duration: 0.55, ease: 'power2.out' }, 1.1)
          .fromTo(tri, { scale: 0, rotation: -40 }, { scale: 1, rotation: 0, duration: 0.4, ease: 'back.out(1.6)' }, 2.15)
          .to(hex, { attr: { points: SQUARE }, rotation: 22, duration: 0.8, ease: 'power2.inOut' }, 2.4)
          .to(circle, { scale: 0, duration: 0.4, ease: 'power2.in' }, 2.5)
          .to(tri, { scale: 0, duration: 0.35, ease: 'power2.in' }, 2.95)
          .to(hex, { scale: 0, duration: 0.35, ease: 'power2.in' }, 3.15)
          .to({}, { duration: 0.3 }, 3.5)
      } else if (name === 'design') {
        // Two layers of rectangles. The current layout slides up and out
        // together; once it has gone, each rectangle of the next one fades in on
        // its own, in reading order (row by row, left to right).
        const sets = [Array.from(q('.av-set-0 .av-block')), Array.from(q('.av-set-1 .av-block'))]
        const place = (set: SVGElement[], layout: Rect[]) =>
          set.forEach((el, i) => {
            const { fill = INK, ...attrs } = layout[i]
            gsap.set(el, { attr: attrs, fill, y: 0, opacity: 0 })
          })
        // The rest state, set at time 0 of the timeline so every loop starts
        // from it.
        sets[0].forEach((el, i) => {
          const { fill = INK, ...attrs } = LAYOUTS[0][i]
          tl.set(el, { attr: attrs, fill, y: 0, opacity: 1 }, 0)
        })
        tl.set(sets[1], { y: 0, opacity: 0 }, 0)
        let current = 0
        const next = (layout: Rect[]) => {
          const t = tl.duration()
          const n = 1 - current
          tl.add(() => place(sets[n], layout), t)
          tl.to(sets[current], { y: -44, duration: 1, ease: 'power2.inOut' }, t)
          const order = layout
            .map((r, i) => ({ r, i }))
            .filter(({ r }) => r.height > 0)
            .sort((a, b) => a.r.y - b.r.y || a.r.x - b.r.x)
          order.forEach(({ i }, rank) => {
            tl.fromTo(sets[n][i], { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power1.out', immediateRender: false }, t + 1.1 + rank * 0.16)
          })
          current = n
        }
        tl.to({}, { duration: 1.6 })
        next(LAYOUTS[1])
        tl.to({}, { duration: 1.6 })
        next(LAYOUTS[0])
      } else {
        // The arrowheads turn edge-on (flatten) as they slide off to the right,
        // fading, one after another, then come back in from the left the same way.
        const arrows = q('.av-arrow')
        gsap.set(arrows, { transformOrigin: '50% 50%' })
        const train = { each: 0.08, from: 'end' } as const
        tl.to({}, { duration: 2 })
          .to(arrows, { x: 24, scaleX: 0.03, opacity: 0, duration: 0.7, ease: 'power2.in', stagger: train })
          .set(arrows, { x: -24, scaleX: 0.03 })
          .to(arrows, { x: 0, scaleX: 1, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: train })
      }

      const observer = new IntersectionObserver(([entry]) => (entry.isIntersecting ? tl.play() : tl.pause()), { threshold: 0.1 })
      observer.observe(svg)
      return () => observer.disconnect()
    }, svg)
    return () => ctx.revert()
  }, [name, reduced])

  const common = {
    ref,
    className: `added-value-icon added-value-icon--${name}`,
    viewBox: '0 0 48 48',
    'aria-hidden': true,
    focusable: false,
  } as const

  if (name === 'brand') {
    return (
      <svg {...common}>
        <polygon className="av-pentagon" points={PENTAGON} />
        <circle className="av-circle" cx="38" cy="11" r="5.5" />
        <polygon className="av-triangle" points="29,45 44,45 36.5,30" />
      </svg>
    )
  }

  if (name === 'design') {
    return (
      <svg {...common}>
        <defs>
          <clipPath id={clipId}>
            <rect x="4" y="6" width="40" height="36" />
          </clipPath>
        </defs>
        <g clipPath={`url(#${clipId})`}>
          {[0, 1].map((set) => (
            <g key={set} className={`av-set-${set}`}>
              {LAYOUTS[0].map((r, i) => (
                <rect key={i} className="av-block" {...r} fill={INK} />
              ))}
            </g>
          ))}
        </g>
      </svg>
    )
  }

  return (
    <svg {...common}>
      {[0, 1, 2, 3].map((i) => (
        <polygon
          key={i}
          className="av-arrow"
          points={`${4 + i * 10},8 ${4 + i * 10},40 ${14.5 + i * 10},24`}
        />
      ))}
    </svg>
  )
}

/**
 * "What I can offer": the heading is a small ( UPPERCASE ) label on the left that stays on the screen
 * (sticky) while the three offers, stacked one under the other on the right, scroll past it. Each
 * offer has a numbered label, a title, a short list and a looping geometric mark. Stacked on phones
 * and tablets (the label is not sticky there).
 */
export function AddedValueSection() {
  const { locale } = useLocale()
  const { addedValue } = getHomeContent(locale)
  const reduceMotion = useReducedMotion()

  return (
    <section className="added-value" aria-label={addedValue.ariaLabel}>
      <Container columns>
        <div className="added-value-aside">
          <SectionLabel className="added-value-label-heading">{addedValue.heading}</SectionLabel>
        </div>

        <ol className="added-value-grid">
          {addedValue.columns.map((column, index) => (
            <motion.li
              key={column.title}
              className="added-value-col"
              initial={reduceMotion ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -12% 0px' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="added-value-head">
                <span className="added-value-label">
                  <span className="added-value-dot" aria-hidden="true" />
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="added-value-title">{column.title}</h3>
              </div>
              <ul className="added-value-items">
                {column.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <ColumnIcon name={column.icon as IconName} reduced={Boolean(reduceMotion)} />
            </motion.li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
