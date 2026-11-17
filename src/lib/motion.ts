/**
 * The site's motion language: the durations, easings and staggers that recur in Frisdahl's
 * animations, named by what they are for. (Refined 2026-11-17; the rules are in docs/MOTION.md.)
 *
 * The philosophy, in four lines:
 *  - One family of easings. Things arriving ease OUT hard (expo / power3 out): they leave fast
 *    and settle softly. Things leaving ease IN (power3 in) and are shorter, about 60% of the
 *    arrival. Big movements across the screen ease in and out (power3 / expo inOut).
 *  - Nothing bounces. No overshoot, no springs (`back`, `elastic`): the site is calm.
 *  - Text and images arrive the same way everywhere: lines rise out of masks, images open from
 *    their centre. Small labels ( LABEL ) are one fixed gesture (LABEL below).
 *  - Sequence, do not pile up: stagger small, cap the total, and let a second element start
 *    while the first is still settling, so a section moves as one gesture.
 *
 * Different jobs that look alike stay different tokens (a line reveal is 1 s, a content rise is
 * 0.9 s) because they were tuned separately in the browser. CSS has its own variables
 * (`--ease-smooth`, `--duration-*`, `--menu-*` in index.css); `EASE_SMOOTH_BEZIER` is the same
 * curve as `--ease-smooth`, for Motion for React, which wants numbers rather than a CSS string.
 */

/** GSAP easings, by role. */
export const EASE = {
  /** Text lines and images appearing at a page's start: Hero, MaskedLineReveal, page entrance. */
  reveal: 'expo.out',
  /** Content rising into place and softer reveals: page rise, case rows, case page text. */
  rise: 'power3.out',
  /** Something leaving: text sliding out of its mask, page exit. */
  exit: 'power3.in',
  /** A large movement that eases at both ends: the shared image growing into the hero. */
  move: 'power3.inOut',
  /** Fades and small state changes: controls and footer fading in, hover timelines. */
  fade: 'power2.out',
  /** Scrubbed or progress-driven motion, where the easing is applied elsewhere. */
  linear: 'none',
} as const

/** Durations in seconds, by role. */
export const DUR = {
  /** One line of text rising out of its mask (case rows, page entrance). */
  line: 1,
  /** The same, for the headline-sized MaskedLineReveal default. */
  lineLong: 1.1,
  /** A page's content rising in after a route change; controls and the footer fading in. */
  rise: 0.9,
  /** An image frame opening from its centre. */
  imageOpen: 1.2,
} as const

/** Seconds between one line (or item) and the next. */
export const STAGGER = {
  /** Lines of a text block. */
  lines: 0.08,
  /** Slower: MaskedLineReveal's default, and the images of a page entrance. */
  slow: 0.1,
} as const

/** `--ease-smooth` from index.css as numbers, for Motion for React (the contact drawer, the reviews). */
export const EASE_SMOOTH_BEZIER = [0.22, 1, 0.36, 1] as const

/** An exit for Motion for React: the CSS equivalent of `power3.in`. */
export const EASE_EXIT_BEZIER = [0.55, 0.055, 0.675, 0.19] as const

/**
 * The ( LABEL ) heading's opening, one gesture used by every label on the site (SectionLabel,
 * and the statement's own, which is driven by its section). 1.1 s in all: the closing bracket
 * glides right to the end of the label and, before it has arrived, the text rises out of its mask.
 */
export const LABEL = {
  /** The closing bracket's slide. */
  slide: 0.8,
  /** The text rising between the brackets. */
  rise: 0.6,
  /** How early the text starts, measured back from the end of the slide. */
  overlap: 0.5,
  /** A label opens when its top is this far down the screen: just as it enters. */
  start: 'top 92%',
} as const

/** Hover and state changes in JS (CSS uses --duration-*): seconds. */
export const HOVER = {
  in: 0.45,
  out: 0.4,
} as const

/** The smoothing of a scrubbed animation: the animation eases after the wheel by this many seconds. */
export const SCRUB = 0.6

/** The scroll position at which something below the fold starts: its top this far down the screen. */
export const REVEAL_START = 'top 88%'
