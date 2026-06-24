import { type CSSProperties, useRef, useState } from 'react'
import { useLocale } from '../../context/LocaleContext'
import { useScrollTheme } from '../../hooks'
import { getHomeContent } from '../../data/home'
import { SplitIntroSection } from './SplitIntroSection'
import { PricingCards } from './PricingCards'

const slidePlaceholderTones = [
  'bg-peach',
  'bg-peach-hover',
  'bg-peach',
  'bg-peach-hover',
] as const

export function PricingSection() {
  const { locale } = useLocale()
  const { pricing, pricingPage } = getHomeContent(locale)
  const { examplesIntro } = pricingPage
  const sliderRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const slideCount = pricing.slides.length
  const isFirstSlide = activeIndex === 0
  const isLastSlide = activeIndex === slideCount - 1
  const progress = ((activeIndex + 1) / slideCount) * 100

  const goToPrevious = () => {
    setActiveIndex((index) => Math.max(0, index - 1))
  }

  const goToNext = () => {
    setActiveIndex((index) => Math.min(slideCount - 1, index + 1))
  }

  useScrollTheme({
    startRef: sliderRef,
    endId: 'priser',
    endAtBottom: true,
  })

  return (
    <SplitIntroSection
      id="priser"
      eyebrow={pricing.eyebrow}
      title={pricing.title}
      description={pricing.description}
    >
      <div
        ref={sliderRef}
        className="pricing-slider mt-4xl lg:mt-5xl"
        aria-label={pricing.sliderAriaLabel}
      >
        <div className="pricing-slider-viewport">
          <div
            className="pricing-slider-track"
            style={{ '--active-index': activeIndex } as CSSProperties}
          >
            {pricing.slides.map((slide, index) => (
              <figure
                key={slide.imageAlt}
                className="pricing-slider-slide"
                aria-hidden={index !== activeIndex}
              >
                {slide.imageSrc ? (
                  <img
                    src={slide.imageSrc}
                    alt={slide.imageAlt}
                    className="h-full w-full object-cover"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                ) : (
                  <div
                    className={`h-full w-full ${slidePlaceholderTones[index % slidePlaceholderTones.length]}`}
                    aria-label={slide.imageAlt}
                    role="img"
                  />
                )}
              </figure>
            ))}
          </div>
        </div>

        <div className="pricing-slider-controls">
          <button
            type="button"
            className="pricing-slider-btn"
            onClick={goToPrevious}
            disabled={isFirstSlide}
          >
            {pricing.sliderPrev}
          </button>

          <div className="pricing-slider-indicators" aria-hidden>
            {pricing.slides.map((slide, index) => (
              <span
                key={slide.imageAlt}
                className={`pricing-slider-indicator ${index === activeIndex ? 'pricing-slider-indicator-active' : ''}`}
              />
            ))}
          </div>

          <button
            type="button"
            className="pricing-slider-btn"
            onClick={goToNext}
            disabled={isLastSlide}
          >
            {pricing.sliderNext}
          </button>

          <div className="pricing-slider-progress" aria-hidden>
            <div
              className="pricing-slider-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <p className="sr-only">
          {pricing.sliderStatus.replace('{current}', String(activeIndex + 1)).replace('{total}', String(slideCount))}
        </p>
      </div>

      <div className="mt-4xl lg:mt-5xl">
        <div className="mx-auto w-full max-w-[700px] text-center">
          <h2>{examplesIntro.title}</h2>
        </div>
        <div className="mx-auto mt-md w-full max-w-[600px] text-center">
          <p className="text-body font-normal text-secondary">{examplesIntro.subtitle}</p>
        </div>
      </div>

      <PricingCards />
    </SplitIntroSection>
  )
}
