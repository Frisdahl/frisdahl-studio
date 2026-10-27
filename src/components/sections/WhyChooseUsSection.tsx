import type { WhyChooseUsContent } from '../../types/whyChooseUs'
import { Container } from '../ui'
import { KeywordMarquee } from './KeywordMarquee'

interface WhyChooseUsSectionProps {
  content: WhyChooseUsContent
}

export function WhyChooseUsSection({ content }: WhyChooseUsSectionProps) {
  return (
    <section className="why-choose-section py-section-sm lg:py-section" aria-labelledby="why-choose-title">
      <Container>
        <div className="why-choose-grid">
          <div className="why-choose-copy">
            <h4 id="why-choose-title" className="why-choose-title">
              {content.title}
            </h4>
          </div>

          <KeywordMarquee rows={content.rows} />
        </div>
      </Container>
    </section>
  )
}
