import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowIcon } from './ArrowIcon'

interface PillButtonProps {
  href: string
  children: ReactNode
  /** 'dark': ink pill, light label, red disc. 'light': page-coloured pill (for the dark footer). */
  tone?: 'dark' | 'light'
  /** A plain <a> (mailto:, tel:, other sites) instead of a router link. */
  external?: boolean
  className?: string
}

/**
 * The site's call-to-action button: a pill with the label and, at the end, a red disc with an
 * arrow. On hover the label rolls up (a copy rises in from below) while the arrow leaves the disc
 * to the top right and a second one arrives from the bottom left; the disc swells a little.
 * Pure CSS transforms (.pill-btn in index.css), so it costs nothing at rest and reduced motion just
 * swaps the colours.
 */
export function PillButton({ href, children, tone = 'dark', external = false, className = '' }: PillButtonProps) {
  const body = (
    <>
      <span className="pill-btn-label">
        <span className="pill-btn-label-text">{children}</span>
        <span className="pill-btn-label-text" aria-hidden="true">
          {children}
        </span>
      </span>
      <span className="pill-btn-disc" aria-hidden="true">
        <span className="pill-btn-arrow">
          <ArrowIcon rotate={-45} />
        </span>
        <span className="pill-btn-arrow">
          <ArrowIcon rotate={-45} />
        </span>
      </span>
    </>
  )
  const classes = `pill-btn pill-btn-${tone} ${className}`.trim()

  if (external) {
    return (
      <a className={classes} href={href}>
        {body}
      </a>
    )
  }
  return (
    <Link className={classes} to={href}>
      {body}
    </Link>
  )
}
