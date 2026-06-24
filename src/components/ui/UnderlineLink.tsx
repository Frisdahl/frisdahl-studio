import type { AnchorHTMLAttributes } from 'react'
import { useUnderlineHover } from '../../hooks/useUnderlineHover'

export function UnderlineLink({
  className = '',
  children,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { ref, underlineProps } = useUnderlineHover()

  return (
    <a
      ref={ref}
      className={`nav-link ${className}`.trim()}
      {...props}
      onMouseEnter={(event) => {
        onMouseEnter?.(event)
        underlineProps.onMouseEnter()
      }}
      onMouseLeave={(event) => {
        onMouseLeave?.(event)
        underlineProps.onMouseLeave()
      }}
      onFocus={(event) => {
        onFocus?.(event)
        underlineProps.onFocus()
      }}
      onBlur={(event) => {
        onBlur?.(event)
        underlineProps.onBlur()
      }}
    >
      {children}
    </a>
  )
}
