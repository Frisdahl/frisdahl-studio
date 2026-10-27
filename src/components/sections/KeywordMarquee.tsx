import type { WhyChooseUsContent } from '../../types/whyChooseUs'

interface MarqueeRowProps {
  keywords: readonly string[]
  direction: 'left' | 'right'
}

function MarqueeRow({ keywords, direction }: MarqueeRowProps) {
  return (
    <div
      className={[
        'why-choose-marquee-row',
        direction === 'left' ? 'why-choose-marquee-row-left' : 'why-choose-marquee-row-right',
      ].join(' ')}
    >
      <div className="why-choose-marquee-track">
        {[0, 1].map((groupIndex) => (
          <ul
            key={groupIndex}
            className="why-choose-marquee-group"
            aria-hidden={groupIndex === 1}
          >
            {keywords.map((keyword) => (
              <li key={`${groupIndex}-${keyword}`}>
                <span className="why-choose-keyword">{keyword}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

interface KeywordMarqueeProps {
  rows: WhyChooseUsContent['rows']
  /** Accessible name, only needed when the marquee is not inside a titled section. */
  label?: string
  className?: string
}

// Two rows of keyword chips scrolling in opposite directions.
export function KeywordMarquee({ rows, label, className = '' }: KeywordMarqueeProps) {
  const [topRow, bottomRow] = rows

  return (
    <div
      className={`why-choose-marquees ${className}`.trim()}
      role={label ? 'region' : undefined}
      aria-label={label}
    >
      <MarqueeRow keywords={topRow} direction="left" />
      <MarqueeRow keywords={bottomRow} direction="right" />
    </div>
  )
}
