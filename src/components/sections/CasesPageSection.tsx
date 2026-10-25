import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { HiXMark } from 'react-icons/hi2'
import { CaseSlideCard } from '../cards/CaseSlideCard'
import { useLocale } from '../../context/LocaleContext'
import {
  getCasesPageContent,
  getCasesResultsCountLabel,
} from '../../data/cases'
import type { CaseCategory } from '../../types/cases'
import { Container, HorizontalDragSlider } from '../ui'

const placeholderTones = ['bg-peach', 'bg-peach-hover'] as const
const countEnterEase = [0.16, 1, 0.3, 1] as const
const countExitEase = [0.4, 0, 0.2, 1] as const

const countSlideVariants = {
  initial: {
    y: '100%',
  },
  animate: {
    y: 0,
    transition: {
      type: 'tween' as const,
      duration: 0.55,
      ease: countEnterEase,
    },
  },
  exit: {
    y: '100%',
    transition: {
      type: 'tween' as const,
      duration: 0.55,
      ease: countExitEase,
    },
  },
}

const countSlideReducedMotionVariants = {
  initial: { y: 0 },
  animate: { y: 0 },
  exit: { y: 0 },
}

export function CasesPageSection() {
  const { locale } = useLocale()
  const shouldReduceMotion = useReducedMotion()
  const {
    eyebrow,
    title,
    filters,
    filtersAriaLabel,
    sliderAriaLabel,
    sliderPrev,
    sliderNext,
    sliderStatus,
    items,
  } = getCasesPageContent(locale)
  const [activeFilter, setActiveFilter] = useState<CaseCategory | null>(null)

  // A cheap filter over a handful of cases; no memoization needed.
  const filteredItems = activeFilter
    ? items.filter((item) => item.category === activeFilter)
    : items

  const resultsCountLabel = getCasesResultsCountLabel(locale, filteredItems.length)
  const resultsCountKey = `${activeFilter ?? 'all'}-${filteredItems.length}`
  const sliderResetKey = `${activeFilter ?? 'all'}-${filteredItems.map((item) => item.id).join('-')}`

  const handleFilterClick = (category: CaseCategory) => {
    setActiveFilter((current) => (current === category ? null : category))
  }

  const countVariants = shouldReduceMotion
    ? countSlideReducedMotionVariants
    : countSlideVariants

  return (
    <section className="cases-page relative isolate py-section-sm lg:py-section" aria-label={title}>
      <Container className="relative z-[1]">
        <div className="cases-page-intro">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="cases-page-title mt-md">{title}</h1>

          <div className="cases-page-filters-row">
            <div
              className="cases-page-filters"
              role="group"
              aria-label={filtersAriaLabel}
            >
              {filters.map((filter) => {
                const isActive = activeFilter === filter.id

                return (
                  <button
                    key={filter.id}
                    type="button"
                    className={`cases-filter-btn ${isActive ? 'cases-filter-btn-active' : ''}`.trim()}
                    aria-pressed={isActive}
                    onClick={() => handleFilterClick(filter.id)}
                  >
                    <span className="cases-filter-btn-label">{filter.label}</span>
                    <span className="cases-filter-btn-icon-wrap" aria-hidden="true">
                      <HiXMark className="cases-filter-btn-icon" />
                    </span>
                  </button>
                )
              })}
            </div>

            <div
              className="cases-page-results-count"
              aria-live="polite"
              aria-hidden={!activeFilter}
            >
              <div className="cases-page-results-count-track">
                <AnimatePresence mode="wait">
                  {activeFilter ? (
                    <motion.div
                      key={resultsCountKey}
                      className="cases-page-results-count-slide"
                      variants={countVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <span className="cases-page-results-count-text">
                        {resultsCountLabel}
                      </span>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        <div className="cases-page-divider" role="separator" aria-hidden="true" />

        {filteredItems.length > 0 ? (
          <HorizontalDragSlider
            className="cases-page-slider cases-slider"
            ariaLabel={sliderAriaLabel}
            prevLabel={sliderPrev}
            nextLabel={sliderNext}
            statusTemplate={sliderStatus}
            slideCount={filteredItems.length}
            slidesPerView={2}
            resetKey={sliderResetKey}
            dragThresholdPx={3}
            snapRatio={0.24}
            axisLockRatio={1.45}
          >
            {filteredItems.map((item, index) => (
              <figure key={item.id} className="horizontal-drag-slider-slide">
                <CaseSlideCard
                  client={item.client}
                  industry={item.industry}
                  href={item.href}
                  imageSrc={item.imageSrc}
                  imageAlt={item.imageAlt}
                  placeholderClassName={placeholderTones[index % placeholderTones.length]}
                />
              </figure>
            ))}
          </HorizontalDragSlider>
        ) : null}
      </Container>
    </section>
  )
}
