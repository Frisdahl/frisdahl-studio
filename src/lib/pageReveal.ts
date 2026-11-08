// While a cover is up (the wipe panels in PageTransition, the menu panel in Navbar) the
// page behind it changes, and its entrance animations must not play out of sight. The
// cover calls coverPage() when it starts and revealPage() as it begins to go; a page that
// mounts in between waits on whenPageRevealed() before it starts its entrance. With no
// cover (the first load, the back button) the promise is already resolved.
let covered = false
let waiting: (() => void)[] = []
let failsafe = 0

export function coverPage() {
  covered = true
  // If a transition never gets as far as revealPage, don't leave the page hidden.
  window.clearTimeout(failsafe)
  failsafe = window.setTimeout(revealPage, 8000)
}

export function revealPage() {
  window.clearTimeout(failsafe)
  covered = false
  const callbacks = waiting
  waiting = []
  callbacks.forEach((callback) => callback())
}

export function whenPageRevealed(): Promise<void> {
  if (!covered) return Promise.resolve()
  return new Promise((resolve) => waiting.push(resolve))
}
