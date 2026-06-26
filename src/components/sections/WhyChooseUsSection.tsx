import type { WhyChooseUsContent } from '../../types/whyChooseUs'
import { Container } from '../ui'

interface WhyChooseUsSectionProps {
  content: WhyChooseUsContent
}

interface MarqueeRowProps {
  keywords: string[]
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

export function WhyChooseUsSection({ content }: WhyChooseUsSectionProps) {
  const [topRow, bottomRow] = content.rows

  return (
    <section className="why-choose-section py-section-sm lg:py-section" aria-labelledby="why-choose-title">
      <Container>
        <div className="why-choose-grid">
          <div className="why-choose-copy">
            <h2 id="why-choose-title" className="why-choose-title">
              {content.title}
            </h2>
          </div>

          <div className="why-choose-marquees">
            <MarqueeRow keywords={topRow} direction="left" />
            <MarqueeRow keywords={bottomRow} direction="right" />
          </div>
        </div>
      </Container>
    </section>
  )
}
