import { Link, type LinkProps } from 'react-router-dom'
import { toAppHref } from '../../lib/routes'

type UnderlineLinkProps = Omit<LinkProps, 'to'> & {
  href?: string
  to?: LinkProps['to']
}

export function UnderlineLink({
  className = '',
  children,
  href,
  to,
  ...props
}: UnderlineLinkProps) {
  const destination = to ?? toAppHref(href ?? '/')

  return (
    <Link to={destination} className={`nav-link ${className}`.trim()} {...props}>
      {children}
    </Link>
  )
}
