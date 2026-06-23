import type { AnchorHTMLAttributes } from 'react'
import { useUnderlineHover } from '../../hooks/useUnderlineHover'

export function UnderlineLink({
  className = '',
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { ref, underlineProps } = useUnderlineHover()

  return (
    <a ref={ref} className={`nav-link ${className}`.trim()} {...props} {...underlineProps} />
  )
}
