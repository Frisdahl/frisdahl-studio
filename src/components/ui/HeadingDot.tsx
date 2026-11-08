import type { ReactNode } from 'react'

/** The round red dot that ends the site's main headings (the hero's dot, in the same size). */
export function HeadingDot() {
  return <span className="heading-dot" aria-hidden="true" />
}

/**
 * A heading's text with the dot at the end. A trailing full stop is replaced by the
 * dot (as in the hero), so the heading never ends in both.
 */
export function WithHeadingDot({ children }: { children: string }): ReactNode {
  return (
    <>
      {children.replace(/\.$/, '')}
      <HeadingDot />
    </>
  )
}
