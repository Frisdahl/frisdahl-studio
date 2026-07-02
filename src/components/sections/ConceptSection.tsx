import { useLocale } from '../../context/LocaleContext'
import { getHomeContent } from '../../data/home'
import { ConceptScrollSlider } from './ConceptScrollSlider'
import { SplitIntroSection } from './SplitIntroSection'

export function ConceptSection() {
  const { locale } = useLocale()
  const { concept } = getHomeContent(locale)

  return (
    <SplitIntroSection
      id="om-os"
      eyebrow={concept.eyebrow}
      title={concept.title}
      description={concept.description}
      eyebrowTheme
      alignDescriptionEnd
    >
      <ConceptScrollSlider steps={concept.steps} />
    </SplitIntroSection>
  )
}
