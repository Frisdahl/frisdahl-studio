import { HiXMark } from 'react-icons/hi2'

interface ContactDrawerHeaderProps {
  closeLabel: string
  onClose: () => void
}

export function ContactDrawerHeader({ closeLabel, onClose }: ContactDrawerHeaderProps) {
  return (
    <div className="contact-drawer-closebar">
      <button
        type="button"
        className="contact-drawer-close"
        aria-label={closeLabel}
        onClick={onClose}
      >
        <HiXMark className="h-8 w-8" aria-hidden />
      </button>
    </div>
  )
}
