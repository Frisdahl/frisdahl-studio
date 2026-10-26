import { useRef, useState, type AnimationEvent } from 'react'
import { useContactDrawer } from '../../context/ContactDrawerContext'
import { NavMirroredText } from './NavMirroredText'

interface NavContactLinkProps {
  label: string
}

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function NavContactLink({ label }: NavContactLinkProps) {
  const { openDrawer } = useContactDrawer()
  const [isPlaying, setIsPlaying] = useState(false)
  const finishedCharsRef = useRef(0)

  // The text rise always plays to the end once started (cutting it off on
  // mouseleave made it flicker). It ends with the mirror line exactly where the
  // primary line started, so resetting afterwards is invisible.
  const playEntrance = () => {
    if (isPlaying || prefersReducedMotion()) return
    finishedCharsRef.current = 0
    setIsPlaying(true)
  }

  const handleAnimationEnd = (event: AnimationEvent<HTMLButtonElement>) => {
    if (event.animationName !== 'nav-contact-text-rise') return

    const totalChars = event.currentTarget.querySelectorAll('.nav-mirrored-text-char').length
    finishedCharsRef.current += 1

    if (finishedCharsRef.current >= totalChars) {
      finishedCharsRef.current = 0
      setIsPlaying(false)
    }
  }

  return (
    <button
      type="button"
      className={['nav-link', 'nav-link-contact', isPlaying ? 'nav-link-contact-playing' : '']
        .filter(Boolean)
        .join(' ')}
      onClick={() => openDrawer('contact')}
      onMouseEnter={playEntrance}
      onFocus={playEntrance}
      onAnimationEnd={handleAnimationEnd}
    >
      <span className="nav-mirrored-text-sizer" aria-hidden="true">
        {label}
      </span>
      <NavMirroredText text={label} />
    </button>
  )
}
