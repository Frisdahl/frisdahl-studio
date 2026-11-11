/**
 * Shared motion vocabulary: the durations, easings and staggers that recur in Frisdahl's
 * animations, named by what they are for.
 *
 * Every value here is one the site already uses (audited 2026-11-11); none was invented or
 * averaged, so using a token never changes how an animation feels. Different jobs that happen to
 * look alike stay different tokens (a line reveal is 1 s, a content rise is 0.9 s) because they
 * were tuned separately in the browser.
 *
 * Use these in new or modified animations. Existing files keep their own constants until they are
 * touched for another reason; they are not being converted wholesale. CSS has its own variables
 * (`--ease-smooth`, `--menu-*` in index.css); `EASE_SMOOTH_BEZIER` is the same curve as
 * `--ease-smooth`, for Motion for React, which wants numbers rather than a CSS string.
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

/** `--ease-smooth` from index.css as numbers, for Motion for React (the contact drawer). */
export const EASE_SMOOTH_BEZIER = [0.4, 0, 0.2, 1] as const
