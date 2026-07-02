import { HiArrowUp } from 'react-icons/hi2'
import { useLocale } from '../../context/LocaleContext'
import { getHomeContent } from '../../data/home'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import { smoothScrollTo } from '../../lib/smoothScroll'

const RING_RADIUS = 22
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

export function ScrollProgressButton() {
  const { locale } = useLocale()
  const { scrollToTopLabel } = getHomeContent(locale)
  const { progress, isVisible } = useScrollProgress()
  const strokeDashoffset = RING_CIRCUMFERENCE * (1 - progress)

  const scrollToTop = () => {
    smoothScrollTo(0)
  }

  return (
    <button
      type="button"
      className={`scroll-progress-btn ${isVisible ? 'scroll-progress-btn-visible' : ''}`}
      onClick={scrollToTop}
      aria-label={scrollToTopLabel}
    >
      <svg
        className="scroll-progress-ring"
        viewBox="0 0 56 56"
        aria-hidden="true"
        focusable="false"
      >
        <circle
          className="scroll-progress-fill"
          cx="28"
          cy="28"
          r={RING_RADIUS}
          strokeDasharray={RING_CIRCUMFERENCE}
          strokeDashoffset={strokeDashoffset}
          opacity={progress > 0 ? 1 : 0}
          transform="rotate(-90 28 28)"
        />
      </svg>

      <HiArrowUp className="scroll-progress-icon" aria-hidden="true" />
    </button>
  )
}
