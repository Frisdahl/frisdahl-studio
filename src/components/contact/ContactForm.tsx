import { useState, type FormEvent } from 'react'
import { useLocale } from '../../context/LocaleContext'
import { getContactPageContent } from '../../data/contact'
import { getHomeContent } from '../../data/home'
import { ArrowButton } from '../ui'
import { toast } from '../../lib/toast'

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
  invalid?: boolean
}

/** A label over an underlined input; a trailing "*" in the label marks it required. */
function Field({ id, label, value, onChange, placeholder, type = 'text', autoComplete, multiline, invalid }: FieldProps) {
  const shared = {
    id,
    className: `contact-form-input${multiline ? ' contact-form-textarea' : ''}`,
    value,
    placeholder,
    'aria-invalid': invalid || undefined,
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
 * /api/contact), which emails it through Resend. Name, e-mail and message are checked
 * here and answered with toasts at the bottom centre (missing, sending, sent, failed); the hidden "website" field is a honeypot for bots.
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
  const [status, setStatus] = useState<'idle' | 'sending'>('idle')
  const [invalid, setInvalid] = useState<string[]>([])
  const t = copy.toast

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'sending') return
    const missing = [
      !name.trim() && 'contact-name',
      !email.trim() && 'contact-email',
      !message.trim() && 'contact-message',
    ].filter(Boolean) as string[]
    const badEmail = !missing.includes('contact-email') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    const problems = badEmail ? [...missing, 'contact-email'] : missing
    setInvalid(problems)
    if (problems.length) {
      toast.show({
        id: 'contact',
        kind: 'error',
        label: t.errorLabel,
        closeLabel: t.close,
        title: missing.length ? t.missingTitle : t.emailTitle,
        text: missing.length ? t.missingText : t.emailText,
      })
      document.getElementById(problems[0])?.focus()
      return
    }
    setStatus('sending')
    toast.show({ id: 'contact', kind: 'info', label: t.sendingLabel, closeLabel: t.close, title: t.sendingTitle })
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, company, email, phone, source, message, website }),
      })
      if (!response.ok) throw new Error(String(response.status))
      toast.show({ id: 'contact', kind: 'success', label: t.sentLabel, closeLabel: t.close, title: t.sentTitle, text: copy.sent })
      setName('')
      setCompany('')
      setEmail('')
      setPhone('')
      setSource('')
      setMessage('')
    } catch {
      toast.show({ id: 'contact', kind: 'error', label: t.errorLabel, closeLabel: t.close, title: t.errorTitle, text: copy.error })
    } finally {
      setStatus('idle')
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form-row">
        <Field
          id="contact-name"
          invalid={invalid.includes('contact-name')}
          label={form.nameLabel}
          value={name}
          onChange={(v) => { setName(v); setInvalid((i) => i.filter((x) => x !== 'contact-name')) }}
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
          invalid={invalid.includes('contact-email')}
          type="email"
          label={form.emailLabel}
          value={email}
          onChange={(v) => { setEmail(v); setInvalid((i) => i.filter((x) => x !== 'contact-email')) }}
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
          invalid={invalid.includes('contact-message')}
        label={copy.messageLabel}
        value={message}
        onChange={(v) => { setMessage(v); setInvalid((i) => i.filter((x) => x !== 'contact-message')) }}
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
    </form>
  )
}
