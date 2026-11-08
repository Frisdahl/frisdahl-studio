import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { collectImageFrames, collectTextBlocks } from './pageMotion'

gsap.registerPlugin(SplitText)

// The page's exit: what is on the first screen leaves the way the home page's hero comes
// in. Each line of text slides up out of its own mask, and each image closes from top and
// bottom to its vertical centre, the left one first. The rest of the page then fades.
// Used when the logo is clicked (PageTransition, runContent).

const TEXT_DURATION = 0.6
const TEXT_EASE = 'power3.in'
const IMAGE_DURATION = 0.65
const IMAGE_EASE = 'power3.in'
/** Between one text block and the next (top to bottom), and between one image and the next. */
const TEXT_STAGGER = 0.035
const IMAGE_STAGGER = 0.06
/** The longest the staggers add up to. */
const STAGGER_CAP = 0.3
/** The rest of the page (backgrounds, rules, anything that is neither text nor image). */
const FADE_DELAY = 0.35
const FADE_DURATION = 0.35

/**
 * Plays the exit on what is currently on screen in `layout` (the routed page and the footer)
 * and resolves when it has finished, with a function that puts the page's DOM back as it
 * was (the text is split into lines while it plays, and the page's own framework must find
 * its text again). Call it once the page is hidden.
 */
export async function playPageExit(layout: Element): Promise<() => void> {
  const textBlocks = collectTextBlocks(layout).sort((a, b) => {
    const ra = a.getBoundingClientRect()
    const rb = b.getBoundingClientRect()
    return ra.top - rb.top || ra.left - rb.left
  })
  const imageFrames = collectImageFrames(layout)
  const everything = Array.from(layout.children)

  const splits = textBlocks.map((block) => SplitText.create(block, { type: 'lines,words', mask: 'lines', linesClass: 'page-exit-line', wordsClass: 'page-exit-word' }))

  const timeline = gsap.timeline()
  splits.forEach((split, index) => {
    timeline.to(
      split.lines,
      { yPercent: -110, duration: TEXT_DURATION, ease: TEXT_EASE, stagger: 0.04 },
      Math.min(index * TEXT_STAGGER, STAGGER_CAP),
    )
  })
  imageFrames.forEach((frame, index) => {
    timeline.fromTo(
      frame,
      { clipPath: 'inset(0% 0% 0% 0%)' },
      { clipPath: 'inset(50% 0% 50% 0%)', duration: IMAGE_DURATION, ease: IMAGE_EASE },
      Math.min(index * IMAGE_STAGGER, STAGGER_CAP),
    )
  })
  timeline.to(everything, { autoAlpha: 0, duration: FADE_DURATION, ease: 'power1.in' }, FADE_DELAY)

  await timeline

  return () => {
    timeline.kill()
    splits.forEach((split) => split.revert())
    gsap.set(imageFrames, { clearProps: 'clipPath' })
    gsap.set(everything, { clearProps: 'transform,opacity,visibility' })
  }
}
