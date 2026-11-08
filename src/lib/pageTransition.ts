// The page transition is run by <PageTransition>, which
// registers itself here so code outside it (the menu) can start one too.
type TransitionNavigate = (href: string) => void

let runner: TransitionNavigate | null = null

export function registerPageTransition(navigate: TransitionNavigate | null) {
  runner = navigate
}

/** Go to an in-app href through the page transition, or directly without one. */
export function navigateWithTransition(href: string, fallback: TransitionNavigate) {
  if (runner) runner(href)
  else fallback(href)
}

// The shared-image version (a project card's image grows into the case page's
// hero), also registered by <PageTransition>. Used by the home page's project
// cards and by the "next project" card at the end of a case page.
type SharedTransitionNavigate = (href: string, card: HTMLElement) => void

let sharedRunner: SharedTransitionNavigate | null = null

export function registerSharedTransition(navigate: SharedTransitionNavigate | null) {
  sharedRunner = navigate
}

/** Go to a case through the shared-image transition, or directly without one. */
export function navigateWithSharedTransition(href: string, card: HTMLElement, fallback: TransitionNavigate) {
  if (sharedRunner) sharedRunner(href, card)
  else fallback(href)
}
