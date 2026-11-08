import type { Locale } from './navigation'
import { defaultLocale } from './navigation'

export interface ReviewItem {
  quote: string
  name: string
  role: string
  company: string
  /** Placeholder: reused case imagery until real portraits exist. */
  imageSrc: string
  imageAlt: string
}

export interface ReviewsContent {
  ariaLabel: string
  previousLabel: string
  nextLabel: string
  reviews: ReviewItem[]
}

// Placeholder testimonials: invented names, companies and quotes until real
// reviews exist. Keep them clearly replaceable.
const reviewsContent: Record<Locale, ReviewsContent> = {
  da: {
    ariaLabel: 'Anmeldelser',
    previousLabel: 'Forrige anmeldelse',
    nextLabel: 'Næste anmeldelse',
    reviews: [
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
        imageSrc: '/cases/nordwear/main-higgs--16-9.webp',
        imageAlt: 'Michael Holm fra Nordvest Interiør',
      },
      {
        quote:
          'Professionelt fra start til slut. Vores nye site loader hurtigt, ser fantastisk ud og har allerede givet flere henvendelser fra kunder.',
        name: 'Laura Kiær',
        role: 'Marketingansvarlig',
        company: 'Havn & Co',
        imageSrc: '/cases/peter-salling/main-higgs--16-9.webp',
        imageAlt: 'Laura Kiær fra Havn & Co',
      },
    ],
  },
  en: {
    ariaLabel: 'Reviews',
    previousLabel: 'Previous review',
    nextLabel: 'Next review',
    reviews: [
      {
        quote:
          'Alexander understood our brand immediately and delivered a website that is both lightning fast and beautiful to look at. The whole process was quick, clear and stress-free.',
        name: 'Sofie Bendtsen',
        role: 'Owner',
        company: 'Studio Nord',
        imageSrc: '/cases/fresh-cut/card--4-3.webp',
        imageAlt: 'Sofie Bendtsen from Studio Nord',
      },
      {
        quote:
          'We wanted a webshop that stood out from the crowd, and the result hit the mark exactly. The collaboration was honest and efficient – we were kept updated the whole way.',
        name: 'Michael Holm',
        role: 'E-commerce Manager',
        company: 'Nordvest Interiør',
        imageSrc: '/cases/nordwear/main-higgs--16-9.webp',
        imageAlt: 'Michael Holm from Nordvest Interiør',
      },
      {
        quote:
          'Professional from start to finish. Our new site loads fast, looks fantastic and has already brought in more enquiries from customers.',
        name: 'Laura Kiær',
        role: 'Marketing Lead',
        company: 'Havn & Co',
        imageSrc: '/cases/peter-salling/main-higgs--16-9.webp',
        imageAlt: 'Laura Kiær from Havn & Co',
      },
    ],
  },
}

export function getReviewsContent(locale: Locale = defaultLocale): ReviewsContent {
  return reviewsContent[locale]
}
