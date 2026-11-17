import type { ComponentProps } from 'react'
import { DUR, EASE, REVEAL_START, STAGGER } from '../../lib/motion'
import { MaskedLineReveal } from './MaskedLineReveal'

/**
 * Text that rises line by line out of its masks when it scrolls in: MaskedLineReveal with the
 * site's scroll-reveal values (a line takes 1 s, power3.out, 0.08 s between lines, starting when the
 * text's top is 88% down the screen), and the split undone afterwards so the text is plain again.
 * The same gesture as the home page's project rows and a page's entrance.
 */
export function RevealText(props: ComponentProps<typeof MaskedLineReveal>) {
  return (
    <MaskedLineReveal
      duration={DUR.line}
      stagger={STAGGER.lines}
      ease={EASE.rise}
      start={REVEAL_START}
      revertWhenDone
      {...props}
    />
  )
}
