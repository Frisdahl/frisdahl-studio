import { useCallback, useState } from 'react'
import { useContactDrawer } from '../../context/ContactDrawerContext'
import { NavMirroredText } from './NavMirroredText'

interface NavContactLinkProps {
  label: string
}

export function NavContactLink({ label }: NavContactLinkProps) {
  const { openDrawer } = useContactDrawer()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSettled, setIsSettled] = useState(false)

  const playEntrance = useCallback(() => {
    setIsSettled(false)
    setIsPlaying(false)

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsPlaying(true)
      })
    })
  }, [])

  const settleText = useCallback(() => {
    setIsPlaying(false)
    setIsSettled(true)
  }, [])

  return (
    <button
      type="button"
      className={[
        'nav-link',
        'nav-link-contact',
        isPlaying ? 'nav-link-contact-playing' : '',
        isSettled ? 'nav-link-contact-settled' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={() => openDrawer('contact')}
      onMouseEnter={playEntrance}
      onMouseLeave={settleText}
      onFocus={playEntrance}
      onBlur={settleText}
    >
      <span className="nav-mirrored-text-sizer" aria-hidden="true">
        {label}
      </span>
      <NavMirroredText text={label} />
    </button>
  )
}
