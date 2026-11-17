/**
 * The home page's first-load intro (the "preloader") plays once per visit, and only when the visit
 * began on the home page itself: arriving from another page, or coming back to the home page later,
 * gets the short entrance instead. `startedOnHome` is read once, when the app loads.
 */
const startedOnHome = typeof window !== 'undefined' && window.location.pathname === '/'
let played = false

/** True while the intro still has to play. */
export function shouldPlayHeroIntro() {
  return startedOnHome && !played
}

/** Call when the intro has finished, so it is not played again. */
export function markHeroIntroPlayed() {
  played = true
}
