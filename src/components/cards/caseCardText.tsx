import { Fragment } from 'react'
import { DUR, EASE, STAGGER } from '../../lib/motion'

/**
 * The row's text rises once, when the row's top reaches 78% of the screen: the same line rise
 * the page used before it was moved onto MaskedLineReveal (1 s, power3.out, 0.08 s between lines),
 * with the split undone afterwards so the shared-image transition finds plain text. The keywords
 * start one stagger step after the title, as when both were split together.
 */
export const ROW_REVEAL = {
  trigger: 'view',
  start: 'top 78%',
  triggerClosest: '.case-card',
  duration: DUR.line,
  stagger: STAGGER.lines,
  ease: EASE.rise,
  revertWhenDone: true,
} as const

/**
 * The keywords arrive as one string with " • " between them. The font draws that
 * bullet as a small square, so each separator becomes a round dot (CSS), and
 * stays out of the accessibility tree.
 */
export function keywordsWithDots(keywords: string) {
  return keywords.split(' • ').map((word, index) => (
    <Fragment key={word}>
      {index > 0 && <span className="case-card-dot" aria-hidden="true" />}
      <span className="case-card-keyword">{word}</span>
    </Fragment>
  ))
}

