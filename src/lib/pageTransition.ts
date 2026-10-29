// The stacked-cards page transition is run by <PageTransition>, which
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
