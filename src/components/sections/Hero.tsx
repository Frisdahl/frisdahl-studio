import { useLocale } from '../../context/LocaleContext'
import { CtaPillButton } from '../ui'
import styles from './Hero.module.css'

const heroContent = {
  da: {
    line1Start: 'DIGITALE',
    line1End: 'BRANDS',
    line2Start: 'DER',
    line2End: 'SKABER V\u00c6RDI.',
    cta: 'SE VORES ARBEJDE',
    intro:
      'Vi skaber digitale oplevelser, der styrker dit brand og skaber m\u00e5lbare resultater. Strategi, design og teknologi \u2013 alt samlet \u00e9t sted.',
    aboutLabel: 'HVEM VI ER',
    about:
      'Frisdahl Studio er en digital design- og udviklingspartner for ambiti\u00f8se brands. Vi skaber identiteter og digitale oplevelser, der st\u00e5r skarpt, f\u00f8les rigtige og skaber m\u00e5lbare resultater.',
  },
  en: {
    line1Start: 'DIGITAL',
    line1End: 'BRANDS',
    line2Start: 'THAT',
    line2End: 'CREATE VALUE.',
    cta: 'VIEW OUR WORK',
    intro:
      'We create digital experiences that strengthen your brand and deliver measurable results. Strategy, design, and technology \u2013 all in one place.',
    aboutLabel: 'WHO WE ARE',
    about:
      'Frisdahl Studio is a digital design and development partner for ambitious brands. We create identities and digital experiences that stand out, feel right, and deliver measurable results.',
  },
} as const

export function Hero() {
  const { locale } = useLocale()
  const content = heroContent[locale]

  return (
    <section className={styles.hero} aria-labelledby="home-hero-title">
      <div className={styles.inner}>
        <h1 id="home-hero-title" className={styles.title}>
          <span className={styles.titleRow}>
            <span>{content.line1Start}</span>
            <span className={styles.inlineVisual} aria-hidden="true">
              <video src="/promo_h264.mp4" autoPlay muted loop playsInline />
            </span>
            <span>{content.line1End}</span>
          </span>
          <span className={styles.titleRow}>
            <span>{content.line2Start}</span>
            <span className={`${styles.inlineVisual} ${styles.secondaryVisual}`} aria-hidden="true">
              <img src="/images/hero/hero-secondary.avif" alt="" />
            </span>
            <span>{content.line2End}</span>
          </span>
        </h1>

        <div className={styles.heroFooter}>
          <div className={`${styles.heroFooterColumn} ${styles.actionColumn}`}>
            <p className={styles.introText}>{content.intro}</p>
            <CtaPillButton href="/cases" className="cases-section-cta">
              {content.cta}
            </CtaPillButton>
          </div>
          <div className={`${styles.heroFooterColumn} ${styles.aboutColumn}`}>
            <div className={styles.aboutDivider} aria-hidden="true" />
            <p className={styles.aboutEyebrow}>{content.aboutLabel}</p>
            <p className={styles.aboutText}>
              <span className={styles.aboutMark} aria-hidden="true">{'\u273a'}</span>
              {content.about}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
