// Helpers for changing the page behind a cover (the wipe panels in PageTransition, the
// menu panel in Navbar): wait for the new route to replace the old one, and for its
// first screen's images, so nothing pops in when the cover goes.

// The longest the new page waits for its first screen's images before it shows.
const IMAGE_WAIT = 1000

/** Resolves with the new route's <main> once it has replaced `previous` (lazy pages load first). */
export function waitForPage(shell: HTMLElement, previous: Element | null) {
  // Case to case keeps the same <main> (one route component), so a changed case name counts too.
  const caseName = () => shell.querySelector('.case-detail-hero-name')?.textContent ?? null
  const previousName = caseName()
  return new Promise<Element | null>((resolve) => {
    const started = performance.now()
    const check = () => {
      const main = shell.querySelector(':scope > .global-layout > main')
      const swapped = (main && main !== previous) || (previousName !== null && caseName() !== previousName)
      if (swapped || performance.now() - started > 4000) {
        resolve(main)
        return
      }
      requestAnimationFrame(check)
    }
    check()
  })
}

/** An element's distance from the top of the page, ignoring transforms. */
function pageTop(element: HTMLElement) {
  let top = 0
  for (let node: HTMLElement | null = element; node; node = node.offsetParent as HTMLElement | null) {
    top += node.offsetTop
  }
  return top
}

/**
 * Loads and decodes the images on the new page's first screen (at most
 * IMAGE_WAIT), so none pop in as the panels uncover it. Lazy images would not
 * start on their own: the page is covered until then.
 */
export async function firstScreenImages(main: Element | null, height: number) {
  if (!main) return
  const images = [...main.querySelectorAll('img')].filter((image) => pageTop(image) < height)
  for (const image of images) image.loading = 'eager'
  await Promise.race([
    Promise.all(images.map((image) => image.decode().catch(() => {}))),
    new Promise((resolve) => setTimeout(resolve, IMAGE_WAIT)),
  ])
}

