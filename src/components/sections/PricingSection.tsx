import { useEffect } from 'react'
import { useLocale } from '../../context/LocaleContext'
import { getHomeContent } from '../../data/home'
import { Container, HorizontalDragSlider } from '../ui'

const slidePlaceholderTones = [
  'bg-peach',
  'bg-peach-hover',
  'bg-peach',
  'bg-peach-hover',
] as const

export function PricingSection() {
  const { locale } = useLocale()
  const { pricing } = getHomeContent(locale)
  const slideCount = pricing.slides.length

  useEffect(() => {
    pricing.slides.forEach((slide) => {
      if (!slide.imageSrc) return

      const img = new Image()
      img.src = slide.imageSrc
      void img.decode?.().catch(() => undefined)
    })
  }, [pricing.slides])

  return (
    <section id="priser" className="pricing-examples py-section-sm lg:py-section">
      <Container>
        <HorizontalDragSlider
          className="pricing-slider"
          ariaLabel={pricing.sliderAriaLabel}
          prevLabel={pricing.sliderPrev}
          nextLabel={pricing.sliderNext}
          statusTemplate={pricing.sliderStatus}
          slideCount={slideCount}
        >
          {pricing.slides.map((slide, index) => (
            <figure key={slide.imageSrc} className="horizontal-drag-slider-slide">
              {slide.imageSrc ? (
                <img
                  src={slide.imageSrc}
                  alt={slide.imageAlt}
                  className="h-full w-full object-cover"
                  loading="eager"
                  decoding="async"
                  fetchPriority={index === 0 ? 'high' : 'low'}
                  draggable={false}
                />
              ) : (
                <div
                  className={`h-full w-full ${slidePlaceholderTones[index % slidePlaceholderTones.length]}`}
                  aria-label={pricing.slides[index]?.imageAlt ?? ''}
                  role="img"
                />
              )}
            </figure>
          ))}
        </HorizontalDragSlider>
      </Container>
    </section>
  )
}
