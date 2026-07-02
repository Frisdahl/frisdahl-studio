import { HiArrowRight } from 'react-icons/hi2'

interface CtaPillButtonProps {
  children: string
  href?: string
  onClick?: () => void
  className?: string
}

export function CtaPillButton({ href, onClick, children, className = '' }: CtaPillButtonProps) {
  const classes = ['hero-cta-btn', className].filter(Boolean).join(' ')

  const content = (
    <>
      <span className="hero-cta-btn-label">{children}</span>
      <span className="hero-cta-btn-icon" aria-hidden="true">
        <span className="hero-cta-btn-arrow-wrap">
          <HiArrowRight className="hero-cta-btn-arrow" />
        </span>
      </span>
    </>
  )

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {content}
    </button>
  )
}
