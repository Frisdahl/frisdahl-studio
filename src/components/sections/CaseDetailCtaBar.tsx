import { CONTACT_PATH } from '../../lib/routes'
import { ArrowChipButton, ContactButton } from '../ui'

interface CaseDetailCtaBarProps {
  previousHref: string
  nextHref: string
  /** The case's own website; without one the button falls back to the contact page. */
  liveUrl: string | null
}

export function CaseDetailCtaBar({ previousHref, nextHref, liveUrl }: CaseDetailCtaBarProps) {
  return (
    <nav className="case-detail-cta-bar" aria-label="Case-navigation">
      <ArrowChipButton
        direction="left"
        label="Forrige case"
        href={previousHref}
      />
      <ContactButton
        href={liveUrl ?? CONTACT_PATH}
        external={Boolean(liveUrl)}
      >
        Se live
      </ContactButton>
      <ArrowChipButton
        direction="right"
        label="Næste case"
        href={nextHref}
      />
    </nav>
  )
}
