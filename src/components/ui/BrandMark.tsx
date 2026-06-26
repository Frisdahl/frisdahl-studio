interface BrandMarkProps {
  className?: string
}

export function BrandMark({ className }: BrandMarkProps) {
  return (
    <span className={['brand-mark', className].filter(Boolean).join(' ')}>
      <span className="brand-mark-stack" aria-hidden="true">
        <span className="brand-mark-letter">F</span>
        <span className="brand-mark-letter">S</span>
      </span>
      <span className="brand-mark-reg" aria-hidden="true">
        ®
      </span>
    </span>
  )
}
