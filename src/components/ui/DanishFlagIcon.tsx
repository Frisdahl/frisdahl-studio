interface DanishFlagIconProps {
  className?: string
}

/** A small Danish flag (the Dannebrog, 37:28), drawn inline so it needs no file. Decorative. */
export function DanishFlagIcon({ className = '' }: DanishFlagIconProps) {
  return (
    <svg
      className={`danish-flag-icon ${className}`.trim()}
      viewBox="0 0 37 28"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="37" height="28" fill="#c8102e" />
      <rect x="12" width="4" height="28" fill="#ffffff" />
      <rect y="12" width="37" height="4" fill="#ffffff" />
    </svg>
  )
}
