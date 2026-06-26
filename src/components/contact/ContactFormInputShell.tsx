import type { ReactNode } from 'react'

interface ContactFormInputShellProps {
  children: ReactNode
}

export function ContactFormInputShell({ children }: ContactFormInputShellProps) {
  return (
    <div className="contact-form-input-shell">
      <span className="contact-form-input-track" aria-hidden="true" />
      <span className="contact-form-input-slider" aria-hidden="true" />
      {children}
    </div>
  )
}
