import { type CSSProperties, useCallback, useEffect, useRef } from 'react'
import { getScrollY, smoothScrollTo } from '../../lib/smoothScroll'
import { buildTrackMetrics, getScrollProgressForSlideIndex } from '../../lib/processSliderTrack'
import { useProcessSliderMotion } from '../../hooks/useProcessSliderMotion'
import type { ProcessSliderContent } from '../../types/process'
import { getSlideClassName, ProcessSliderMedia } from './ProcessSliderMedia'

interface ProcessSliderSectionProps {
  content: ProcessSliderContent
}

export function ProcessSliderSection({ content }: ProcessSliderSectionProps) {
  const { label, steps, sliderAriaLabel, sliderStatus } = content
  const slideCount = steps.length
  const scrollRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const statusRef = useRef<HTMLParagraphElement>(null)
  const slideRefs = useRef<(HTMLElement | null)[]>([])

  useProcessSliderMotion({
    scrollRef,
    trackRef,
    progressRef,
    statusRef,
    slideRefs,
    steps,
    statusTemplate: sliderStatus,
  })

  const goToSlide = useCallback(
    (index: number) => {
      const element = scrollRef.current
      if (!element || slideCount <= 1) return

      const sticky = element.querySelector<HTMLElement>('.process-slider-sticky')
      const scrollable = element.offsetHeight - (sticky?.offsetHeight ?? window.innerHeight)
      if (scrollable <= 0) return

      const metrics = buildTrackMetrics(steps, document.documentElement.clientWidth / 100)
      const targetScrolled = getScrollProgressForSlideIndex(index, metrics) * scrollable
      const currentScrolled = Math.min(
        scrollable,
        Math.max(0, -element.getBoundingClientRect().top),
      )

      smoothScrollTo(getScrollY() + (targetScrolled - currentScrolled))
    },
    [slideCount, steps],
  )

  useEffect(() => {
    steps.forEach((step) => {
      ;[step.imageSrc, step.imageSrcSecondary].forEach((src) => {
        if (!src) return
        const img = new Image()
        img.src = src
        void img.decode?.().catch(() => undefined)
      })
    })
  }, [steps])

  return (
    <section className="process-slider-section" aria-label={sliderAriaLabel}>
      <div
        ref={scrollRef}
        className="process-slider-scroll"
        style={{ '--slide-count': slideCount } as CSSProperties}
      >
        <div className="process-slider-sticky">
          <div className="process-slider-shell">
            <div className="process-slider-viewport">
              <div ref={trackRef} className="process-slider-track">
                {steps.map((step, index) => (
                  <article
                    key={step.imageOnly ? `${step.imageSrc}-${index}` : step.title}
                    ref={(element) => {
                      slideRefs.current[index] = element
                    }}
                    className={getSlideClassName(step)}
                    aria-hidden={index !== 0}
                    aria-label={step.imageOnly ? step.imageAlt : undefined}
                  >
                    {!step.imageOnly ? (
                      <div className="process-slider-copy">
                        <h2 className="process-slider-title">{step.title}</h2>
                        <p className="process-slider-description">{step.description}</p>
                        {step.keywords.length > 0 ? (
                          <ul className="process-slider-keywords">
                            {step.keywords.map((keyword) => (
                              <li key={keyword}>
                                <span className="process-slider-keyword">{keyword}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    ) : null}

                    <ProcessSliderMedia
                      step={step}
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                  </article>
                ))}
              </div>
            </div>

            <div className="process-slider-overlay">
              <div className="process-slider-progress" aria-hidden="true">
                <div ref={progressRef} className="process-slider-progress-fill" />
                <div className="process-slider-progress-segments">
                  {steps.map((step, index) => (
                    <button
                      key={step.imageOnly ? `${step.imageSrc}-${index}` : step.title}
                      type="button"
                      className="process-slider-progress-segment"
                      onClick={() => goToSlide(index)}
                      aria-label={step.imageOnly ? step.imageAlt : step.title}
                    />
                  ))}
                </div>
              </div>

              <p className="process-slider-label">
                <span className="process-slider-label-mark" aria-hidden="true" />
                {label}
              </p>
            </div>

            <p ref={statusRef} className="sr-only" aria-live="polite">
              {sliderStatus.replace('{current}', '1').replace('{total}', String(slideCount))}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
