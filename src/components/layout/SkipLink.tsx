import type { MouseEvent } from 'react'

/**
 * The first thing a keyboard user tabs to: jumps past the header to the page's <main>. Hidden
 * until it has focus (CSS: .skip-link). Each page's <main> has the id main-content.
 */
export function SkipLink() {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const main = document.getElementById('main-content')
    if (!main) return
    event.preventDefault()
    main.tabIndex = -1
    main.focus()
  }

  return (
    <a className="skip-link" href="#main-content" onClick={handleClick}>
      Spring til indhold
    </a>
  )
}
