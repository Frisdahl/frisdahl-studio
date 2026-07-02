import { useContactDrawer } from '../../context/ContactDrawerContext'

interface NavContactLinkProps {
  label: string
}

export function NavContactLink({ label }: NavContactLinkProps) {
  const { openDrawer } = useContactDrawer()

  return (
    <button
      type="button"
      className="nav-link nav-link-contact"
      onClick={() => openDrawer('contact')}
    >
      {label}
    </button>
  )
}
