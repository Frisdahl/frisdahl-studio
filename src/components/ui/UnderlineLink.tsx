import { Link, type LinkProps } from 'react-router-dom'
import { toAppHref } from '../../lib/routes'
import { useUnderlineHover } from '../../hooks/useUnderlineHover'

type UnderlineLinkProps = Omit<LinkProps, 'to'> & {
  href?: string
  to?: LinkProps['to']
}

export function UnderlineLink({
  className = '',
  children,
  href,
  to,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...props
}: UnderlineLinkProps) {
  const { ref, underlineProps } = useUnderlineHover()
  const destination = to ?? toAppHref(href ?? '/')

  return (
    <Link
      ref={ref}
      to={destination}
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
    </Link>
  )
}
