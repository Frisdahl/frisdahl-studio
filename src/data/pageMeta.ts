import type { Locale } from './navigation'
import { defaultLocale } from './navigation'

export const siteName = 'Frisdahl Studio'

const pageMetaContent = {
  da: {
    // Same copy as the home hero intro.
    siteDescription:
      'Vi skaber digitale oplevelser, der styrker dit brand og skaber målbare resultater. Strategi, design og teknologi – alt samlet ét sted.',
    titles: {
      cases: 'Cases',
      pricing: 'Priser',
      meetUs: 'Mød os',
      process: 'Proces',
      webDevelopment: 'Webudvikling',
      privacyPolicy: 'Datapolitik',
      notFound: 'Siden blev ikke fundet',
    },
    notFound: {
      text: 'Den side, du leder efter, findes ikke eller er blevet flyttet.',
      cta: 'Gå til forsiden',
    },
  },
  en: {
    siteDescription:
      'We create digital experiences that strengthen your brand and deliver measurable results. Strategy, design, and technology – all in one place.',
    titles: {
      cases: 'Cases',
      pricing: 'Pricing',
      meetUs: 'Meet us',
      process: 'Process',
      webDevelopment: 'Web development',
      privacyPolicy: 'Privacy policy',
      notFound: 'Page not found',
    },
    notFound: {
      text: 'The page you are looking for does not exist or has been moved.',
      cta: 'Go to the front page',
    },
  },
} as const

export type PageMetaContent = (typeof pageMetaContent)[Locale]

export function getPageMetaContent(locale: Locale = defaultLocale): PageMetaContent {
  return pageMetaContent[locale]
}
