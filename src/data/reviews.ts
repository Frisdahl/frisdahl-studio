import type { Locale } from './navigation'
import { defaultLocale } from './navigation'

export interface ReviewItem {
  quote: string
  name: string
  role: string
  company: string
  /** Portrait. The placeholder reviews still reuse case imagery until real portraits exist. */
  imageSrc: string
  imageAlt: string
}

export interface ReviewsContent {
  ariaLabel: string
  previousLabel: string
  nextLabel: string
  reviews: ReviewItem[]
}

// The first review (Peter Salling) is real. The others are placeholders with invented names,
// companies and quotes until real reviews exist. Keep them clearly replaceable.
const reviewsContent: Record<Locale, ReviewsContent> = {
  da: {
    ariaLabel: 'Anmeldelser',
    previousLabel: 'Forrige anmeldelse',
    nextLabel: 'Næste anmeldelse',
    reviews: [
      {
        quote:
          'Alexander var super skarp i behovsafsøgningsfasen. Han satte sig godt ind i konventionerne for mit felt, og kom tilbage med elegante løsninger til hvordan man kunne forbedre og styrke de konventioner af hjemmesidedesign. Han har leveret et produkt, som er meget høj kvalitet, super stilet og som dækker mine kommunikationsbehov. Og så er han rigtig behagelig og serviceminded hele vejen igennem. Stor anbefaling herfra!',
        name: 'Peter Salling',
        role: 'Filmproducer',
        company: 'petersalling.com',
        imageSrc: '/images/reviews/peter-salling.webp',
        imageAlt: 'Portræt af filmproducer Peter Salling',
      },
      {
        quote:
          'Alexander forstod vores brand med det samme og leverede en hjemmeside, der både er lynhurtig og smuk at se på. Hele forløbet var hurtigt, overskueligt og uden stress.',
        name: 'Sofie Bendtsen',
        role: 'Indehaver',
        company: 'Studio Nord',
        imageSrc: '/cases/fresh-cut/card--4-3.webp',
        imageAlt: 'Sofie Bendtsen fra Studio Nord',
      },
      {
        quote:
          'Vi ville have en webshop, der skilte sig ud fra mængden, og resultatet ramte præcis plet. Samarbejdet var ærligt og effektivt – vi blev holdt opdateret hele vejen.',
        name: 'Michael Holm',
        role: 'E-commerce chef',
        company: 'Nordvest Interiør',
        imageSrc: '/cases/nordwear/main--16-9.webp',
        imageAlt: 'Michael Holm fra Nordvest Interiør',
      },
      {
        quote:
          'Professionelt fra start til slut. Vores nye site loader hurtigt, ser fantastisk ud og har allerede givet flere henvendelser fra kunder.',
        name: 'Laura Kiær',
        role: 'Marketingansvarlig',
        company: 'Havn & Co',
        imageSrc: '/cases/peter-salling/main--16-9.webp',
        imageAlt: 'Laura Kiær fra Havn & Co',
      },
    ],
  },
}

export function getReviewsContent(locale: Locale = defaultLocale): ReviewsContent {
  return reviewsContent[locale]
}
