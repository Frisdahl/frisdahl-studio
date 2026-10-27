import { useUnderlineHover } from '../../hooks/useUnderlineHover'
import { ArrowIcon } from './ArrowIcon'

export interface TextLinkProps {
  href: string
  children: string
  className?: string
  variant?: 'full' | 'nav'
}

export function TextLink({ href, children, className = '', variant = 'full' }: TextLinkProps) {
  const { ref, underlineProps } = useUnderlineHover()

  if (variant === 'nav') {
    return (
      <a
        ref={ref}
        href={href}
        className={`text-link-nav ${className}`.trim()}
        {...underlineProps}
      >
        <span>{children}</span>
        <ArrowIcon className="text-link-arrow text-accent" width={14} height={14} />
      </a>
    )
  }

  return (
    <a href={href} className={`text-link ${className}`.trim()}>
      <span className="text-link-label">
        {children}
        <ArrowIcon className="text-link-arrow" width={14} height={14} />
      </span>
      <span className="text-link-line" aria-hidden="true" />
    </a>
  )
}
