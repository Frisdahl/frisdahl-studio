import type { ReactNode } from 'react'

interface BracketLineProps {
  children: ReactNode
  className?: string
}

/**
 * One short line of small caps with a tall bracket drawn on each side. The brackets are SVG
 * shapes as tall as the line (not text characters), so they stay wrapped around the line
 * whatever its length. The text sits in a mask, so it can rise between the brackets. Decorative: the text
 * alone is read out.
 */
export function BracketLine({ children, className = '' }: BracketLineProps) {
  return (
    <p className={`bracket-line ${className}`.trim()}>
      <svg className="bracket-line-bracket" viewBox="0 0 6 18" aria-hidden="true" focusable="false">
        <path d="M5 1 C 1 4, 1 14, 5 17" />
      </svg>
      <span className="bracket-line-mask">
        <span className="bracket-line-text">{children}</span>
      </span>
      <svg className="bracket-line-bracket" viewBox="0 0 6 18" aria-hidden="true" focusable="false">
        <path d="M1 1 C 5 4, 5 14, 1 17" />
      </svg>
    </p>
  )
}
