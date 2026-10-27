import { useLocale } from '../../context/LocaleContext'
import styles from './Hero.module.css'

const heroContent = {
  da: {
    // Three lines: line 2 and the final full stop carry the muted colour.
    headingLead: 'Jeg udvikler',
    headingMuted: 'digitale oplevelser',
    headingTail: 'med omtanke',
    intro:
      'Jeg designer og udvikler hjemmesider og webapps, der kombinerer stærkt design, gennemført brugeroplevelse og teknisk performance – fra idé til færdigt produkt.',
  },
  en: {
    headingLead: 'I develop',
    headingMuted: 'digital experiences',
    headingTail: 'with care',
    intro:
      'I design and develop websites and webapps that combine strong design, thoughtful user experience and technical performance – from idea to finished product.',
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
            {content.headingLead}
            <br />
            <span className={styles.titleMuted}>{content.headingMuted}</span>
            <br />
            {content.headingTail}
            <span className={styles.titleMuted}>.</span>
          </h1>
          <p className={styles.intro}>{content.intro}</p>
        </div>

        <div className={styles.media}>
          <video src="/promo_h264.mp4" autoPlay muted loop playsInline aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
