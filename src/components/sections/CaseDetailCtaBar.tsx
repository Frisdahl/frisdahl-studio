import { useContactDrawer } from '../../context/ContactDrawerContext'
import { useLocale } from '../../context/LocaleContext'
import { ArrowChipButton, ContactButton } from '../ui'

export function CaseDetailCtaBar() {
  const { openDrawer } = useContactDrawer()
  const { locale } = useLocale()
  const isDa = locale === 'da'

  return (
    <nav className="case-detail-cta-bar" aria-label={isDa ? 'Case-navigation' : 'Case navigation'}>
      <ArrowChipButton
        direction="left"
        label={isDa ? 'Forrige case' : 'Previous case'}
        onClick={() => openDrawer('contact')}
      />
      <ContactButton onClick={() => openDrawer('contact')}>
        {isDa ? 'Se hjemmeside' : 'Visit website'}
      </ContactButton>
      <ArrowChipButton
        direction="right"
        label={isDa ? 'Næste case' : 'Next case'}
        onClick={() => openDrawer('contact')}
      />
    </nav>
  )
}
