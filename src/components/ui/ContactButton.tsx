import { CtaPillButton } from './CtaPillButton'

interface ContactButtonProps {
  children: string
  href?: string
  /** Open href as an external page in a new tab. */
  external?: boolean
  onClick?: () => void
  className?: string
}

/**
 * The header's contact CTA: dark label block with a white arrow chip, filled
 * red on hover. Reused wherever a CTA should match the header button.
 */
export function ContactButton({ className = '', ...props }: ContactButtonProps) {
  return <CtaPillButton {...props} className={`header-contact ${className}`.trim()} fillOnHover />
}
