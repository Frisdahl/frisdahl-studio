import { useLocale } from '../../context/LocaleContext'
import { CONTACT_PATH } from '../../lib/routes'
import { ArrowChipButton, ContactButton } from '../ui'

interface CaseDetailCtaBarProps {
  previousHref: string
  nextHref: string
  /** The case's own website; without one the button falls back to the contact page. */
  liveUrl: string | null
}

export function CaseDetailCtaBar({ previousHref, nextHref, liveUrl }: CaseDetailCtaBarProps) {
  const { locale } = useLocale()
  const isDa = locale === 'da'

  return (
    <nav className="case-detail-cta-bar" aria-label={isDa ? 'Case-navigation' : 'Case navigation'}>
      <ArrowChipButton
        direction="left"
        label={isDa ? 'Forrige case' : 'Previous case'}
        href={previousHref}
      />
      <ContactButton
        href={liveUrl ?? CONTACT_PATH}
        external={Boolean(liveUrl)}
      >
        {isDa ? 'Se live' : 'View live'}
      </ContactButton>
      <ArrowChipButton
        direction="right"
        label={isDa ? 'Næste case' : 'Next case'}
        href={nextHref}
      />
    </nav>
  )
}
