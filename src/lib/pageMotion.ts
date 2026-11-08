// What a page's entrance and exit animate: the text blocks, the images (with the box
// each sits in) and the controls on the first screen. Shared by lib/pageExit.ts and
// components/layout/PageEntrance.tsx.

export const onScreen = (rect: DOMRect) =>
  rect.width > 0 &&
  rect.height > 0 &&
  rect.bottom > 0 &&
  rect.top < window.innerHeight &&
  rect.right > 0 &&
  rect.left < window.innerWidth

/** The text blocks on screen: the block-level element that holds each piece of text. */
export function collectTextBlocks(layout: Element): HTMLElement[] {
  const blocks = new Set<HTMLElement>()
  const walker = document.createTreeWalker(layout, NodeFilter.SHOW_TEXT)

  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    if (!node.nodeValue?.trim()) continue
    let element = node.parentElement
    // Climb out of inline wrappers (a span, a link, <strong>) to the block that holds the lines.
    while (element && element !== layout && getComputedStyle(element).display.startsWith('inline')) {
      element = element.parentElement
    }
    if (!element || element === layout || blocks.has(element)) continue
    // Hidden copies (measuring layers, the roll labels' second line), scripts and form fields.
    if (element.closest('[aria-hidden="true"], .roll-label, script, style, svg, textarea, select, input')) continue
    if (getComputedStyle(element).visibility === 'hidden') continue
    if (!onScreen(element.getBoundingClientRect())) continue
    blocks.add(element)
  }

  // A block inside another chosen block is split with it.
  return [...blocks].filter((block) => ![...blocks].some((other) => other !== block && other.contains(block)))
}

/** The box an image sits in, when it fills it (so the box closes with the image, not just the picture). */
function frameOf(media: HTMLElement, layout: Element): HTMLElement {
  const rect = media.getBoundingClientRect()
  let frame = media
  for (let depth = 0, parent = media.parentElement; parent && parent !== layout && depth < 4; depth++, parent = parent.parentElement) {
    if (parent.matches('main, section')) break
    const box = parent.getBoundingClientRect()
    if (Math.abs(box.width - rect.width) > 3 || Math.abs(box.height - rect.height) > 3) break
    frame = parent
  }
  return frame
}

export function collectImageFrames(layout: Element): HTMLElement[] {
  const frames = new Set<HTMLElement>()
  layout.querySelectorAll<HTMLElement>('img, video, canvas').forEach((media) => {
    const rect = media.getBoundingClientRect()
    if (rect.width < 40 || rect.height < 40 || !onScreen(rect)) return
    if (getComputedStyle(media).visibility === 'hidden') return
    frames.add(frameOf(media, layout))
  })
  // Left to right, then top to bottom.
  return [...frames].sort((a, b) => {
    const ra = a.getBoundingClientRect()
    const rb = b.getBoundingClientRect()
    return Math.round(ra.left / 20) - Math.round(rb.left / 20) || ra.top - rb.top
  })
}

/** Buttons and pills: they fade in as a whole, their text does not slide. */
export const CONTROL_SELECTOR = 'button, [class*="btn"], [class*="chip"], [class*="pill"]'

/** The controls on screen (the outermost of any nested ones). */
export function collectControls(layout: Element): HTMLElement[] {
  const controls = [...layout.querySelectorAll<HTMLElement>(CONTROL_SELECTOR)].filter((control) => {
    const rect = control.getBoundingClientRect()
    return onScreen(rect) && getComputedStyle(control).visibility !== 'hidden'
  })
  return controls.filter((control) => !controls.some((other) => other !== control && other.contains(control)))
}
