import { useState, type FormEvent } from 'react'
import { useLocale } from '../../context/LocaleContext'
import { getContactPageContent } from '../../data/contact'
import { getFooterContent } from '../../data/footer'
import { getHomeContent } from '../../data/home'
import { ContactButton } from '../ui'

/** Copy with every "*" in the accent red (the required-field marker). */
function WithRequiredMark({ text }: { text: string }) {
  return text.split('*').map((part, index) => (
    <span key={index}>
      {index > 0 && <span className="contact-form-required">*</span>}
      {part}
    </span>
  ))
}

interface FieldProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
  type?: 'text' | 'email' | 'tel'
  autoComplete?: string
  multiline?: boolean
}

/** A label over an underlined input; a trailing "*" in the label marks it required. */
function Field({ id, label, value, onChange, placeholder, type = 'text', autoComplete, multiline }: FieldProps) {
  const required = label.includes('*')
  const shared = {
    id,
    className: `contact-form-input${multiline ? ' contact-form-textarea' : ''}`,
    value,
    placeholder,
    required,
  }

  return (
    <div className="contact-form-field">
      <label className="contact-form-label" htmlFor={id}>
        <WithRequiredMark text={label} />
      </label>
      {multiline ? (
        <textarea {...shared} rows={1} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input
          {...shared}
          type={type}
          autoComplete={autoComplete}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </div>
  )
}

/**
 * The contact page form. There is no form backend yet, so sending composes the
 * message as an email to the studio address in the visitor's mail app. The
 * browser's own validation covers the required fields.
 */
export function ContactForm() {
  const { locale } = useLocale()
  const { form } = getHomeContent(locale).contact.drawer
  const copy = getContactPageContent(locale)
  const { email: studioEmail } = getFooterContent(locale)

  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [source, setSource] = useState('')
  const [message, setMessage] = useState('')
  const [isSent, setIsSent] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const sender = company.trim() ? `${name.trim()}, ${company.trim()}` : name.trim()
    const details = [sender, email.trim(), phone.trim()]
    if (source.trim()) details.push(`${copy.sourceMailLabel}: ${source.trim()}`)
    const body = [message.trim(), '', ...details].join('\n')
    const subject = `${copy.mailSubject} ${sender}`
    window.location.href = `mailto:${studioEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setIsSent(true)
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form-row">
        <Field
          id="contact-name"
          label={form.nameLabel}
          value={name}
          onChange={setName}
          placeholder={form.namePlaceholder}
          autoComplete="name"
        />
        <Field
          id="contact-company"
          label={form.companyLabel}
          value={company}
          onChange={setCompany}
          placeholder={form.companyPlaceholder}
          autoComplete="organization"
        />
      </div>

      <div className="contact-form-row">
        <Field
          id="contact-email"
          type="email"
          label={form.emailLabel}
          value={email}
          onChange={setEmail}
          placeholder={form.emailPlaceholder}
          autoComplete="email"
        />
        <Field
          id="contact-phone"
          type="tel"
          label={form.phoneLabel}
          value={phone}
          onChange={setPhone}
          placeholder={form.phonePlaceholder}
          autoComplete="tel"
        />
      </div>

      <Field
        id="contact-source"
        label={copy.sourceLabel}
        value={source}
        onChange={setSource}
        placeholder={copy.sourcePlaceholder}
      />

      <Field
        id="contact-message"
        label={copy.messageLabel}
        value={message}
        onChange={setMessage}
        placeholder={form.messagePlaceholder}
        multiline
      />

      <div className="contact-form-footer">
        <p className="contact-form-note">
          <WithRequiredMark text={copy.requiredNote} />
        </p>
        <ContactButton type="submit">{copy.submit}</ContactButton>
      </div>

      <p className="contact-form-status" role="status">
        {isSent ? copy.sent : ''}
      </p>
    </form>
  )
}
