import type { Locale } from './navigation'
import { defaultLocale } from './navigation'

export const siteName = 'Frisdahl Studio'

const pageMetaContent = {
  da: {
    // Same copy as the home hero intro.
    siteDescription:
      'Jeg skaber digitale oplevelser, der styrker dit brand og skaber målbare resultater. Strategi, design og teknologi – alt samlet ét sted.',
    titles: {
      cases: 'Cases',
      meetUs: 'Mød mig',
      contact: 'Kontakt',
      privacyPolicy: 'Datapolitik',
      notFound: 'Siden blev ikke fundet',
    },
    notFound: {
      text: 'Den side, du leder efter, findes ikke eller er blevet flyttet.',
      cta: 'Gå til forsiden',
    },
  },
} as const

export type PageMetaContent = (typeof pageMetaContent)[Locale]

export function getPageMetaContent(locale: Locale = defaultLocale): PageMetaContent {
  return pageMetaContent[locale]
}
