import type { CasesHeroSlide } from '../../types/cases'

interface CasesImageMarqueeProps {
  slides: CasesHeroSlide[]
  ariaLabel: string
  className?: string
}

export function CasesImageMarquee({
  slides,
  ariaLabel,
  className = '',
}: CasesImageMarqueeProps) {
  return (
    <div
      className={`cases-hero-slider ${className}`.trim()}
      role="region"
      aria-label={ariaLabel}
    >
      <div className="cases-hero-slider-viewport">
        <div className="cases-hero-slider-track">
          {[0, 1].map((groupIndex) => (
            <div
              key={groupIndex}
              className="cases-hero-slider-group"
              aria-hidden={groupIndex === 1}
            >
              {slides.map((slide) => (
                <figure
                  key={`${groupIndex}-${slide.imageAlt}`}
                  className="cases-hero-slider-slide"
                >
                  {slide.imageSrc ? (
                    <img
                      src={slide.imageSrc}
                      alt={groupIndex === 0 ? slide.imageAlt : ''}
                      className="h-full w-full object-cover"
                      loading={groupIndex === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      draggable={false}
                    />
                  ) : (
                    <div
                      className={`h-full w-full ${slide.placeholderClassName ?? 'bg-peach'}`}
                      role="img"
                      aria-label={groupIndex === 0 ? slide.imageAlt : undefined}
                    />
                  )}
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
