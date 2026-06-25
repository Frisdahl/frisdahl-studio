import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { toAppHref } from '../../lib/routes'
import { NavMirroredText } from './NavMirroredText'

interface NavContactLinkProps {
  label: string
  href?: string
}

export function NavContactLink({ label, href = '/#contact' }: NavContactLinkProps) {
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
    <Link
      to={toAppHref(href)}
      className={[
        'nav-link',
        'nav-link-contact',
        isPlaying ? 'nav-link-contact-playing' : '',
        isSettled ? 'nav-link-contact-settled' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onMouseEnter={playEntrance}
      onMouseLeave={settleText}
      onFocus={playEntrance}
      onBlur={settleText}
    >
      <span className="nav-mirrored-text-sizer" aria-hidden="true">
        {label}
      </span>
      <NavMirroredText text={label} />
    </Link>
  )
}
