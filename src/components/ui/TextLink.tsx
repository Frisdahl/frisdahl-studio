import { useUnderlineHover } from '../../hooks/useUnderlineHover'

export interface TextLinkProps {
  href: string
  children: string
  className?: string
  variant?: 'full' | 'nav'
}

function ArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="11"
      viewBox="0 0 14 11"
      fill="none"
      className={`text-link-arrow ${className}`.trim()}
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="m9.84 1.08 3.977 3.978a.625.625 0 0 1 0 .884L9.839 9.919a.625.625 0 0 1-.883-.884l2.91-2.91H1.375a.625.625 0 0 1 0-1.25h10.491l-2.91-2.91a.625.625 0 1 1 .883-.884"
      />
    </svg>
  )
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
        <ArrowIcon className="text-accent" />
      </a>
    )
  }

  return (
    <a href={href} className={`text-link ${className}`.trim()}>
      <span className="text-link-label">
        {children}
        <ArrowIcon />
      </span>
      <span className="text-link-line" aria-hidden="true" />
    </a>
  )
}
