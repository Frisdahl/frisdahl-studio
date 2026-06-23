interface FlagIconProps {
  locale: 'da' | 'en'
  className?: string
}

export function FlagIcon({ locale, className = '' }: FlagIconProps) {
  if (locale === 'da') {
    return (
      <svg
        className={className}
        viewBox="0 0 24 18"
        aria-hidden="true"
      >
        <rect width="24" height="18" fill="#C8102E" />
        <rect x="7" width="4" height="18" fill="#ffffff" />
        <rect y="7" width="24" height="4" fill="#ffffff" />
      </svg>
    )
  }

  return (
    <svg
      className={className}
      viewBox="0 0 24 18"
      aria-hidden="true"
    >
      <rect width="24" height="18" fill="#012169" />
      <path d="M0 0 24 18M24 0 0 18" stroke="#ffffff" strokeWidth="3.5" />
      <path d="M0 0 24 18M24 0 0 18" stroke="#C8102E" strokeWidth="2" />
      <path d="M12 0V18M0 9H24" stroke="#ffffff" strokeWidth="6" />
      <path d="M12 0V18M0 9H24" stroke="#C8102E" strokeWidth="3.5" />
    </svg>
  )
}
