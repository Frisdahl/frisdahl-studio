import { type CSSProperties, useRef } from 'react'
import { useStickyScrollSteps } from '../../hooks/useStickyScrollSteps'
import { Container } from '../ui'

export interface ConceptScrollStep {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
}

interface ConceptScrollSliderProps {
  steps: readonly ConceptScrollStep[]
}

function getImageTranslateY(
  index: number,
  activeIndex: number,
  transitionProgress: number,
) {
  if (index <= activeIndex) return 0
  if (index === activeIndex + 1) return (1 - transitionProgress) * 100
  return 100
}

function getTextOpacity(
  index: number,
  activeIndex: number,
  transitionProgress: number,
) {
  if (index < activeIndex) return 0
  if (index === activeIndex) return 1 - transitionProgress
  if (index === activeIndex + 1) return transitionProgress
  return 0
}

export function ConceptScrollSlider({ steps }: ConceptScrollSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { activeIndex, transitionProgress } = useStickyScrollSteps(
    containerRef,
    steps.length,
  )

  return (
    <div
      ref={containerRef}
      className="concept-scroll"
      style={{ '--concept-scroll-steps': steps.length } as CSSProperties}
    >
      <div className="concept-scroll-sticky">
        <Container>
          <div className="concept-scroll-grid">
            <div className="concept-scroll-media">
              <div className="concept-scroll-media-frame">
                {steps.map((step, index) => (
                  <img
                    key={step.imageSrc}
                    src={step.imageSrc}
                    alt={step.imageAlt}
                    className="concept-scroll-image"
                    style={{
                      zIndex: index + 1,
                      transform: `translate3d(0, ${getImageTranslateY(index, activeIndex, transitionProgress)}%, 0)`,
                    }}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                ))}
              </div>
            </div>

            <div className="concept-scroll-copy">
              {steps.map((step, index) => {
                const opacity = getTextOpacity(index, activeIndex, transitionProgress)
                const isVisible = opacity > 0.05

                return (
                  <article
                    key={step.title}
                    className="concept-scroll-copy-panel"
                    style={{ opacity }}
                    aria-hidden={!isVisible}
                  >
                    <h4 className="concept-scroll-copy-title">{step.title}</h4>
                    <p className="concept-scroll-copy-description">{step.description}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}
