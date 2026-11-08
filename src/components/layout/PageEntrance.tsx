import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { prepareAndPlayPageEntrance } from '../../lib/pageEntrance'
import { whenPageRevealed } from '../../lib/pageReveal'
import { prefersReducedMotion } from '../../lib/scroll'

/**
 * Put inside a page's <main>: plays the page's entrance (lib/pageEntrance.ts) when the page
 * mounts, or when its address changes, after any transition cover has gone. It runs in a
 * layout effect so the hidden state is in place before the first paint. A page that arrives
 * through the shared-image transition does its own.
 */
export function PageEntrance() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    const main = document.querySelector<HTMLElement>('.page-shell > .global-layout > main')
    if (!main || prefersReducedMotion()) return
    const root = document.documentElement
    if (root.classList.contains('is-shared-transition') || root.classList.contains('is-shared-image')) return
    // Tells the transitions (menu, logo) that this page brings itself in.
    main.dataset.pageEntrance = 'own'
    return prepareAndPlayPageEntrance(main, whenPageRevealed())
  }, [pathname])

  return null
}
