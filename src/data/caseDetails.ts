import type {
  CaseDetailContent,
  CaseDetailFact,
  CaseDetailHero,
  CaseDetailHeroMeta,
  CaseDetailOverview,
  CaseDetailPalette,
  CaseDetailResults,
  CaseDetailTypography,
} from '../types/caseDetail'
import type { Locale } from './navigation'
import { defaultLocale } from './navigation'
import { getCaseCategoryLabel, getCaseItemSummary } from './cases'
import { getCaseGallery } from './caseGallery'
import { getCaseMainVideo } from './caseVideos'
import { getCaseYear, getNextCasePreview } from './caseNavigation'

type CaseDetailBase = Omit<
  CaseDetailContent,
  'gallery' | 'nextCase' | 'hero' | 'overview' | 'typography' | 'secondaryTypography' | 'palette' | 'results'
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
          { imageSrc: '/cases/nordwear/main-v2--16-9.webp', imageAlt: 'Nordwear forside på en bærbar' },
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
    'rethink-furniture': {
      id: 'rethink-furniture',
      hero: {
        eyebrow: 'Case · Website',
        title: 'Rethink Furniture — en webshop til møbler, der holder længere',
        description:
          'En rolig webshop til et dansk møbelbrand, hvor store billeder, serif-typografi og stille animationer lader materialer og håndværk tale.',
        sliderAriaLabel: 'Automatisk gennemløb af Rethink Furniture case-billeder',
        slides: [
          { imageSrc: '/cases/rethink-furniture/macbook-main-v2--4-3.webp', imageAlt: 'Rethink Furniture på en MacBook Pro' },
        ],
      },
      columns: [
        {
          title: 'Kunde',
          paragraphs: [
            'Rethink Furniture er et fiktivt dansk møbelbrand, jeg selv har skabt, så designet kunne bygges uden andres rammer.',
            'Brandet laver få modeller og gør dem rigtigt: massivt træ, uld og sten, samlet til at holde i generationer.',
          ],
        },
        {
          title: 'Ydelser',
          paragraphs: [
            'Jeg stod for hele forløbet: koncept og design i Figma, og derefter udviklingen af en fungerende webshop.',
            'Fokus var på ro, hierarki og bevægelse, så siden føles håndværksmæssig og ikke som en skabelon.',
          ],
        },
        {
          title: 'Resultat',
          paragraphs: [
            'En komplet shop med forside, shop, produktsider, om os, showroom og kontakt, som fungerer på computer, tablet og mobil.',
            'Siden viser, hvordan animation kan bruges med måde: den fører blikket og understøtter indholdet uden at stjæle opmærksomheden.',
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
          { imageSrc: '/cases/fresh-cut/official--16-10.webp', imageAlt: 'Fresh Cut forside på en bærbar i en lænestol af cognacfarvet læder' },
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
          { imageSrc: '/cases/peter-salling/main--16-9.webp', imageAlt: 'Peter Sallings projektside for Live Life in Colour på en MacBook' },
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
    offscript: {
      id: 'offscript',
      hero: {
        eyebrow: 'Case · Website',
        title: 'OFFSCRIPT® — et redaktionelt site til et uafhængigt kunstnerbureau',
        description:
          'Et redaktionelt, typografiledt site til et uafhængigt kunstnerbureau, hvor store portrætter og rolig bevægelse sætter kunstnerne i centrum.',
        sliderAriaLabel: 'Automatisk gennemløb af OFFSCRIPT® case-billeder',
        slides: [
          { imageSrc: '/cases/offscript/mockup--4-3.webp', imageAlt: 'OFFSCRIPT® på en iPhone' },
        ],
      },
      columns: [
        {
          title: 'Kunde',
          paragraphs: [
            'OFFSCRIPT® er et uafhængigt kunstnerbureau med ni kunstnere inden for otte genrer.',
            'Projektet er et designkoncept: Biografier, kontaktoplysninger og udgivelser er pladsholdere, og bookingformularen er en demo, der ikke sender noget.',
          ],
        },
        {
          title: 'Ydelser',
          paragraphs: [
            'Jeg designede sitet i Figma og byggede det i React, TypeScript og GSAP – fra forside og kunstnersider til genresider og kontaktformular.',
            'Udtrykket er typografiledt: Geist i store, stramt satte størrelser, portrætfotografi, der leverer farven, og én accentfarve, der bruges sparsomt.',
          ],
        },
        {
          title: 'Resultat',
          paragraphs: [
            'Et site, der føles som et trykt magasin: en række af portrætkort, man kan trække i, og en glidende overgang, når et kort åbner kunstnerens side.',
            'Layoutet er bygget på 12, 8 og 4 kolonner til desktop, tablet og mobil, og al bevægelse tager hensyn til brugerens indstilling for reduceret bevægelse.',
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
          { imageSrc: '/cases/det-kollektive-klaedeskab/official--16-10.webp', imageAlt: 'Det Kollektive Klædeskabs forside på en bærbar i et lyst garderobestudie' },
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
  },
} as const satisfies Record<Locale, Record<string, CaseDetailBase>>

const metaLabels: Record<Locale, { type: string; role: string; completed: string; explore: string }> = {
  da: { type: 'Type', role: 'Rolle', completed: 'Afsluttet', explore: 'Udforsk' },
}

const exploreValues: Record<Locale, string> = {
  da: 'Se live',
}

/**
 * Live site behind the "Explore" button. null = no live site yet, so the
 * button renders without a link (add a URL here to make it open the site).
 */
const caseLiveUrls: Record<string, string | null> = {
  nordwear: 'https://nordwear.pages.dev',
  'fresh-cut': null,
  'peter-salling': 'https://petersalling.com',
  offscript: 'https://offscript.frisdahlstudio.workers.dev',
  'rethink-furniture': 'https://rethink-furniture.frisdahlstudio.workers.dev',
  'det-kollektive-klaedeskab': null,
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
    'rethink-furniture': {
      description: [
        'Rethink Furniture er et fiktivt, dansk møbelbrand, designet i Figma og bygget som en fungerende webshop. Udtrykket er roligt og redaktionelt: varme, naturlige toner, store billeder og en serif-typografi, der giver siden en følelse af papir og håndværk.',
        'Shoppen kan filtreres, sorteres og søges i. Hver produktside har et galleri, valg af træsort og højde, antal og uddybende afsnit, og kurven gemmes i browseren. Derudover er der sider om brandet, et showroom med bookingformular og en kontaktside med ofte stillede spørgsmål. Formularer og betaling er demonstrationer, der validerer og forklarer, at intet bliver sendt.',
        'Bevægelsen er det, der binder siden sammen: overskrifter løfter sig ud af masker, billeder afdækkes og falder til ro, og sider skiftes med et sandfarvet tæppe, der hæver sig. Alt er bygget i React og TypeScript med GSAP og Lenis og tilpasset, så det også fungerer fint med reduceret bevægelse. Produktbillederne er genereret med AI, så detaljerne er tilnærmelser og ikke rigtige møbler.',
      ],
      deliverables: 'Koncept, UX/UI-design, frontend og animation',
      scope: 'Webshop, produktsider, kurv, søgning, showroom',
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
    'fresh-cut': {
      // Describes what the Fresh Cut site actually does (see the theshearroom repository); no invented results.
      description: [
        'Fresh Cut er en hjemmeside til en moderne barbershop, bygget til at føre den besøgende fra første indtryk til en booket tid. Udtrykket er maskulint og raffineret med lyse flader, mørkt træ, varme tan-accenter og store geometriske overskrifter, så stemningen fra salonen kan mærkes allerede online.',
        'Forsiden samler det vigtigste øverst: et klart løfte, kundernes vurderinger i tal og en tydelig Book nu-knap. Derfra fører siden videre til en bookingformular, hvor man vælger lokation, ydelse, frisør, dato og tid, en prisliste opdelt i Mænd, Kvinder og Børn & Unge, et særligt tilbud, anmeldelser med karakterer for hygiejne, service, tilfredshed og professionalisme og et kort over salonerne i København, Aarhus og Odense.',
        'Sitet er bygget i React og TypeScript med Tailwind CSS og tænkt mobilen først, så priser og booking fungerer lige så godt på telefonen som på en stor skærm. GSAP står for de rolige animationer, når sektionerne glider ind, og for menuen, der giver hurtige genveje til ydelser, lokationer, tilbud og anmeldelser.',
      ],
      deliverables: 'UX/UI-design, frontend og bookingflow',
      scope: 'Website, booking, prisliste, anmeldelser, lokationer',
    },
    offscript: {
      description: [
        'OFFSCRIPT® er en hjemmeside til et uafhængigt kunstnerbureau. Jeg ville have, at den føles som et magasin og ikke som en typisk bureauside, så designet bygger på store overskrifter i Geist, rolige flader i papir og sort og portrætfotos, der giver farve. Der er kun én accentfarve, en orange-rød, som bruges til tal, hover og bookingknappen.',
        'Forsiden starter med en preloader og en stor tekst med et portræt, og logoet fylder hele bredden i bunden. Under den ligger kunstnerne i en række af kort i forskellige størrelser, som man kan trække i, og en liste med otte genrer, hvor et portræt følger musen. Klikker man på et kort, flyver portrættet over på kunstnerens side. Klikker man på en genre, åbner genresiden som en sort cirkel, der vokser frem fra klikket.',
        'Kunstnersiden er delt i to: portræt til venstre, biografi og booking til højre, og man kan gå videre til næste kunstner uden at forlade siden. Sitet er lavet i React, TypeScript og Tailwind CSS, med GSAP og ScrollTrigger til animationerne og Lenis til blød scroll. Teksterne er pladsholdere, og kontaktformularen er en demo.',
      ],
      deliverables: 'UX/UI-design, frontend og animation',
      scope: 'Forside, kunstnersider, genresider, kontaktformular',
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
      /** A second typeface the case uses, shown as its own specimen right after the first. */
      secondary?: {
        typeface: string
        category: Record<Locale, string>
        description: Record<Locale, string>
        fontFamily: string
        capHeight: number
      }
    }
  >
> = {
  nordwear: {
    typeface: 'Montserrat',
    category: { da: 'Geometrisk sans-serif',  },
    description: {
      da: 'Montserrat bærer hele butikken – logo, navigation, produktnavne, priser og knapper. Den geometriske form giver et rent og moderne udtryk, der lader produktbillederne stå i centrum, og med flere vægte af samme skrift skabes hierarkiet uden at blande skrifttyper.',
    },
    fontFamily: "'Montserrat Variable', sans-serif",
    capHeight: 0.7,
  },
  'fresh-cut': {
    typeface: 'Urbanist',
    category: { da: 'Geometrisk sans-serif',  },
    description: {
      da: 'Urbanist bærer alle overskrifter – fra den store forsidetitel "Ultimativ pleje for mænd" til tal, sektioner og bookingformularen. De runde, geometriske former giver et moderne og maskulint udtryk med selvsikker tyngde, mens brødteksten står i den rolige sans-serif Manrope, så priser og ydelser er lette at læse.',
    },
    fontFamily: "'Urbanist Variable', sans-serif",
    capHeight: 0.7,
  },
  'peter-salling': {
    typeface: 'Raleway',
    category: { da: 'Elegant sans-serif',  },
    description: {
      da: 'Raleway bruges til både overskrifter og brødtekst på hele sitet. Titlerne står i store, spærrede versaler, der giver et filmisk, plakatagtigt udtryk, mens de lettere vægte holder brødteksten rolig, så filmene får lov at stå i centrum.',
    },
    fontFamily: "'Raleway Variable', sans-serif",
    capHeight: 0.72,
  },
  offscript: {
    typeface: 'Geist',
    category: { da: 'Neo-grotesk sans-serif' },
    description: {
      da: 'Geist er den eneste skrift på hele sitet. Store overskrifter står i fed vægt med stram bogstavafstand, så de bærer siden som plakater, mens små tekster står i medium, og brødteksten i regular dæmpes til 60 % af tekstfarven. Hierarkiet kommer af størrelse og vægt, ikke af flere skrifttyper.',
    },
    fontFamily: "'Geist', sans-serif",
    capHeight: 0.71,
  },
  'rethink-furniture': {
    typeface: 'Instrument Serif',
    category: { da: 'Display-serif' },
    description: {
      da: 'Instrument Serif bærer overskrifter, udsagn og produktnavne – fra den store forsidetitel til hvert enkelt møbel. De slanke former og de skarpe kontraster giver et roligt, redaktionelt udtryk, der passer til møbler lavet til at holde.',
    },
    fontFamily: "'Instrument Serif', serif",
    capHeight: 0.72,
    secondary: {
      typeface: 'Hanken Grotesk',
      category: { da: 'Grotesk sans-serif' },
      description: {
        da: 'Hanken Grotesk bærer brødtekst, priser, materialer og knapper. Den neutrale, åbne form er let at læse i små størrelser og lader serifskriften stå alene om at have personlighed, så detaljerne omkring hvert møbel forbliver rolige og tydelige.',
      },
      fontFamily: "'Hanken Grotesk', sans-serif",
      capHeight: 0.7,
    },
  },
  'det-kollektive-klaedeskab': {
    typeface: 'DM Serif Display',
    category: { da: 'Display-serif',  },
    description: {
      da: 'DM Serif Display bærer alle overskrifter – fra den store forsidetitel til sektionerne. De kraftige kontraster giver et eksklusivt og feminint udtryk, mens brødteksten står i den rene sans-serif Manrope, så siderne forbliver lette at læse.',
    },
    fontFamily: "'DM Serif Display', serif",
    capHeight: 0.67,
  },
}

type CaseTypeface = NonNullable<(typeof caseTypefaces)[string]>

function toTypography(locale: Locale, font: Pick<CaseTypeface, 'typeface' | 'category' | 'description' | 'fontFamily' | 'capHeight'>): CaseDetailTypography {
  return {
    ...typographyLabels[locale],
    description: font.description[locale],
    typeface: font.typeface,
    category: font.category[locale],
    fontFamily: font.fontFamily,
    capHeight: font.capHeight,
  }
}

function getCaseTypography(locale: Locale, caseSlug: string): CaseDetailTypography | undefined {
  const font = caseTypefaces[caseSlug]
  return font ? toTypography(locale, font) : undefined
}

function getCaseSecondaryTypography(locale: Locale, caseSlug: string): CaseDetailTypography | undefined {
  const font = caseTypefaces[caseSlug]?.secondary
  return font ? toTypography(locale, font) : undefined
}

const paletteTitles: Record<Locale, string> = { da: 'Farvepalette',  }

/** How each case uses its palette. */
const casePaletteDescriptions: Partial<Record<string, Record<Locale, string>>> = {
  nordwear: {
    da: 'Paletten er bevidst afdæmpet, så produkterne står stærkest. Kul bruges til tekst, knapper og rammer, mens den lyse stenfarve er baggrunden for hele butikken. Bordeaux er brandets accent og ses i toppen af hver side, guld markerer anmeldelser, og den grå sten deler indholdet op uden at tage fokus.',
  },
  'rethink-furniture': {
    da: 'Paletten er hentet fra selve materialerne. Det lyse papir er baggrunden på hele sitet, den varme sand deler siderne op, og valnød bruges til de mørke flader og footeren. Det næsten sorte blæk bærer tekst og knapper, så billederne af træ, uld og sten får lov at være de eneste farver.',
  },
  'peter-salling': {
    da: 'Paletten er næsten ren sort og hvid, så filmenes egne farver får hele opmærksomheden. Kul er baggrunden på hele sitet, hvid bruges til titler og navigation, og de grå toner er hvid med lavere gennemsigtighed – til brødtekst, linjer og flader oven på det mørke.',
  },
  'fresh-cut': {
    da: 'Paletten er stram og maskulin. Kul bruges til overskrifter, tekst og knapper, mens den varme tan-farve er brandets accent – i logoet, på priser, tal og streger. De lyse flader i hvid og råhvid giver ro omkring ydelserne, grafit bærer de mørke sektioner med lokationer og footer, og den grå tone holder brødteksten afdæmpet.',
  },
  offscript: {
    da: 'Paletten er papir og blæk: det varme papir er sidens baggrund, og den næsten sorte blæk bruges til tekst og til de mørke sektioner, som skifter med de lyse ned ad forsiden. Den orange-røde accent bruges sparsomt til tal, hover og bookingknappen, så portrætterne beholder farven.',
  },
  'det-kollektive-klaedeskab': {
    da: 'Paletten er varm og blød uden ren hvid og sort. Taupe er den primære farve på knapper og links, den lyse sandtone er baggrunden, og den rosa sand er accent på de vigtigste knapper. Mørk espresso bruges til overskrifter og den varme brun til brødtekst, så alt hænger sammen i samme jordnære toneskala.',
  },
}

/** Colours each site uses (from its own styles), most used first. */
const casePalettes: Partial<
  Record<string, { name: Record<Locale, string>; hex: string; dark: boolean }[]>
> = {
  nordwear: [
    { name: { da: 'Kul',  }, hex: '#1C1C1C', dark: true },
    { name: { da: 'Lys sten',  }, hex: '#F2F1F0', dark: false },
    { name: { da: 'Bordeaux',  }, hex: '#630D0D', dark: true },
    { name: { da: 'Guld',  }, hex: '#C9A326', dark: false },
    { name: { da: 'Sten',  }, hex: '#D1D0CE', dark: false },
    { name: { da: 'Hvid',  }, hex: '#FFFFFF', dark: false },
  ],
  'rethink-furniture': [
    { name: { da: 'Papir', }, hex: '#F6F3EE', dark: false },
    { name: { da: 'Sand', }, hex: '#EBE5DA', dark: false },
    { name: { da: 'Blæk', }, hex: '#26231F', dark: true },
    { name: { da: 'Valnød', }, hex: '#3A2E27', dark: true },
  ],
  'peter-salling': [
    { name: { da: 'Kul',  }, hex: '#0C0C0C', dark: true },
    { name: { da: 'Hvid',  }, hex: '#FAFAFA', dark: false },
    { name: { da: 'Sort',  }, hex: '#000000', dark: true },
    { name: { da: 'Lys grå',  }, hex: '#A7A7A7', dark: false },
    { name: { da: 'Grå',  }, hex: '#484848', dark: true },
    { name: { da: 'Grafit',  }, hex: '#1A1A1A', dark: true },
  ],
  'fresh-cut': [
    { name: { da: 'Tan',  }, hex: '#D4A373', dark: false },
    { name: { da: 'Kul',  }, hex: '#1A1A1A', dark: true },
    { name: { da: 'Hvid',  }, hex: '#FFFFFF', dark: false },
    { name: { da: 'Grafit',  }, hex: '#202121', dark: true },
    { name: { da: 'Råhvid',  }, hex: '#F9FAFB', dark: false },
    { name: { da: 'Grå',  }, hex: '#6B7280', dark: true },
  ],
  offscript: [
    { name: { da: 'Papir' }, hex: '#E9E6DF', dark: false },
    { name: { da: 'Blæk' }, hex: '#0E0E0D', dark: true },
    { name: { da: 'Accent' }, hex: '#FF4B1F', dark: true },
    { name: { da: 'Lys papir' }, hex: '#F6F4EF', dark: false },
  ],
  'det-kollektive-klaedeskab': [
    { name: { da: 'Taupe',  }, hex: '#847165', dark: true },
    { name: { da: 'Lys sand',  }, hex: '#F5F0EC', dark: false },
    { name: { da: 'Rosa sand',  }, hex: '#D6B3A2', dark: false },
    { name: { da: 'Espresso',  }, hex: '#2E2926', dark: true },
    { name: { da: 'Varm brun',  }, hex: '#5F544D', dark: true },
    { name: { da: 'Sand',  }, hex: '#EFE7E0', dark: false },
  ],
}

const resultsTitles: Record<Locale, string> = { da: 'Resultater' }

/**
 * Measured on the live site with Lighthouse 13 CLI: 5 cold runs per page, mobile (simulated Slow 4G, 4x CPU) and desktop preset.
 * Mobile LCP was 4.1 s on the home page and 2.9 s on project pages (Google's "good" is 2.5 s): not shown as a tile.
 * Only cases with real measurements have an entry; re-measure before changing a figure.
 * Every case is measured on its live site (Lighthouse 13.5, 2026-11-17, three pages, mobile with Slow 4G and 4x CPU
 * and desktop; medians). Peter Salling, OFFSCRIPT and Rethink Furniture: 3-5 runs per page; Nordwear: five. Nordwear's
 * figures were weak (product page CLS 0.77, mobile performance 58); after the fixes in the shop (2026-11-18: a skeleton
 * for the loading product page, the header measured before paint, a meta description and robots.txt, named buttons)
 * they were measured again live.
 */
const caseResults: Partial<Record<string, Record<Locale, Omit<CaseDetailResults, 'title'>>>> = {
  'peter-salling': {
    da: {
      description:
        'Sitet er målt live på petersalling.com: forsiden og to projektsider, fem målinger på hver, på mobil med netværks- og CPU-begrænsning og på desktop. Siderne er fyldt med film og vejer 4–6 MB, men de vises stabilt, og søgemaskineoptimeringen er i orden.',
      metrics: [
        { label: 'Hastighed', value: '87–94', detail: 'Lighthouse-score for ydelse på mobil, 96–99 på desktop.' },
        { label: 'Stabilitet', value: '0,00', detail: 'Praktisk talt ingen layout-skift (CLS højst 0,003).' },
        { label: 'Kvalitet', value: '89–100', detail: 'Lighthouse-tilgængelighed: 100 på forsiden, 89 på projektsiderne. Best practice: 100.' },
        { label: 'SEO', value: '100', detail: 'Fuld score i Lighthouse på alle tre sider.' },
      ],
      note: 'Lighthouse 13, median af fem målinger pr. side, november 2026.',
    },
  },
  nordwear: {
    da: {
      description:
        'Butikken er målt live på nordwear.pages.dev efter en gennemgang af koden: forsiden, en kategoriside og en produktside, fem målinger på hver, på mobil med netværks- og CPU-begrænsning og på desktop. Før var produktsiden den svageste (ydelse 58 på mobil, og siden hoppede, mens den indlæstes). Det er løst: siden holder nu fast i sin form, mens produktet hentes, og headeren måles, før siden males. Den langsomste side er forsiden på mobil (score 77, LCP ca. 4,9 s, fordi hovedbilledet og produkterne hentes fra en server, der skal svare først).',
      metrics: [
        { label: 'Hastighed', value: '77–98', detail: 'Lighthouse-score for ydelse: 77–90 på mobil (77 på forsiden), 97–98 på desktop.' },
        { label: 'Stabilitet', value: '0,00–0,02', detail: 'Layout-skift (CLS) højst 0,022 på alle tre sider, mod 0,10–0,78 før. Under 0,1 er godt.' },
        { label: 'Kvalitet', value: '98–100', detail: 'Lighthouse-tilgængelighed: 100 på forsiden og kategorisiden, 98 på produktsiden. Best practice: 96.' },
        { label: 'SEO', value: '100', detail: 'Fuld score i Lighthouse på alle tre sider (før 75–83: der manglede en beskrivelse og en robots.txt).' },
      ],
      note: 'Lighthouse 13, median af fem målinger pr. side, målt live på nordwear.pages.dev, november 2026.',
    },
  },
  offscript: {
    da: {
      description:
        'Sitet er målt live på offscript.frisdahlstudio.workers.dev: forsiden, en kunstnerside og kontaktsiden, tre målinger på hver, på mobil med netværks- og CPU-begrænsning og på desktop. Forsiden på mobil er den langsomste (score 70, LCP ca. 5,4 s, den åbner med en preloader og vejer 1,2 MB), mens kunstnersiden og kontaktsiden indlæses hurtigt (score 91 og 92).',
      metrics: [
        { label: 'Hastighed', value: '70–92', detail: 'Lighthouse-score for ydelse på mobil (70 på forsiden), 99–100 på desktop.' },
        { label: 'Stabilitet', value: '0,00', detail: 'Praktisk talt ingen layout-skift (CLS højst 0,003).' },
        { label: 'Kvalitet', value: '96–100', detail: 'Lighthouse-tilgængelighed: 96 på forsiden, 100 på de to andre sider. Best practice: 96–100.' },
        { label: 'SEO', value: '91–92', detail: 'Lighthouse-score for søgemaskineoptimering på alle tre sider.' },
      ],
      note: 'Lighthouse 13, median af tre målinger pr. side, målt live på offscript.frisdahlstudio.workers.dev, november 2026.',
    },
  },
  'rethink-furniture': {
    da: {
      description:
        'Sitet er målt live på rethink-furniture.frisdahlstudio.workers.dev: forsiden, shoppen og en produktside, tre målinger på hver, på mobil med netværks- og CPU-begrænsning og på desktop. Forsiden vejer mest (1,2 MB), men åbner hurtigt (LCP ca. 3,2 s). Shoppen er langsomst på mobil (score 81, LCP ca. 4,2 s, mange produktbilleder), og layoutet står helt stille på alle tre sider.',
      metrics: [
        { label: 'Hastighed', value: '81–87', detail: 'Lighthouse-score for ydelse på mobil (81 på shoppen), 98–99 på desktop.' },
        { label: 'Stabilitet', value: '0,00', detail: 'Ingen layout-skift på de tre sider (CLS 0).' },
        { label: 'Kvalitet', value: '92–94', detail: 'Lighthouse-tilgængelighed: 93 på forsiden, 92 på shoppen og 94 på produktsiden. Best practice: 100.' },
        { label: 'SEO', value: '92', detail: 'Lighthouse-score for søgemaskineoptimering på alle tre sider.' },
      ],
      note: 'Lighthouse 13, median af tre målinger pr. side, målt live på rethink-furniture.frisdahlstudio.workers.dev, november 2026.',
    },
  },
}

function getCaseResults(locale: Locale, caseSlug: string): CaseDetailResults | undefined {
  const results = caseResults[caseSlug]?.[locale]
  return results ? { title: resultsTitles[locale], ...results } : undefined
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

function joinRole(words: string[]): string {
  if (words.length === 0) return ''
  if (words.length === 1) return words[0]

  const rest = words.slice(0, -1)
  const last = words[words.length - 1]
  return `${rest.join(', ')} og ${last}`
}

/** The role on a case: its keywords after the first (the category), joined. */
export function getCaseRole(locale: Locale, caseSlug: string): string | null {
  const summary = getCaseItemSummary(locale, caseSlug)
  return (summary && joinRole(summary.keywords.slice(1))) || null
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

/** One image of a case page, for the home page's hover preview. */
export interface CasePreviewImage {
  imageSrc: string
  imageAlt: string
}

/**
 * Every image on a case's page, in page order (hero first), without
 * duplicates: what the home page flashes through when a project is hovered.
 */
export function getCasePreviewImages(locale: Locale, caseSlug: string): CasePreviewImage[] {
  const detail = getCaseDetail(locale, caseSlug)
  if (!detail) return []
  const gallery = detail.gallery
  const images = [
    ...(gallery.hoverTrio ?? []),
    ...detail.hero.slides,
    ...(gallery.introPair ?? []),
    ...(gallery.horizontalTopHidden ? [] : (gallery.horizontalTopPair ?? [gallery.horizontalTop])),
    ...(gallery.verticalPairTop ?? []),
    ...(gallery.bottomWide ? [gallery.bottomWide] : []),
    ...(gallery.verticalPairBottom ?? []),
    ...(gallery.horizontalBottom ? [gallery.horizontalBottom] : []),
    ...(gallery.horizontalBottomPair ?? []),
  ]
  const seen = new Set<string>()
  const result: CasePreviewImage[] = []
  for (const { imageSrc, imageAlt } of images) {
    if (!imageSrc || seen.has(imageSrc)) continue
    seen.add(imageSrc)
    result.push({ imageSrc, imageAlt })
  }
  return result
}

/**
 * Cases whose main picture needs a hero other than 16:9. OFFSCRIPT's clip is a phone that fills 75% of
 * the height of its 4:3 frame, exactly what a 16:9 window shows, so in a 16:9 hero the phone touched
 * (and, with the transition's crop, was cut by) the top and bottom edges. 3:2 shows 89% of the height:
 * the whole phone with air above and below, from the same centred crop the transition uses.
 */
const caseHeroAspectRatios: Partial<Record<string, string>> = {
  offscript: '3 / 2',
}

/** A case's main image: the first slide of its hero, the image at the top of its page. */
function getCaseMainImage(locale: Locale, caseSlug: string) {
  const localeDetails = caseDetails[locale] as Record<string, CaseDetailBase>
  return localeDetails[caseSlug]?.hero.slides[0] ?? null
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

  const nextCase = getNextCasePreview(locale, caseSlug, (slug) => getCaseMainImage(locale, slug))
  if (!nextCase) return null

  return {
    ...detail,
    hero: {
      ...detail.hero,
      name: getCaseItemSummary(locale, caseSlug)?.client ?? detail.hero.title,
      meta: getCaseHeroMeta(locale, caseSlug),
      video: getCaseMainVideo(caseSlug),
      aspectRatio: caseHeroAspectRatios[caseSlug],
    },
    overview: getCaseOverview(locale, caseSlug, detail.hero.description),
    typography: getCaseTypography(locale, caseSlug),
    secondaryTypography: getCaseSecondaryTypography(locale, caseSlug),
    palette: getCasePalette(locale, caseSlug),
    results: getCaseResults(locale, caseSlug),
    gallery,
    nextCase: { ...nextCase, aspectRatio: caseHeroAspectRatios[nextCase.href.split('/').pop() ?? ''] },
  }
}
