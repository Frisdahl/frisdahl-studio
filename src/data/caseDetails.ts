import type { CaseDetailContent } from '../types/caseDetail'
import type { Locale } from './navigation'
import { defaultLocale } from './navigation'
import { getCaseGallery } from './caseGallery'
import { getNextCasePreview } from './caseNavigation'

type CaseDetailBase = Omit<CaseDetailContent, 'gallery' | 'nextCase'>

const caseDetails = {
  da: {
    nordwear: {
      id: 'nordwear',
      hero: {
        eyebrow: 'Case · Website',
        title: 'Nordwear — en digital platform til et moderne tøjbrand',
        description:
          'En skarp digital platform med fokus på performance, branding og visuel identitet — bygget til at konvertere og skalere med brandet.',
        sliderAriaLabel: 'Automatisk gennemløb af Nordwear case-billeder',
        slides: [
          { imageSrc: '/cases/nordwear/category--16-10.jpg', imageAlt: 'Nordwear kategori' },
          { imageSrc: '/cases/nordwear/production--16-10.jpg', imageAlt: 'Nordwear produktion' },
          { imageSrc: '/cases/nordwear/cart--16-10.jpg', imageAlt: 'Nordwear kurv' },
        ],
      },
      columns: [
        {
          title: 'Kunde',
          paragraphs: [
            'Nordwear er et dansk tøjbrand med fokus på kvalitet, performance og en stærk visuel identitet i hverdagen.',
            'Brandet havde brug for en digital platform, der matcher ambitionerne og giver kunderne en oplevelse på niveau med produkterne.',
          ],
        },
        {
          title: 'Ydelser',
          paragraphs: [
            'Vi stod for website, UX-design, branding og udvikling med fokus på hastighed, struktur og konvertering.',
            'Løsningen blev bygget med en tydelig informationsarkitektur og et visuelt udtryk, der understøtter brandets positionering.',
          ],
        },
        {
          title: 'Resultat',
          paragraphs: [
            'En skalerbar platform, der løfter Nordwear digitalt og skaber en premium fornemmelse fra første besøg.',
            'Sitet er optimeret til performance og giver et solidt fundament for videre vækst og løbende forbedringer.',
          ],
        },
      ],
    },
    'fresh-cut': {
      id: 'fresh-cut',
      hero: {
        eyebrow: 'Case · Website',
        title: 'Fresh Cut — en levende hjemmeside til en lokal salon',
        description:
          'En levende hjemmeside med tydeligt bookingflow og et udtryk, der matcher salonens personlighed og kvalitetsfølelse.',
        sliderAriaLabel: 'Automatisk gennemløb af Fresh Cut case-billeder',
        slides: [
          { imageSrc: '/cases/fresh-cut/mobile1--16-10.jpg', imageAlt: 'Fresh Cut forside' },
          { imageSrc: '/cases/fresh-cut/mobile2--16-10.jpg', imageAlt: 'Fresh Cut booking' },
          { imageSrc: '/cases/fresh-cut/thumbnail--16-10.jpg', imageAlt: 'Fresh Cut mobilvisning' },
        ],
      },
      columns: [
        {
          title: 'Kunde',
          paragraphs: [
            'Fresh Cut er en lokal salon med stærk personlighed og et ønske om at stå tydeligt i markedet.',
            'De havde brug for en hjemmeside, der kommunikerer kvalitet og gør det nemt at booke en tid.',
          ],
        },
        {
          title: 'Ydelser',
          paragraphs: [
            'Vi leverede website, design, content og SEO med særligt fokus på mobil og lokal synlighed.',
            'Bookingflow og indhold blev struktureret, så besøgende hurtigt forstår ydelser, priser og stemning.',
          ],
        },
        {
          title: 'Resultat',
          paragraphs: [
            'En levende hjemmeside med enkel booking og et udtryk, der matcher salonens brand i hver detalje.',
            'Siden styrker den digitale tilstedeværelse og gør det lettere at konvertere nye og tilbagevendende kunder.',
          ],
        },
      ],
    },
    'atelier-noir': {
      id: 'atelier-noir',
      hero: {
        eyebrow: 'Case · Webshop',
        title: 'Atelier Noir — en elegant webshop med premium brandfølelse',
        description:
          'En elegant webshop med fokus på produktoplevelse, hurtig checkout og en raffineret brugerrejse fra første klik.',
        sliderAriaLabel: 'Automatisk gennemløb af Atelier Noir case-billeder',
        slides: [
          { imageSrc: null, imageAlt: 'Atelier Noir forside', placeholderClassName: 'bg-peach' },
          { imageSrc: null, imageAlt: 'Atelier Noir produktside', placeholderClassName: 'bg-peach-hover' },
          { imageSrc: null, imageAlt: 'Atelier Noir checkout', placeholderClassName: 'bg-peach' },
        ],
      },
      columns: [
        {
          title: 'Kunde',
          paragraphs: [
            'Atelier Noir er et modebrand med fokus på eksklusivitet og en raffineret shoppingoplevelse.',
            'De ønskede en webshop, der føles premium og understøtter salget uden at kompromittere brandets udtryk.',
          ],
        },
        {
          title: 'Ydelser',
          paragraphs: [
            'Vi designede og udviklede webshop, e-commerce flows, UX og integrationer til checkout og produktdata.',
            'Produktpræsentation og navigation blev prioriteret for at skabe ro og tydelighed i købsrejsen.',
          ],
        },
        {
          title: 'Resultat',
          paragraphs: [
            'En elegant webshop med hurtig checkout og en oplevelse, der matcher brandets premium positionering.',
            'Løsningen giver et solidt fundament for videre sortimentsudvidelse og optimering af konvertering.',
          ],
        },
      ],
    },
    'forma-studio': {
      id: 'forma-studio',
      hero: {
        eyebrow: 'Case · Grafisk',
        title: 'Forma Studio — visuel identitet med ro og præcision',
        description:
          'Visuel identitet og designmanual med ro og præcision — skabt til at holde sammen på tværs af digitale og fysiske touchpoints.',
        sliderAriaLabel: 'Automatisk gennemløb af Forma Studio case-billeder',
        slides: [
          { imageSrc: null, imageAlt: 'Forma Studio identitet', placeholderClassName: 'bg-peach-hover' },
          { imageSrc: null, imageAlt: 'Forma Studio print', placeholderClassName: 'bg-peach' },
          { imageSrc: null, imageAlt: 'Forma Studio guidelines', placeholderClassName: 'bg-peach-hover' },
        ],
      },
      columns: [
        {
          title: 'Kunde',
          paragraphs: [
            'Forma Studio er et arkitekturstudio med behov for ro, præcision og visuel sammenhæng på tværs af kanaler.',
            'Identiteten skulle afspejle studioets tilgang til materiale, proportioner og tidløst design.',
          ],
        },
        {
          title: 'Ydelser',
          paragraphs: [
            'Vi udviklede grafisk identitet, designmanual, printmateriale og art direction på tværs af formater.',
            'Typografi, farver og layout blev defineret med fokus på fleksibilitet og genkendelighed i brug.',
          ],
        },
        {
          title: 'Resultat',
          paragraphs: [
            'Et fleksibelt visuelt univers, der holder Forma Studios identitet sammen digitalt og fysisk.',
            'Designmanualen gør det enkelt at arbejde konsekvent — uanset medie, format eller kontekst.',
          ],
        },
      ],
    },
    northline: {
      id: 'northline',
      hero: {
        eyebrow: 'Case · Content',
        title: 'Northline — contentstrategi med klar tone of voice',
        description:
          'Contentstrategi og tone of voice til en vækstvirksomhed — bygget til klar kommunikation på tværs af kanaler.',
        sliderAriaLabel: 'Automatisk gennemløb af Northline case-billeder',
        slides: [
          { imageSrc: null, imageAlt: 'Northline content', placeholderClassName: 'bg-peach' },
          { imageSrc: null, imageAlt: 'Northline tone of voice', placeholderClassName: 'bg-peach-hover' },
          { imageSrc: null, imageAlt: 'Northline strategi', placeholderClassName: 'bg-peach' },
        ],
      },
      columns: [
        {
          title: 'Kunde',
          paragraphs: [
            'Northline er en vækstvirksomhed inden for rådgivning med behov for klar og troværdig kommunikation.',
            'De ønskede et tekstunivers, der gør komplekse budskaber tilgængelige uden at miste faglig dybde.',
          ],
        },
        {
          title: 'Ydelser',
          paragraphs: [
            'Vi leverede contentstrategi, tone of voice, tekst og struktur på tværs af website og salgskanaler.',
            'Budskaber og formater blev tilpasset målgrupper og touchpoints for at skabe sammenhæng i kommunikationen.',
          ],
        },
        {
          title: 'Resultat',
          paragraphs: [
            'Et tekstunivers, der skaber tillid og gør Northlines ekspertise tydelig for både nye og eksisterende kunder.',
            'Kommunikationen er nu mere ensartet og lettere at videreudvikle i takt med virksomhedens vækst.',
          ],
        },
      ],
    },
    'urban-supply': {
      id: 'urban-supply',
      hero: {
        eyebrow: 'Case · E-commerce',
        title: 'Urban Supply — skalerbar e-commerce til retail',
        description:
          'Skalerbar e-commerce med fokus på drift, produktdata og en strømlinet kundeoplevelse i hverdagen.',
        sliderAriaLabel: 'Automatisk gennemløb af Urban Supply case-billeder',
        slides: [
          { imageSrc: null, imageAlt: 'Urban Supply shop', placeholderClassName: 'bg-peach-hover' },
          { imageSrc: null, imageAlt: 'Urban Supply produktkatalog', placeholderClassName: 'bg-peach' },
          { imageSrc: null, imageAlt: 'Urban Supply checkout', placeholderClassName: 'bg-peach-hover' },
        ],
      },
      columns: [
        {
          title: 'Kunde',
          paragraphs: [
            'Urban Supply er en retail-virksomhed med behov for skalerbar e-commerce og stabil drift i hverdagen.',
            'De ønskede en platform, der kan vokse med sortimentet uden at gå på kompromis med kundeoplevelsen.',
          ],
        },
        {
          title: 'Ydelser',
          paragraphs: [
            'Vi byggede e-commerce platform, integrationer, produktdata-struktur og automatisering af centrale flows.',
            'Fokus var på driftssikkerhed, overskuelig administration og en strømlinet rejse fra produkt til checkout.',
          ],
        },
        {
          title: 'Resultat',
          paragraphs: [
            'En strømlinet shop, der understøtter vækst og giver kunderne en pålidelig oplevelse på tværs af enheder.',
            'Løsningen gør det lettere for teamet at vedligeholde sortiment og optimere salget over tid.',
          ],
        },
      ],
    },
  },
  en: {
    nordwear: {
      id: 'nordwear',
      hero: {
        eyebrow: 'Case · Website',
        title: 'Nordwear — a digital platform for a modern apparel brand',
        description:
          'A sharp digital platform focused on performance, branding, and visual identity — built to convert and scale with the brand.',
        sliderAriaLabel: 'Automatic showcase of Nordwear case images',
        slides: [
          { imageSrc: '/cases/nordwear/category--16-10.jpg', imageAlt: 'Nordwear category page' },
          { imageSrc: '/cases/nordwear/production--16-10.jpg', imageAlt: 'Nordwear production page' },
          { imageSrc: '/cases/nordwear/cart--16-10.jpg', imageAlt: 'Nordwear cart' },
        ],
      },
      columns: [
        {
          title: 'Client',
          paragraphs: [
            'Nordwear is a Danish apparel brand focused on quality, performance, and a strong visual identity.',
            'They needed a digital platform that matches their ambitions and gives customers an experience on par with the products.',
          ],
        },
        {
          title: 'Services',
          paragraphs: [
            'We delivered website, UX design, branding, and development with a focus on speed, structure, and conversion.',
            'The solution was built with clear information architecture and a visual expression that supports the brand positioning.',
          ],
        },
        {
          title: 'Result',
          paragraphs: [
            'A scalable platform that elevates Nordwear digitally and creates a premium feel from the first visit.',
            'The site is optimized for performance and provides a solid foundation for further growth and ongoing improvements.',
          ],
        },
      ],
    },
    'fresh-cut': {
      id: 'fresh-cut',
      hero: {
        eyebrow: 'Case · Website',
        title: 'Fresh Cut — a vibrant website for a local salon',
        description:
          'A vibrant website with a clear booking flow and an expression that matches the salon’s personality and quality feel.',
        sliderAriaLabel: 'Automatic showcase of Fresh Cut case images',
        slides: [
          { imageSrc: '/cases/fresh-cut/mobile1--16-10.jpg', imageAlt: 'Fresh Cut homepage' },
          { imageSrc: '/cases/fresh-cut/mobile2--16-10.jpg', imageAlt: 'Fresh Cut booking' },
          { imageSrc: '/cases/fresh-cut/thumbnail--16-10.jpg', imageAlt: 'Fresh Cut mobile view' },
        ],
      },
      columns: [
        {
          title: 'Client',
          paragraphs: [
            'Fresh Cut is a local salon with a strong personality and a desire to stand out clearly in the market.',
            'They needed a website that communicates quality and makes it easy to book an appointment.',
          ],
        },
        {
          title: 'Services',
          paragraphs: [
            'We delivered website, design, content, and SEO with a particular focus on mobile and local visibility.',
            'The booking flow and content were structured so visitors quickly understand services, pricing, and atmosphere.',
          ],
        },
        {
          title: 'Result',
          paragraphs: [
            'A vibrant website with simple booking and an expression that matches the salon brand in every detail.',
            'The site strengthens the digital presence and makes it easier to convert new and returning customers.',
          ],
        },
      ],
    },
    'atelier-noir': {
      id: 'atelier-noir',
      hero: {
        eyebrow: 'Case · Webshop',
        title: 'Atelier Noir — an elegant webshop with a premium brand feel',
        description:
          'An elegant webshop focused on product experience, fast checkout, and a refined journey from first click.',
        sliderAriaLabel: 'Automatic showcase of Atelier Noir case images',
        slides: [
          { imageSrc: null, imageAlt: 'Atelier Noir homepage', placeholderClassName: 'bg-peach' },
          { imageSrc: null, imageAlt: 'Atelier Noir product page', placeholderClassName: 'bg-peach-hover' },
          { imageSrc: null, imageAlt: 'Atelier Noir checkout', placeholderClassName: 'bg-peach' },
        ],
      },
      columns: [
        {
          title: 'Client',
          paragraphs: [
            'Atelier Noir is a fashion brand focused on exclusivity and a refined shopping experience.',
            'They wanted a webshop that feels premium and supports sales without compromising the brand expression.',
          ],
        },
        {
          title: 'Services',
          paragraphs: [
            'We designed and developed the webshop, e-commerce flows, UX, and integrations for checkout and product data.',
            'Product presentation and navigation were prioritized to create calm and clarity in the purchase journey.',
          ],
        },
        {
          title: 'Result',
          paragraphs: [
            'An elegant webshop with fast checkout and an experience that matches the brand’s premium positioning.',
            'The solution provides a solid foundation for further assortment expansion and conversion optimization.',
          ],
        },
      ],
    },
    'forma-studio': {
      id: 'forma-studio',
      hero: {
        eyebrow: 'Case · Graphic',
        title: 'Forma Studio — visual identity with calm and precision',
        description:
          'Visual identity and design guidelines with calm and precision — built to hold together across digital and physical touchpoints.',
        sliderAriaLabel: 'Automatic showcase of Forma Studio case images',
        slides: [
          { imageSrc: null, imageAlt: 'Forma Studio identity', placeholderClassName: 'bg-peach-hover' },
          { imageSrc: null, imageAlt: 'Forma Studio print', placeholderClassName: 'bg-peach' },
          { imageSrc: null, imageAlt: 'Forma Studio guidelines', placeholderClassName: 'bg-peach-hover' },
        ],
      },
      columns: [
        {
          title: 'Client',
          paragraphs: [
            'Forma Studio is an architecture studio needing calm, precision, and visual cohesion across channels.',
            'The identity needed to reflect the studio’s approach to material, proportion, and timeless design.',
          ],
        },
        {
          title: 'Services',
          paragraphs: [
            'We developed graphic identity, design guidelines, print materials, and art direction across formats.',
            'Typography, color, and layout were defined with a focus on flexibility and recognizability in use.',
          ],
        },
        {
          title: 'Result',
          paragraphs: [
            'A flexible visual universe that holds Forma Studio’s identity together digitally and physically.',
            'The design guidelines make it easy to work consistently — regardless of medium, format, or context.',
          ],
        },
      ],
    },
    northline: {
      id: 'northline',
      hero: {
        eyebrow: 'Case · Content',
        title: 'Northline — content strategy with a clear tone of voice',
        description:
          'Content strategy and tone of voice for a growth company — built for clear communication across channels.',
        sliderAriaLabel: 'Automatic showcase of Northline case images',
        slides: [
          { imageSrc: null, imageAlt: 'Northline content', placeholderClassName: 'bg-peach' },
          { imageSrc: null, imageAlt: 'Northline tone of voice', placeholderClassName: 'bg-peach-hover' },
          { imageSrc: null, imageAlt: 'Northline strategy', placeholderClassName: 'bg-peach' },
        ],
      },
      columns: [
        {
          title: 'Client',
          paragraphs: [
            'Northline is a growth company in consulting with a need for clear and trustworthy communication.',
            'They wanted a copy universe that makes complex messages accessible without losing professional depth.',
          ],
        },
        {
          title: 'Services',
          paragraphs: [
            'We delivered content strategy, tone of voice, copy, and structure across website and sales channels.',
            'Messages and formats were tailored to audiences and touchpoints to create cohesion in communication.',
          ],
        },
        {
          title: 'Result',
          paragraphs: [
            'A copy universe that builds trust and makes Northline’s expertise clear to both new and existing clients.',
            'Communication is now more consistent and easier to develop as the company continues to grow.',
          ],
        },
      ],
    },
    'urban-supply': {
      id: 'urban-supply',
      hero: {
        eyebrow: 'Case · E-commerce',
        title: 'Urban Supply — scalable e-commerce for retail',
        description:
          'Scalable e-commerce focused on operations, product data, and a streamlined customer experience day to day.',
        sliderAriaLabel: 'Automatic showcase of Urban Supply case images',
        slides: [
          { imageSrc: null, imageAlt: 'Urban Supply shop', placeholderClassName: 'bg-peach-hover' },
          { imageSrc: null, imageAlt: 'Urban Supply product catalog', placeholderClassName: 'bg-peach' },
          { imageSrc: null, imageAlt: 'Urban Supply checkout', placeholderClassName: 'bg-peach-hover' },
        ],
      },
      columns: [
        {
          title: 'Client',
          paragraphs: [
            'Urban Supply is a retail business needing scalable e-commerce and stable day-to-day operations.',
            'They wanted a platform that could grow with the assortment without compromising the customer experience.',
          ],
        },
        {
          title: 'Services',
          paragraphs: [
            'We built the e-commerce platform, integrations, product data structure, and automation of core flows.',
            'The focus was on operational reliability, clear administration, and a streamlined journey from product to checkout.',
          ],
        },
        {
          title: 'Result',
          paragraphs: [
            'A streamlined shop that supports growth and gives customers a reliable experience across devices.',
            'The solution makes it easier for the team to maintain the assortment and optimize sales over time.',
          ],
        },
      ],
    },
  },
} as const satisfies Record<Locale, Record<string, CaseDetailBase>>

export function getCaseDetail(
  locale: Locale = defaultLocale,
  caseSlug: string,
): CaseDetailContent | null {
  const localeDetails = caseDetails[locale] as Record<string, CaseDetailBase>
  const detail = localeDetails[caseSlug]

  if (!detail) return null

  const gallery = getCaseGallery(locale, caseSlug)
  if (!gallery) return null

  const nextCase = getNextCasePreview(locale, caseSlug)
  if (!nextCase) return null

  return { ...detail, gallery, nextCase }
}
