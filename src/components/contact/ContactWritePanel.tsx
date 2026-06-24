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

  return (
    <div className="contact-drawer-content">
      <ContactDrawerHeader closeLabel={drawer.closeLabel} onClose={onClose} />

      <div className="contact-drawer-body">
        <p className="contact-drawer-eyebrow">{drawer.writeEyebrow}</p>
        <h3 className="booking-drawer-title mt-md">{drawer.writeTitle}</h3>
        <p className="mt-lg text-body text-secondary">{drawer.writeDescription}</p>
      </div>

      <div className="contact-drawer-footer">
        <hr className="contact-drawer-divider" />
        <div className="contact-drawer-footer-actions">
          <Button type="button" variant="secondary" onClick={onClose}>
            {drawer.back}
          </Button>
          <Button type="button">{drawer.next}</Button>
        </div>
      </div>
    </div>
  )
}
