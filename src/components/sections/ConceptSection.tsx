import type { IconType } from 'react-icons'
import { HiArrowTrendingUp, HiMagnifyingGlass, HiSquares2X2 } from 'react-icons/hi2'
import { useLocale } from '../../context/LocaleContext'
import { getHomeContent } from '../../data/home'
import { SplitIntroSection } from './SplitIntroSection'

const stepIcons: IconType[] = [HiMagnifyingGlass, HiArrowTrendingUp, HiSquares2X2]

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
    >
      <div className="mt-4xl grid gap-xl md:grid-cols-3 lg:mt-5xl">
        {concept.steps.map((step, index) => {
          const Icon = stepIcons[index]

          return (
            <article
              key={step.title}
              className="flex h-full flex-col rounded-panel-lg bg-concept-step-bg px-8 py-10 text-surface lg:px-10 lg:py-12"
            >
              <Icon className="h-8 w-8 text-surface" aria-hidden="true" />
              <h4 className="mt-lg text-[1.375rem] font-semibold leading-[1.3] text-surface lg:text-[1.5rem]">
                {step.title}
              </h4>
              <p className="mt-sm text-disabled">{step.description}</p>
            </article>
          )
        })}
      </div>
    </SplitIntroSection>
  )
}
