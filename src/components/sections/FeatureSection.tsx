import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  type CSSProperties,
  type KeyboardEvent,
  useCallback,
  useRef,
} from 'react'
import { useLocale } from '../../context/LocaleContext'
import { getHomeContent } from '../../data/home'
import { useFeatureStepTimeline, useStickyScrollSteps } from '../../hooks'
import {
  FEATURE_IMAGE_VARIANTS,
  type FeatureImageDirection,
  FEATURE_SCROLL_END_HOLD_RATIO,
  FEATURE_STEP_INDENT,
  FEATURE_STEP_INACTIVE_OPACITY,
  FEATURE_STEP_OUTDENT,
  FEATURE_STEP_TRANSITION,
} from '../../lib/featureStepMotion'
import { smoothScrollTo } from '../../lib/smoothScroll'
import { Container } from '../ui'

function formatStepNumber(index: number) {
  return String(index + 1).padStart(2, '0')
}

export function FeatureSection() {
  const { locale } = useLocale()
  const { feature } = getHomeContent(locale)
  const scrollRef = useRef<HTMLDivElement>(null)
  const stepsShellRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLElement | null)[]>([])
  const stepCount = feature.steps.length
  const { activeIndex } = useStickyScrollSteps(scrollRef, stepCount, {
    endHoldRatio: FEATURE_SCROLL_END_HOLD_RATIO,
  })
  const shouldReduceMotion = useReducedMotion()
  const prevActiveIndexRef = useRef(activeIndex)
  const slideDirectionRef = useRef<FeatureImageDirection>(1)

  if (activeIndex !== prevActiveIndexRef.current) {
    slideDirectionRef.current = activeIndex > prevActiveIndexRef.current ? 1 : -1
    prevActiveIndexRef.current = activeIndex
  }

  const activeStep = feature.steps[activeIndex]
  const slideDirection = slideDirectionRef.current
  const { indicatorRef, indicatorY, indicatorRotate } = useFeatureStepTimeline(
    stepsShellRef,
    stepRefs,
    activeIndex,
    stepCount,
  )

  const scrollToStep = useCallback(
    (index: number) => {
      const container = scrollRef.current
      if (!container || stepCount <= 1) return

      const scrollable = container.offsetHeight - window.innerHeight
      if (scrollable <= 0) return

      const stepPortion = 1 - FEATURE_SCROLL_END_HOLD_RATIO
      const stepProgress = index / (stepCount - 1)
      const progress = stepPortion > 0 ? stepProgress * stepPortion : stepProgress
      const target = container.offsetTop + progress * scrollable
      smoothScrollTo(target)
    },
    [stepCount],
  )

  const handleStepKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>, index: number) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        scrollToStep(index)
      }
    },
    [scrollToStep],
  )

  return (
    <section className="feature-section" aria-label={feature.title}>
      <div
        ref={scrollRef}
        className="feature-scroll"
        style={{ '--feature-scroll-steps': stepCount } as CSSProperties}
      >
        <div className="feature-scroll-sticky">
          <Container fullWidth>
            <div className="feature-section-header">
              <h2 className="feature-section-title">{feature.title}</h2>
              <p className="feature-section-label">{feature.eyebrow}</p>
            </div>

            <div className="feature-section-body">
              <div ref={stepsShellRef} className="feature-steps-shell">
                <motion.span
                  ref={indicatorRef}
                  className="feature-step-indicator-floating"
                  style={{ y: indicatorY, rotate: indicatorRotate }}
                  aria-hidden="true"
                />

                <div className="feature-steps">
                  {feature.steps.map((step, index) => {
                    const isActive = activeIndex === index

                    return (
                      <motion.div
                        key={step.title}
                        ref={(element) => {
                          stepRefs.current[index] = element
                        }}
                        className={`feature-step${isActive ? ' is-active' : ''}`}
                        animate={{
                          opacity: isActive ? 1 : FEATURE_STEP_INACTIVE_OPACITY,
                        }}
                        transition={FEATURE_STEP_TRANSITION}
                        onClick={() => scrollToStep(index)}
                        onKeyDown={(event) => handleStepKeyDown(event, index)}
                        role="button"
                        tabIndex={0}
                        aria-current={isActive ? 'step' : undefined}
                      >
                        <span className="feature-step-indicator-anchor" aria-hidden="true" />
                        <motion.div
                          className="feature-step-columns"
                          animate={{ x: isActive ? FEATURE_STEP_INDENT : FEATURE_STEP_OUTDENT }}
                          transition={FEATURE_STEP_TRANSITION}
                        >
                          <p className="feature-step-number" aria-hidden="true">
                            {formatStepNumber(index)}
                          </p>
                          <div className="feature-step-copy">
                            <h3 className="feature-step-title">{step.title}</h3>
                            <p className="feature-step-description">{step.description}</p>
                          </div>
                        </motion.div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              <div className="feature-section-media" aria-live="polite">
                <div className="feature-section-media-frame">
                  {shouldReduceMotion ? (
                    <img
                      key={activeStep.imageSrc}
                      src={activeStep.imageSrc}
                      alt={activeStep.imageAlt}
                      className="feature-section-media-image"
                      loading={activeIndex === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                  ) : (
                    <AnimatePresence initial={false} custom={slideDirection}>
                      <motion.img
                        key={activeStep.imageSrc}
                        src={activeStep.imageSrc}
                        alt={activeStep.imageAlt}
                        className="feature-section-media-image"
                        custom={slideDirection}
                        variants={FEATURE_IMAGE_VARIANTS}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={FEATURE_STEP_TRANSITION}
                        loading={activeIndex === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                    </AnimatePresence>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  )
}
