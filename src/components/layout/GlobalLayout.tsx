import type { ReactNode } from 'react'

/**
 * The page's layout root, inside `.page-shell` (which the Navbar scales and
 * slides for the menu and which the page transition reads, so it stays a plain
 * shell). Everything that makes up a page (the routed <main> and the footer)
 * is a direct child of this element.
 *
 * It is the one place the site's horizontal grid is anchored. The grid itself
 * (12 columns, gutter, margins, max width) is declared once as tokens in
 * `index.css` (`--site-grid-*`, `--page-gutter`, `--content-max-width`) and
 * turned into a grid by `<Container>` (`.site-grid`). A section either sits in
 * a `<Container>` (the normal case) or is an explicit full-bleed exception,
 * marked `data-layout="full-bleed"`.
 *
 * It adds no styles of its own beyond a name: no padding, width or transform,
 * so the Navbar animation, the header theme calculation and the footer's
 * sticky "page under the footer" behave exactly as with the shell alone.
 */
export function GlobalLayout({ children }: { children: ReactNode }) {
  return <div className="global-layout">{children}</div>
}
