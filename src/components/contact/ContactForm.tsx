import { useState, type FormEvent } from 'react'
import { useLocale } from '../../context/LocaleContext'
import { getContactPageContent } from '../../data/contact'
import { getHomeContent } from '../../data/home'
import { ArrowButton } from '../ui'

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
 * The contact page form. Sending posts it to the site's Worker (worker/index.ts, POST
 * /api/contact), which emails it through Resend. The browser's own validation covers the
 * required fields; the hidden "website" field is a honeypot for bots.
 */
export function ContactForm() {
  const { locale } = useLocale()
  const { form } = getHomeContent(locale).contact.drawer
  const copy = getContactPageContent(locale)

  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [source, setSource] = useState('')
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, company, email, phone, source, message, website }),
      })
      if (!response.ok) throw new Error(String(response.status))
      setStatus('sent')
      setName('')
      setCompany('')
      setEmail('')
      setPhone('')
      setSource('')
      setMessage('')
    } catch {
      setStatus('error')
    }
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
        <ArrowButton type="submit">
          {status === 'sending' ? copy.sending : copy.submit}
        </ArrowButton>
      </div>

      <input
        type="text"
        name="website"
        value={website}
        onChange={(event) => setWebsite(event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
      />

      <p className="contact-form-status" role="status">
        {status === 'sent' ? copy.sent : status === 'error' ? copy.error : ''}
      </p>
    </form>
  )
}
