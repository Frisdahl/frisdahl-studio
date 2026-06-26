import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useId, useState } from 'react'
import type { FaqContent } from '../../types/faq'
import { Container } from '../ui'

interface FaqSectionProps {
  content: FaqContent
}

interface FaqToggleIconProps {
  isOpen: boolean
}

function FaqToggleIcon({ isOpen }: FaqToggleIconProps) {
  return (
    <span className="faq-toggle-icon" aria-hidden="true">
      <span className="faq-toggle-line faq-toggle-line-horizontal" />
      <span
        className={[
          'faq-toggle-line faq-toggle-line-vertical',
          isOpen ? 'faq-toggle-line-vertical-collapsed' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      />
    </span>
  )
}

interface FaqItemProps {
  item: FaqContent['items'][number]
  isOpen: boolean
  onToggle: () => void
  itemId: string
}

function FaqItemRow({ item, isOpen, onToggle, itemId }: FaqItemProps) {
  const shouldReduceMotion = useReducedMotion()
  const answerId = `${itemId}-answer`

  return (
    <div className="faq-item">
      <h3 className="faq-item-heading">
        <button
          type="button"
          className="faq-question"
          aria-expanded={isOpen}
          aria-controls={answerId}
          onClick={onToggle}
        >
          <span className="faq-question-text">{item.question}</span>
          <span className="faq-question-icon" aria-hidden="true">
            <FaqToggleIcon isOpen={isOpen} />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            id={answerId}
            className="faq-answer-wrap"
            initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
            animate={
              shouldReduceMotion
                ? { height: 'auto', opacity: 1 }
                : { height: 'auto', opacity: 1 }
            }
            exit={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="faq-answer">{item.answer}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export function FaqSection({ content }: FaqSectionProps) {
  const sectionId = useId()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="faq-section py-section-sm lg:py-section" aria-labelledby={`${sectionId}-title`}>
      <Container>
        <div className="faq-section-header">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 id={`${sectionId}-title`} className="mt-md">
            {content.title}
          </h2>
        </div>

        <div className="faq-list mt-3xl w-full border-t border-border">
          {content.items.map((item, index) => (
            <FaqItemRow
              key={item.question}
              item={item}
              itemId={`${sectionId}-item-${index}`}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex((current) => (current === index ? null : index))}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
