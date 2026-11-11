import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { collectControls, collectImageFrames, collectTextBlocks } from './pageMotion'

gsap.registerPlugin(SplitText)

// A page's entrance, the same as the home page's hero and the reverse of lib/pageExit.ts:
// each line of text on the first screen rises out of its own mask, each image opens from
// its vertical centre to its full height (the left one first), buttons and pills fade in.
// Everything is put in its hidden state straight away (the caller runs this before the
// browser paints) and plays once `revealed` has resolved, i.e. once any cover is gone.

const TEXT_DURATION = 1
const TEXT_STAGGER = 0.08
/** Between one text block and the next (top to bottom), and between one image and the next. */
const BLOCK_STAGGER = 0.06
const IMAGE_STAGGER = 0.1
const STAGGER_CAP = 0.4
const IMAGE_DELAY = 0.15
const IMAGE_DURATION = 1.2
const CONTROL_DELAY = 0.6
const CONTROL_DURATION = 0.9

/** Returns a function that stops the entrance and puts the page's DOM back as it was. */
export function prepareAndPlayPageEntrance(main: HTMLElement, revealed: Promise<void>): () => void {
  const textBlocks = collectTextBlocks(main)
    .filter((block) => !block.closest('button, [class*="btn"], [class*="chip"], [class*="pill"]'))
    .sort((a, b) => {
      const ra = a.getBoundingClientRect()
      const rb = b.getBoundingClientRect()
      return ra.top - rb.top || ra.left - rb.left
    })
  const imageFrames = collectImageFrames(main)
  const controls = collectControls(main)

  let started = false
  let cancelled = false
  const reveals: gsap.core.Tween[] = []
  const splits: SplitText[] = []

  // Text: built paused (a re-split when the fonts load builds the next one paused too).
  textBlocks.forEach((block, index) => {
    const delay = Math.min(index * BLOCK_STAGGER, STAGGER_CAP)
    splits.push(
      SplitText.create(block, {
        // Words too: SplitText measures each as an inline block, and a paragraph's first-line
        // indent would be inherited by every one of them (see .page-enter-word in index.css).
        type: 'lines,words',
        mask: 'lines',
        linesClass: 'page-enter-line',
        wordsClass: 'page-enter-word',
        // Readable to assistive tech while it plays (the default hides the lines, and links inside).
        aria: 'none',
        autoSplit: true,
        onSplit: (self) => {
          const reveal = gsap.from(self.lines, {
            yPercent: 125,
            duration: TEXT_DURATION,
            stagger: TEXT_STAGGER,
            delay,
            ease: 'expo.out',
            paused: !started,
          })
          reveals.push(reveal)
          return reveal
        },
      }),
    )
  })

  // (GSAP warns when it is given no targets, as on a page with no images or no buttons.)
  if (imageFrames.length) gsap.set(imageFrames, { clipPath: 'inset(50% 0% 50% 0%)' })
  if (controls.length) gsap.set(controls, { autoAlpha: 0 })

  const tweens: gsap.core.Tween[] = []
  void revealed.then(() => {
    if (cancelled) return
    started = true
    reveals.forEach((reveal) => reveal.play())
    // fromTo, with both clips written out in full (see Hero.tsx).
    imageFrames.forEach((frame, index) => {
      tweens.push(
        gsap.fromTo(
          frame,
          { clipPath: 'inset(50% 0% 50% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: IMAGE_DURATION,
            delay: IMAGE_DELAY + Math.min(index * IMAGE_STAGGER, STAGGER_CAP),
            ease: 'expo.out',
            clearProps: 'clipPath',
          },
        ),
      )
    })
    if (controls.length) {
      tweens.push(
        gsap.to(controls, {
          autoAlpha: 1,
          duration: CONTROL_DURATION,
          delay: CONTROL_DELAY,
          ease: 'power2.out',
          clearProps: 'opacity,visibility',
        }),
      )
    }
  })

  // The text is split only while it plays; the page's own framework must find its text again.
  let settle = 0
  void revealed.then(() => {
    if (!cancelled) settle = window.setTimeout(() => splits.forEach((split) => split.revert()), 3000)
  })

  return () => {
    cancelled = true
    window.clearTimeout(settle)
    reveals.forEach((reveal) => reveal.kill())
    tweens.forEach((tween) => tween.kill())
    splits.forEach((split) => split.revert())
    if (imageFrames.length) gsap.set(imageFrames, { clearProps: 'clipPath' })
    if (controls.length) gsap.set(controls, { clearProps: 'opacity,visibility' })
  }
}
