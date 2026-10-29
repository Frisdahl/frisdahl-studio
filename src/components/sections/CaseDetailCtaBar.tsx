import { useContactDrawer } from '../../context/ContactDrawerContext'
import { useLocale } from '../../context/LocaleContext'
import { ArrowChipButton, ContactButton } from '../ui'

interface CaseDetailCtaBarProps {
  previousHref: string
  nextHref: string
  /** The case's own website; without one the button falls back to the contact drawer. */
  liveUrl: string | null
}

export function CaseDetailCtaBar({ previousHref, nextHref, liveUrl }: CaseDetailCtaBarProps) {
  const { openDrawer } = useContactDrawer()
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
        href={liveUrl ?? undefined}
        external
        onClick={() => openDrawer('contact')}
      >
        {isDa ? 'Se hjemmeside' : 'Visit website'}
      </ContactButton>
      <ArrowChipButton
        direction="right"
        label={isDa ? 'Næste case' : 'Next case'}
        href={nextHref}
      />
    </nav>
  )
}
