import { useState } from 'react'
import { useLocale } from '../../context/LocaleContext'
import { getHomeContent } from '../../data/home'
import { Button } from '../ui'
import { ContactDrawerHeader } from './ContactDrawerHeader'

interface ContactWritePanelProps {
  onClose: () => void
}

export function ContactWritePanel({ onClose }: ContactWritePanelProps) {
  const { locale } = useLocale()
  const { contact } = getHomeContent(locale)
  const { drawer } = contact
  const { form } = drawer

  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [privacyAccepted, setPrivacyAccepted] = useState(false)

  const canProceed =
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    phone.trim().length > 0 &&
    message.trim().length > 0 &&
    privacyAccepted

  return (
    <div className="contact-drawer-content">
      <ContactDrawerHeader closeLabel={drawer.closeLabel} onClose={onClose} />

      <div className="contact-drawer-body">
        <p className="contact-drawer-eyebrow">{drawer.writeEyebrow}</p>
        <h3 className="booking-drawer-title mt-md">{drawer.writeTitle}</h3>

        <form
          className="contact-form mt-xl"
          onSubmit={(event) => event.preventDefault()}
          noValidate
        >
          <div className="contact-form-row">
            <div className="contact-form-field">
              <label className="contact-form-label" htmlFor="contact-name">
                {form.nameLabel}
              </label>
              <input
                id="contact-name"
                type="text"
                className="contact-form-input"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={form.namePlaceholder}
                autoComplete="name"
                required
              />
            </div>

            <div className="contact-form-field">
              <label className="contact-form-label" htmlFor="contact-company">
                {form.companyLabel}
              </label>
              <input
                id="contact-company"
                type="text"
                className="contact-form-input"
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                placeholder={form.companyPlaceholder}
                autoComplete="organization"
              />
            </div>
          </div>

          <div className="contact-form-row">
            <div className="contact-form-field">
              <label className="contact-form-label" htmlFor="contact-email">
                {form.emailLabel}
              </label>
              <input
                id="contact-email"
                type="email"
                className="contact-form-input"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={form.emailPlaceholder}
                autoComplete="email"
                required
              />
            </div>

            <div className="contact-form-field">
              <label className="contact-form-label" htmlFor="contact-phone">
                {form.phoneLabel}
              </label>
              <input
                id="contact-phone"
                type="tel"
                className="contact-form-input"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder={form.phonePlaceholder}
                autoComplete="tel"
                required
              />
            </div>
          </div>

          <div className="contact-form-field">
            <label className="contact-form-label" htmlFor="contact-message">
              {form.messageLabel}
            </label>
            <textarea
              id="contact-message"
              className="contact-form-input contact-form-textarea"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder={form.messagePlaceholder}
              required
            />
          </div>

          <div className="contact-form-checkbox">
            <input
              id="contact-privacy"
              type="checkbox"
              className="contact-form-checkbox-input"
              checked={privacyAccepted}
              onChange={(event) => setPrivacyAccepted(event.target.checked)}
              required
            />
            <label className="contact-form-checkbox-label" htmlFor="contact-privacy">
              {form.privacy.before}
              <a
                href={form.privacy.cookieHref}
                className="contact-form-link"
                onClick={(event) => event.stopPropagation()}
              >
                {form.privacy.cookieLabel}
              </a>
              {form.privacy.between}
              <a
                href={form.privacy.policyHref}
                className="contact-form-link"
                onClick={(event) => event.stopPropagation()}
              >
                {form.privacy.policyLabel}
              </a>
              {form.privacy.after}
            </label>
          </div>
        </form>
      </div>

      <div className="contact-drawer-footer">
        <hr className="contact-drawer-divider" />
        <div className="contact-drawer-footer-actions">
          <Button type="button" variant="secondary" onClick={onClose}>
            {drawer.back}
          </Button>
          <Button type="button" disabled={!canProceed}>
            {drawer.next}
          </Button>
        </div>
      </div>
    </div>
  )
}
