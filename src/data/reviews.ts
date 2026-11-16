import type { Locale } from './navigation'
import { defaultLocale } from './navigation'

export interface ReviewItem {
  quote: string
  name: string
  role: string
  company: string
  /** The reviewer's portrait. */
  imageSrc: string
  imageAlt: string
  /** The project the review is about: a link under the review. */
  caseHref?: string
}

export interface ReviewsContent {
  ariaLabel: string
  previousLabel: string
  nextLabel: string
  caseLinkLabel: string
  reviews: ReviewItem[]
}

// Real reviews only. With one review the carousel hides its arrows; add more and they return.
const reviewsContent: Record<Locale, ReviewsContent> = {
  da: {
    ariaLabel: 'Anmeldelser',
    previousLabel: 'Forrige anmeldelse',
    nextLabel: 'Næste anmeldelse',
    caseLinkLabel: 'Se projektet',
    reviews: [
      {
        quote:
          'Alexander var super skarp i behovsafsøgningsfasen. Han satte sig godt ind i konventionerne for mit felt, og kom tilbage med elegante løsninger til hvordan man kunne forbedre og styrke de konventioner af hjemmesidedesign. Han har leveret et produkt, som er meget høj kvalitet, super stilet og som dækker mine kommunikationsbehov. Og så er han rigtig behagelig og serviceminded hele vejen igennem. Stor anbefaling herfra!',
        name: 'Peter Salling',
        role: 'Filmproducer',
        company: 'petersalling.com',
        imageSrc: '/images/reviews/peter-salling.webp',
        imageAlt: 'Portræt af filmproducer Peter Salling',
        caseHref: '/cases/peter-salling',
      },
    ],
  },
}

export function getReviewsContent(locale: Locale = defaultLocale): ReviewsContent {
  return reviewsContent[locale]
}
