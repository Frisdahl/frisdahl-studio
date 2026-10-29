import type {
  CaseDetailContent,
  CaseDetailFact,
  CaseDetailHero,
  CaseDetailHeroMeta,
  CaseDetailOverview,
  CaseDetailPalette,
  CaseDetailTypography,
} from '../types/caseDetail'
import type { Locale } from './navigation'
import { defaultLocale } from './navigation'
import { getCaseCategoryLabel, getCaseItemSummary } from './cases'
import { getCaseGallery } from './caseGallery'
import { getCaseYear, getNextCasePreview } from './caseNavigation'

type CaseDetailBase = Omit<
  CaseDetailContent,
  'gallery' | 'nextCase' | 'hero' | 'overview' | 'typography' | 'palette'
> & {
  hero: Omit<CaseDetailHero, 'meta' | 'name'>
}

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
          { imageSrc: '/cases/nordwear/official--16-10.webp', imageAlt: 'Nordwear forside på en bærbar' },
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
            'Jeg stod for website, UX-design, branding og udvikling med fokus på hastighed, struktur og konvertering.',
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
            'Jeg leverede website, design, content og SEO med særligt fokus på mobil og lokal synlighed.',
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
    'peter-salling': {
      id: 'peter-salling',
      hero: {
        eyebrow: 'Case · Website',
        title: 'Peter Salling — en filmisk portfolio til en filmproducer',
        description:
          'En redaktionel og filmisk portfolio, hvor filmene er i centrum, og hvor Peter selv styrer indholdet i et indbygget admin-panel.',
        sliderAriaLabel: 'Automatisk gennemløb af Peter Salling case-billeder',
        slides: [
          { imageSrc: '/cases/peter-salling/official--16-10.webp', imageAlt: 'Peter Sallings forside med Alt jeg forventede på en skærm' },
        ],
      },
      columns: [
        {
          title: 'Kunde',
          paragraphs: [
            'Peter Salling er filmproducer og står bag kortfilm, reklamer, musikvideoer og corporate-film.',
            'Han havde brug for en portfolio, der lader filmene tale, og som han selv kan holde opdateret.',
          ],
        },
        {
          title: 'Ydelser',
          paragraphs: [
            'Jeg designede og udviklede sitet fra bunden – fra det mørke, billedbårne udtryk til videoafspiller, projektsider og admin-panel.',
            'Projekterne er inddelt i Narrative, Commercial, Music & Art og Corporate, og hver film har sin egen side med trailer, credits, anmeldelser og priser.',
          ],
        },
        {
          title: 'Resultat',
          paragraphs: [
            'En filmisk portfolio, der sætter materialet i centrum og fungerer lige godt på mobil, tablet og store skærme.',
            'Peter kan selv tilføje og redigere projekter, og hver projektside har sin egen titel, beskrivelse og delingsbillede.',
          ],
        },
      ],
    },
    'det-kollektive-klaedeskab': {
      id: 'det-kollektive-klaedeskab',
      hero: {
        eyebrow: 'Case · Website',
        title: 'Det Kollektive Klædeskab — et redesign af en fælles garderobe',
        description:
          'Et redesign-koncept til en fælles garderobe i København, hvor medlemmer låner, bytter og deler tøj med point i stedet for at købe nyt.',
        sliderAriaLabel: 'Automatisk gennemløb af Det Kollektive Klædeskab case-billeder',
        slides: [
          { imageSrc: '/cases/det-kollektive-klaedeskab/forside--16-10.webp', imageAlt: 'Det Kollektive Klædeskabs forside' },
        ],
      },
      columns: [
        {
          title: 'Kunde',
          paragraphs: [
            'Det Kollektive Klædeskab er en fælles garderobe i København, hvor medlemmer låner, bytter og deler tøj.',
            'Projektet er et redesign-koncept, jeg har lavet på eget initiativ – ikke en opgave fra dem.',
          ],
        },
        {
          title: 'Ydelser',
          paragraphs: [
            'Jeg stod for koncept, UX/UI-design og udvikling af hele sitet – fra forside og medlemskaber til butikker, FAQ og gavekort.',
            'Udtrykket er varmt og feminint med en blød taupe-palette og store serif-overskrifter, der giver garderoben en eksklusiv, men imødekommende stemning.',
          ],
        },
        {
          title: 'Resultat',
          paragraphs: [
            'Et site, der forklarer konceptet trin for trin og gør det nemt at forstå, hvordan point, bytte og medlemskab hænger sammen.',
            'Sitet er bygget mobile-first og indeholder også et prototype-admin til produkter, blogindlæg og gavekort.',
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
            'Jeg leverede contentstrategi, tone of voice, tekst og struktur på tværs af website og salgskanaler.',
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
            'Jeg byggede e-commerce platform, integrationer, produktdata-struktur og automatisering af centrale flows.',
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
          { imageSrc: '/cases/nordwear/official--16-10.webp', imageAlt: 'Nordwear homepage on a laptop' },
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
            'I delivered website, UX design, branding, and development with a focus on speed, structure, and conversion.',
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
            'I delivered website, design, content, and SEO with a particular focus on mobile and local visibility.',
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
    'peter-salling': {
      id: 'peter-salling',
      hero: {
        eyebrow: 'Case · Website',
        title: 'Peter Salling — a cinematic portfolio for a film producer',
        description:
          'An editorial, cinematic portfolio that puts the films first, with content Peter manages himself in a built-in admin panel.',
        sliderAriaLabel: 'Automatic slideshow of Peter Salling case images',
        slides: [
          { imageSrc: '/cases/peter-salling/official--16-10.webp', imageAlt: 'Peter Salling homepage featuring Alt jeg forventede on a display' },
        ],
      },
      columns: [
        {
          title: 'Client',
          paragraphs: [
            'Peter Salling is a film producer behind short films, commercials, music videos and corporate films.',
            'He needed a portfolio that lets the films speak for themselves and that he can keep up to date on his own.',
          ],
        },
        {
          title: 'Services',
          paragraphs: [
            'I designed and built the site from scratch – from the dark, image-led look to the video player, project pages and admin panel.',
            'Projects are grouped into Narrative, Commercial, Music & Art and Corporate, and every film has its own page with a trailer, credits, reviews and awards.',
          ],
        },
        {
          title: 'Result',
          paragraphs: [
            'A cinematic portfolio that puts the work first and works just as well on phones, tablets and large screens.',
            'Peter can add and edit projects himself, and every project page has its own title, description and share image.',
          ],
        },
      ],
    },
    'det-kollektive-klaedeskab': {
      id: 'det-kollektive-klaedeskab',
      hero: {
        eyebrow: 'Case · Website',
        title: 'Det Kollektive Klædeskab — a redesign of a shared wardrobe',
        description:
          'A redesign concept for a shared wardrobe in Copenhagen, where members borrow, swap and share clothes using points instead of buying new.',
        sliderAriaLabel: 'Automatic slideshow of Det Kollektive Klædeskab case images',
        slides: [
          { imageSrc: '/cases/det-kollektive-klaedeskab/forside--16-10.webp', imageAlt: 'Det Kollektive Klædeskab homepage' },
        ],
      },
      columns: [
        {
          title: 'Client',
          paragraphs: [
            'Det Kollektive Klædeskab is a shared wardrobe in Copenhagen where members borrow, swap and share clothes.',
            'The project is a redesign concept I made on my own initiative – not a commission from them.',
          ],
        },
        {
          title: 'Services',
          paragraphs: [
            'I handled the concept, UX/UI design and development of the whole site – from the homepage and memberships to stores, FAQ and gift cards.',
            'The look is warm and feminine, with a soft taupe palette and large serif headings that give the wardrobe an exclusive but welcoming feel.',
          ],
        },
        {
          title: 'Result',
          paragraphs: [
            'A site that explains the concept step by step and makes it easy to see how points, swapping and membership fit together.',
            'It is built mobile-first and also includes a prototype admin for products, blog posts and gift cards.',
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
            'I delivered content strategy, tone of voice, copy, and structure across website and sales channels.',
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
            'I built the e-commerce platform, integrations, product data structure, and automation of core flows.',
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

const metaLabels: Record<Locale, { type: string; role: string; completed: string; explore: string }> = {
  da: { type: 'Type', role: 'Rolle', completed: 'Afsluttet', explore: 'Udforsk' },
  en: { type: 'Type', role: 'Role', completed: 'Completed', explore: 'Explore' },
}

const exploreValues: Record<Locale, string> = {
  da: 'Se live',
  en: 'See live',
}

/**
 * Live site behind the "Explore" button. null = no live site yet, so the
 * button renders without a link (add a URL here to make it open the site).
 */
const caseLiveUrls: Record<string, string | null> = {
  nordwear: null,
  'fresh-cut': null,
  'peter-salling': 'https://petersalling.com',
  'det-kollektive-klaedeskab': null,
  northline: null,
  'urban-supply': null,
}

/** The case's own website, or null when it has no live site yet. */
export function getCaseLiveUrl(caseSlug: string): string | null {
  return caseLiveUrls[caseSlug] ?? null
}

const overviewLabels: Record<
  Locale,
  { descriptionTitle: string; detailsTitle: string; industry: string; deliverables: string; timeline: string; scope: string }
> = {
  da: {
    descriptionTitle: 'Projektbeskrivelse',
    detailsTitle: 'Projektdetaljer',
    industry: 'Branche',
    deliverables: 'Leverancer',
    timeline: 'Tidslinje',
    scope: 'Omfang',
  },
  en: {
    descriptionTitle: 'Project description',
    detailsTitle: 'Project details',
    industry: 'Industry',
    deliverables: 'Deliverables',
    timeline: 'Timeline',
    scope: 'Scope',
  },
}

/**
 * Project details beyond the industry (which comes from the case listing).
 * Only documented facts: a case leaves out what isn't known yet, and the
 * overview shows just the details it has.
 */
const caseProjectDetails: Record<
  Locale,
  Partial<
    Record<
      string,
      { description?: string[]; deliverables?: string; timeline?: string; scope?: string }
    >
  >
> = {
  da: {
    nordwear: {
      // Describes what the NordWear webshop actually does (see its repository), no invented results.
      description: [
        'Nordwear er en webshop til et moderne tøjbrand, designet og udviklet fra bunden – fra visuel identitet og brugerflow til den tekniske platform bag. Målet var en butik, der føles rolig og premium at handle i, men som samtidig er hurtig, overskuelig og bygget til at sælge.',
        'Kunderne kan filtrere og sortere i hele sortimentet, se produkterne i store billedgallerier, vælge farve og størrelse og betale sikkert med Stripe. Fragtpriser hentes fra Shipmondo, adressen udfyldes med Google Maps, og med en kundekonto kan man gemme favoritter og følge sine ordrer. Gavekort og nyhedsbrev er også en del af løsningen.',
        'Bag butikken ligger et administrationspanel, hvor produkter, billeder, ordrer og gavekort styres, og et dashboard med statistik. Platformen er bygget i React og TypeScript med en Express- og Prisma-backend, Redis-caching af produkterne og sikkerhed som JWT-login og rate limiting.',
        'Nordwear var mit eksamensprojekt, og det blev belønnet med topkarakter. Butikken lå tidligere online på nordwear.dk, men da Nordwear ikke er en rigtig kunde, har jeg taget domænet ned, så ingen kan komme til at betale for varer, der ikke findes. Produktbillederne er genereret med AI, og designet er inspireret af errant.dk.',
      ],
      deliverables: 'UX/UI-design, frontend, backend og administrationspanel',
      scope: 'Webshop, betaling, fragt, kundekonti, administration',
    },
    'peter-salling': {
      description: [
        'Peter Salling er filmproducer, og hans portfolio er bygget til at vise filmene frem. Udtrykket er mørkt, redaktionelt og filmisk, så billeder og video står i centrum, og grænsefladen træder i baggrunden. Sitet afløste en tidligere Squarespace-side i oktober 2026.',
        'Filmene er inddelt i Narrative, Commercial, Music & Art og Corporate. På forsiden afspilles projekterne som levende fliser, og hver film har sin egen projektside med trailer, beskrivelse, credits, anmeldelser og priser. Videoerne afspilles i en skræddersyet afspiller med egne kontroller, og sitet er tilpasset alt fra mobil og iPad til store skærme.',
        'Bag sitet ligger et admin-panel, hvor Peter selv opretter og redigerer projekter og uploader billeder og video, som komprimeres direkte i browseren. Sitet er bygget i React og TypeScript med Supabase til database, filer og login og hostes på Cloudflare. Hver projektside får sin egen titel, beskrivelse og delingsbillede, så filmene også står stærkt i søgninger og på sociale medier.',
      ],
      deliverables: 'UX/UI-design, frontend, videoafspiller og admin-panel',
      scope: 'Portfolio, projektsider, video, CMS, SEO',
    },
    'det-kollektive-klaedeskab': {
      description: [
        'Det Kollektive Klædeskab er en fælles garderobe i København, hvor medlemmer låner, bytter og deler tøj i stedet for at købe nyt. Projektet er et redesign-koncept, jeg har lavet på eget initiativ, og ikke et site, der er leveret til dem.',
        'Sitet forklarer konceptet trin for trin: Man rydder op i sit klædeskab, afleverer tøjet, får point for det og bruger pointene på nye fund i garderoben. Medlemskaber, butikker, FAQ, gavekort og en udmeldelsesformular er samlet ét sted, og de nyeste fund vises i en slider med kategori, størrelse og pris i point.',
        'Udtrykket er varmt, feminint og cirkulært med en blød taupe-palette, store serif-overskrifter og afrundede billeder. Sitet er bygget mobile-first i React, Vite og Tailwind CSS uden backend, og et prototype-admin viser, hvordan produkter, blogindlæg og gavekort kunne styres.',
      ],
      deliverables: 'Koncept, UX/UI-design og frontend',
      scope: 'Website, medlemskaber, pointsystem, prototype-admin',
    },
  },
  en: {
    nordwear: {
      description: [
        'Nordwear is a webshop for a modern clothing brand, designed and built from scratch – from the visual identity and user flows to the technical platform behind it. The goal was a shop that feels calm and premium to browse, while staying fast, clear and built to sell.',
        'Customers can filter and sort the whole range, browse products in large image galleries, choose colour and size, and pay securely with Stripe. Shipping rates come from Shipmondo, the address is filled in with Google Maps, and a customer account lets people save favourites and follow their orders. Gift cards and a newsletter are part of the solution too.',
        'Behind the shop is an admin panel for products, images, orders and gift cards, plus a dashboard with statistics. The platform is built with React and TypeScript on an Express and Prisma backend, with Redis caching for products and security such as JWT login and rate limiting.',
        "Nordwear was my exam project, and it was awarded the top grade. The shop used to be live at nordwear.dk, but since Nordwear isn't a real client, I took the domain down so nobody could end up paying for products that don't exist. The product images were generated with AI, and the design was inspired by errant.dk.",
      ],
      deliverables: 'UX/UI design, frontend, backend and admin panel',
      scope: 'Webshop, payments, shipping, accounts, admin',
    },
    'peter-salling': {
      description: [
        "Peter Salling is a film producer, and his portfolio is built to show the films. The look is dark, editorial and cinematic, so images and video take centre stage and the interface stays in the background. The site replaced an earlier Squarespace site in October 2026.",
        'The films are grouped into Narrative, Commercial, Music & Art and Corporate. On the homepage the projects play as living tiles, and every film has its own project page with a trailer, description, credits, reviews and awards. Videos play in a custom player with its own controls, and the site is tuned for everything from phones and iPads to large screens.',
        'Behind the site is an admin panel where Peter creates and edits projects himself and uploads images and video, which are compressed right in the browser. The site is built with React and TypeScript, uses Supabase for the database, files and login, and is hosted on Cloudflare. Every project page gets its own title, description and share image, so the films also stand out in search results and on social media.',
      ],
      deliverables: 'UX/UI design, frontend, video player and admin panel',
      scope: 'Portfolio, project pages, video, CMS, SEO',
    },
    'det-kollektive-klaedeskab': {
      description: [
        "Det Kollektive Klædeskab is a shared wardrobe in Copenhagen where members borrow, swap and share clothes instead of buying new. The project is a redesign concept I made on my own initiative, not a site delivered to them.",
        'The site explains the concept step by step: you clear out your wardrobe, hand in the clothes, get points for them and spend the points on new finds in the wardrobe. Memberships, stores, FAQ, gift cards and a cancellation form sit in one place, and the latest finds appear in a slider with category, size and price in points.',
        'The look is warm, feminine and circular, with a soft taupe palette, large serif headings and rounded images. It is built mobile-first with React, Vite and Tailwind CSS and has no backend; a prototype admin shows how products, blog posts and gift cards could be managed.',
      ],
      deliverables: 'Concept, UX/UI design and frontend',
      scope: 'Website, memberships, points system, prototype admin',
    },
  },
}

function getCaseOverview(locale: Locale, caseSlug: string, description: string): CaseDetailOverview {
  const labels = overviewLabels[locale]
  const known = caseProjectDetails[locale][caseSlug] ?? {}
  const facts: [string, string | undefined][] = [
    [labels.industry, getCaseItemSummary(locale, caseSlug)?.industry],
    [labels.deliverables, known.deliverables],
    [labels.timeline, known.timeline],
    [labels.scope, known.scope],
  ]

  return {
    descriptionTitle: labels.descriptionTitle,
    description: known.description ?? [description],
    detailsTitle: labels.detailsTitle,
    details: facts
      .filter((fact): fact is [string, string] => Boolean(fact[1]))
      .map(([label, value]): CaseDetailFact => ({ label, value })),
  }
}

const typographyLabels: Record<
  Locale,
  Pick<CaseDetailTypography, 'title' | 'typefaceLabel' | 'categoryLabel' | 'capHeightLabel' | 'baselineLabel'>
> = {
  da: {
    title: 'Typografi',
    typefaceLabel: 'Skrifttype',
    categoryLabel: 'Kategori',
    capHeightLabel: 'Cap height',
    baselineLabel: 'Baseline',
  },
  en: {
    title: 'Typography',
    typefaceLabel: 'Typeface',
    categoryLabel: 'Category',
    capHeightLabel: 'Cap height',
    baselineLabel: 'Baseline',
  },
}

/** Typefaces the cases use: the one each site is built around. */
const caseTypefaces: Partial<
  Record<
    string,
    {
      typeface: string
      category: Record<Locale, string>
      description: Record<Locale, string>
      fontFamily: string
      capHeight: number
    }
  >
> = {
  nordwear: {
    typeface: 'Montserrat',
    category: { da: 'Geometrisk sans-serif', en: 'Geometric sans-serif' },
    description: {
      da: 'Montserrat bærer hele butikken – logo, navigation, produktnavne, priser og knapper. Den geometriske form giver et rent og moderne udtryk, der lader produktbillederne stå i centrum, og med flere vægte af samme skrift skabes hierarkiet uden at blande skrifttyper.',
      en: 'Montserrat carries the whole shop – logo, navigation, product names, prices and buttons. Its geometric shapes give a clean, modern look that keeps the product photos in focus, and using several weights of one typeface builds the hierarchy without mixing typefaces.',
    },
    fontFamily: "'Montserrat Variable', sans-serif",
    capHeight: 0.7,
  },
  'peter-salling': {
    typeface: 'Raleway',
    category: { da: 'Elegant sans-serif', en: 'Elegant sans-serif' },
    description: {
      da: 'Raleway bruges til både overskrifter og brødtekst på hele sitet. Titlerne står i store, spærrede versaler, der giver et filmisk, plakatagtigt udtryk, mens de lettere vægte holder brødteksten rolig, så filmene får lov at stå i centrum.',
      en: 'Raleway is used for both headings and body text across the whole site. Titles are set in large, tracked capitals for a cinematic, poster-like feel, while the lighter weights keep the body text calm so the films stay in focus.',
    },
    fontFamily: "'Raleway Variable', sans-serif",
    capHeight: 0.72,
  },
  'det-kollektive-klaedeskab': {
    typeface: 'DM Serif Display',
    category: { da: 'Display-serif', en: 'Display serif' },
    description: {
      da: 'DM Serif Display bærer alle overskrifter – fra den store forsidetitel til sektionerne. De kraftige kontraster giver et eksklusivt og feminint udtryk, mens brødteksten står i den rene sans-serif Manrope, så siderne forbliver lette at læse.',
      en: 'DM Serif Display carries every heading – from the large homepage title to the sections. Its strong contrast gives an exclusive, feminine feel, while the body text is set in the clean sans-serif Manrope so the pages stay easy to read.',
    },
    fontFamily: "'DM Serif Display', serif",
    capHeight: 0.67,
  },
}

function getCaseTypography(locale: Locale, caseSlug: string): CaseDetailTypography | undefined {
  const font = caseTypefaces[caseSlug]
  if (!font) return undefined

  return {
    ...typographyLabels[locale],
    description: font.description[locale],
    typeface: font.typeface,
    category: font.category[locale],
    fontFamily: font.fontFamily,
    capHeight: font.capHeight,
  }
}

const paletteTitles: Record<Locale, string> = { da: 'Farvepalette', en: 'Colour palette' }

/** How each case uses its palette. */
const casePaletteDescriptions: Partial<Record<string, Record<Locale, string>>> = {
  nordwear: {
    da: 'Paletten er bevidst afdæmpet, så produkterne står stærkest. Kul bruges til tekst, knapper og rammer, mens den lyse stenfarve er baggrunden for hele butikken. Bordeaux er brandets accent og ses i toppen af hver side, guld markerer anmeldelser, og den grå sten deler indholdet op uden at tage fokus.',
    en: "The palette is deliberately muted so the products stand out. Charcoal is used for text, buttons and borders, while the light stone colour is the background of the whole shop. Burgundy is the brand accent at the top of every page, gold marks the reviews, and the grey stone divides the content without drawing attention.",
  },
  'peter-salling': {
    da: 'Paletten er næsten ren sort og hvid, så filmenes egne farver får hele opmærksomheden. Kul er baggrunden på hele sitet, hvid bruges til titler og navigation, og de grå toner er hvid med lavere gennemsigtighed – til brødtekst, linjer og flader oven på det mørke.',
    en: 'The palette is almost pure black and white, so the films’ own colours get all the attention. Charcoal is the background of the whole site, white is used for titles and navigation, and the greys are white at lower opacity – for body text, rules and surfaces on the dark.',
  },
  'det-kollektive-klaedeskab': {
    da: 'Paletten er varm og blød uden ren hvid og sort. Taupe er den primære farve på knapper og links, den lyse sandtone er baggrunden, og den rosa sand er accent på de vigtigste knapper. Mørk espresso bruges til overskrifter og den varme brun til brødtekst, så alt hænger sammen i samme jordnære toneskala.',
    en: 'The palette is warm and soft, with no pure white or black. Taupe is the primary colour for buttons and links, the light sand tone is the background, and the rosy sand accents the key buttons. Dark espresso is used for headings and the warm brown for body text, keeping everything in one earthy range.',
  },
}

/** Colours each site uses (from its own styles), most used first. */
const casePalettes: Partial<
  Record<string, { name: Record<Locale, string>; hex: string; dark: boolean }[]>
> = {
  nordwear: [
    { name: { da: 'Kul', en: 'Charcoal' }, hex: '#1C1C1C', dark: true },
    { name: { da: 'Lys sten', en: 'Light stone' }, hex: '#F2F1F0', dark: false },
    { name: { da: 'Bordeaux', en: 'Burgundy' }, hex: '#630D0D', dark: true },
    { name: { da: 'Guld', en: 'Gold' }, hex: '#C9A326', dark: false },
    { name: { da: 'Sten', en: 'Stone' }, hex: '#D1D0CE', dark: false },
    { name: { da: 'Hvid', en: 'White' }, hex: '#FFFFFF', dark: false },
  ],
  'peter-salling': [
    { name: { da: 'Kul', en: 'Charcoal' }, hex: '#0C0C0C', dark: true },
    { name: { da: 'Hvid', en: 'White' }, hex: '#FAFAFA', dark: false },
    { name: { da: 'Sort', en: 'Black' }, hex: '#000000', dark: true },
    { name: { da: 'Lys grå', en: 'Light grey' }, hex: '#A7A7A7', dark: false },
    { name: { da: 'Grå', en: 'Grey' }, hex: '#484848', dark: true },
    { name: { da: 'Grafit', en: 'Graphite' }, hex: '#1A1A1A', dark: true },
  ],
  'det-kollektive-klaedeskab': [
    { name: { da: 'Taupe', en: 'Taupe' }, hex: '#847165', dark: true },
    { name: { da: 'Lys sand', en: 'Light sand' }, hex: '#F5F0EC', dark: false },
    { name: { da: 'Rosa sand', en: 'Rosy sand' }, hex: '#D6B3A2', dark: false },
    { name: { da: 'Espresso', en: 'Espresso' }, hex: '#2E2926', dark: true },
    { name: { da: 'Varm brun', en: 'Warm brown' }, hex: '#5F544D', dark: true },
    { name: { da: 'Sand', en: 'Sand' }, hex: '#EFE7E0', dark: false },
  ],
}

function getCasePalette(locale: Locale, caseSlug: string): CaseDetailPalette | undefined {
  const swatches = casePalettes[caseSlug]
  if (!swatches) return undefined

  return {
    title: paletteTitles[locale],
    description: casePaletteDescriptions[caseSlug]?.[locale] ?? '',
    swatches: swatches.map((swatch) => ({ ...swatch, name: swatch.name[locale] })),
  }
}

function joinRole(locale: Locale, words: string[]): string {
  if (words.length === 0) return ''
  if (words.length === 1) return words[0]

  const rest = words.slice(0, -1)
  const last = words[words.length - 1]
  return locale === 'da' ? `${rest.join(', ')} og ${last}` : `${rest.join(', ')} and ${last}`
}

/** The role on a case: its keywords after the first (the category), joined. */
export function getCaseRole(locale: Locale, caseSlug: string): string | null {
  const summary = getCaseItemSummary(locale, caseSlug)
  return (summary && joinRole(locale, summary.keywords.slice(1))) || null
}

function getCaseHeroMeta(locale: Locale, caseSlug: string): CaseDetailHeroMeta[] {
  const labels = metaLabels[locale]
  const summary = getCaseItemSummary(locale, caseSlug)
  const year = getCaseYear(caseSlug)
  const liveUrl = getCaseLiveUrl(caseSlug)
  const meta: CaseDetailHeroMeta[] = []

  if (summary) {
    meta.push({ label: labels.type, value: getCaseCategoryLabel(locale, summary.category) })

    const role = getCaseRole(locale, caseSlug)
    if (role) meta.push({ label: labels.role, value: role })
  }

  if (year) meta.push({ label: labels.completed, value: year })

  meta.push({
    label: labels.explore,
    value: exploreValues[locale],
    href: liveUrl ?? undefined,
    button: true,
  })

  return meta
}

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

  return {
    ...detail,
    hero: {
      ...detail.hero,
      name: getCaseItemSummary(locale, caseSlug)?.client ?? detail.hero.title,
      meta: getCaseHeroMeta(locale, caseSlug),
    },
    overview: getCaseOverview(locale, caseSlug, detail.hero.description),
    typography: getCaseTypography(locale, caseSlug),
    palette: getCasePalette(locale, caseSlug),
    gallery,
    nextCase,
  }
}
