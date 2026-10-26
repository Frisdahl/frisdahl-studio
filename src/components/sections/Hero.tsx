import { useLocale } from '../../context/LocaleContext'
import { CtaPillButton } from '../ui'
import styles from './Hero.module.css'
import { HeroSellingPoints } from './HeroSellingPoints'

const heroContent = {
  da: {
    heading: 'Digitale brands der skaber v\u00e6rdi.',
    cta: 'Se mit arbejde',
    intro:
      'Jeg skaber digitale oplevelser, der styrker dit brand og skaber m\u00e5lbare resultater. Strategi, design og teknologi \u2013 alt samlet \u00e9t sted.',
  },
  en: {
    heading: 'Digital brands that create value.',
    cta: 'View my work',
    intro:
      'I create digital experiences that strengthen your brand and deliver measurable results. Strategy, design, and technology \u2013 all in one place.',
  },
} as const

export function Hero() {
  const { locale } = useLocale()
  const content = heroContent[locale]

  return (
    <section className={styles.hero} aria-labelledby="home-hero-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h1 id="home-hero-title" className={styles.title}>
            {content.heading}
          </h1>
          <p className={styles.intro}>{content.intro}</p>
          <CtaPillButton href="/cases" className="cases-section-cta">
            {content.cta}
          </CtaPillButton>
        </div>

        <div className={styles.media}>
          <video src="/promo_h264.mp4" autoPlay muted loop playsInline aria-hidden="true" />
        </div>

        <HeroSellingPoints className={styles.points} />
      </div>
    </section>
  )
}
