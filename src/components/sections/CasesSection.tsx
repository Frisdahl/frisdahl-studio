import { Link } from 'react-router-dom'
import { CaseCard } from '../cards/CaseCard'
import { getCaseMainVideo } from '../../data/caseVideos'
import { Container, MaskedLineReveal, WithHeadingDot } from '../ui'
import { MEET_US_PATH } from '../../lib/routes'
import { useLocale } from '../../context/LocaleContext'
import { getHomeContent } from '../../data/home'
import { DUR, EASE, STAGGER } from '../../lib/motion'

/** How many projects the home page shows, one per row. */
const FEATURED_COUNT = 2

export function CasesSection() {
  const { locale } = useLocale()
  const { cases } = getHomeContent(locale)
  return (
    <section
      id="portfolio"
      className="home-cases py-section-sm lg:py-section"
      aria-label={cases.ariaLabel}
    >
      <Container columns>
        <div className="home-cases-intro">
          <h2 className="home-cases-intro-title">
            <WithHeadingDot>{cases.intro.title}</WithHeadingDot>
          </h2>
          <div className="home-cases-intro-image-wrapper">
            <img
              src="/images/gallery-board--16-9.webp"
              alt="Galleritavle med udvalgt designarbejde fra Frisdahl Studio"
              width={2000}
              height={1131}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="home-cases-intro-text-col">
            <p className="home-cases-intro-text">
              {cases.intro.textBefore}
              <Link to={MEET_US_PATH} className="home-cases-intro-link">
                {cases.intro.name}
              </Link>
              {cases.intro.textAfter}
            </p>
            <p className="home-cases-intro-text">{cases.intro.textMore}</p>
          </div>
        </div>
        {/* "Seneste projekter" rises line by line when it scrolls into view; the intro above it is
            plain, static text. The project rows do the same inside CaseCard (revealOnScroll). */}
        <MaskedLineReveal
          as="h2"
          className="home-cases-list-title"
          start="top 85%"
          duration={DUR.line}
          stagger={STAGGER.lines}
          ease={EASE.rise}
          revertWhenDone
        >
          <WithHeadingDot>{cases.listTitle}</WithHeadingDot>
        </MaskedLineReveal>

        {/* Inside the content container, so the images line up with the
            page's side margins like the text above. */}
        <div className="home-cases-list">
          {cases.items.slice(0, FEATURED_COUNT).map((item) => (
            <CaseCard
              key={item.id}
              client={item.client}
              keywords={item.keywords}
              imageSrc={item.imageSrc}
              imageAlt={item.imageAlt}
              video={getCaseMainVideo(item.id)}
              href={item.href}
              metaBelow
              revealOnScroll
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
