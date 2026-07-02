import type { ReactNode } from 'react'

interface ContactFormInputShellProps {
  children: ReactNode
}

export function ContactFormInputShell({ children }: ContactFormInputShellProps) {
  return <div className="contact-form-input-shell">{children}</div>
}
