import type { FaqContent } from '../types/faq'
import type { ProcessSliderContent } from '../types/process'
import type { SplitPanelContent } from '../types/splitPanel'
import type { WhyChooseUsContent } from '../types/whyChooseUs'
import type { Locale } from './navigation'
import { defaultLocale } from './navigation'

const webudviklingContent = {
  da: {
    splitPanel: {
      badgeLabel: 'Webudvikling',
      title: 'Skræddersyede løsninger bygget til at performe',
      description:
        'Vi designer og udvikler hjemmesider fra bunden med fokus på hastighed, brugeroplevelse og et udtryk, der matcher jeres brand.',
      images: [
        { src: '/images/webudvikling/webudvikling-split.webp', alt: 'Webudvikling 1' },
        { src: '/images/webudvikling/webudvikling-split.webp', alt: 'Webudvikling 2' },
        { src: '/images/webudvikling/webudvikling-split.webp', alt: 'Webudvikling 3' },
      ],
    },
    whyChooseUs: {
      title: 'Der er masser af grunde til at vælge mig',
      rows: [
        [
          'Skræddersyet design',
          'Høj performance',
          'SEO fra start',
          'Responsivt',
          'Moderne tech stack',
          'Klart scope',
        ],
        [
          'Direkte dialog',
          'Transparent proces',
          'Hurtig go-live',
          'Løbende support',
          'Konverteringsfokus',
          'Brand-tilpasset',
        ],
      ],
    },
    process: {
      label: 'Min proces',
      sliderAriaLabel: 'Sådan arbejder jeg',
      sliderStatus: 'Trin {current} af {total}',
      steps: [
        {
          title: 'Skabt med vision. Afsluttet med omhu.',
          description:
            'Hvert projekt følger en klar og gennemarbejdet proces — med præcision, transparens og ro i maven fra start til slut.',
          keywords: [],
          layout: 'horizontal-reveal',
          mediaPosition: 'right',
          imageSrc: '/cases/nordwear/production-mac.webp',
          imageAlt: 'Nordwear website vist på computer',
        },
        {
          title: 'Opdagelse og strategi',
          description:
            'Jeg starter med at forstå din virksomhed, målgruppe og ambitioner. Her definerer vi sammen scope, prioriteringer og en klar retning for projektet.',
          keywords: ['Brief', 'Målgruppe', 'Scope', 'Roadmap', 'Konkurrentanalyse', 'Mål'],
          layout: 'dual-portrait',
          mediaPosition: 'left',
          imageSrc: '/cases/nordwear/mobile--6-7.jpg',
          imageAlt: 'Mobilvisning af Nordwear website',
          imageSrcSecondary: '/cases/nordwear/category--6-7.jpg',
          imageAltSecondary: 'Kategoriside fra Nordwear case',
        },
        {
          title: '',
          description: '',
          keywords: [],
          layout: 'horizontal-reveal',
          imageOnly: true,
          mediaPosition: 'right',
          imageSrc: '/cases/fresh-cut/thumbnail--16-10.jpg',
          imageAlt: 'Fresh Cut website',
        },
        {
          title: 'Design og prototyp',
          description:
            'Jeg omsætter strategien til et stærkt visuelt udtryk med wireframes, UI-design og en klikbar prototype, så du kan se løsningen, før den bygges.',
          keywords: ['Wireframes', 'UI-design', 'Prototype', 'Branding', 'Designsystem', 'UX'],
          imageSrc: '/cases/fresh-cut/mobile1--16-10.jpg',
          imageAlt: 'Design og prototyp i webudviklingsprocessen',
        },
        {
          title: 'Udvikling',
          description:
            'Jeg bygger løsningen fra bunden med moderne teknologi, fokus på performance og en struktur, der er nem at vedligeholde og udvide.',
          keywords: [
            'Frontend',
            'React',
            'TypeScript',
            'Performance',
            'Responsivt',
            'CMS',
            'API',
            'Tilgængelighed',
          ],
          imageSrc: '/cases/nordwear/mobile.webp',
          imageAlt: 'Udvikling af skræddersyet website',
        },
        {
          title: 'Test og lancering',
          description:
            'Før go-live gennemgår jeg alt grundigt på tværs af enheder og browsere. Derefter lancerer jeg og sikrer en stabil overgang til den nye løsning.',
          keywords: ['QA', 'SEO', 'Go-live', 'Tracking', 'Browser-test', 'Performance-test'],
          imageSrc: '/cases/fresh-cut/mobile2.webp',
          imageAlt: 'Test og lancering af website',
        },
      ],
    },
    faq: {
      eyebrow: 'Se de spørgsmål jeg ofte får',
      title: 'Ofte stillede spørgsmål',
      items: [
        {
          question: 'Hvad koster en hjemmeside?',
          answer:
            'Prisen afhænger af omfang, funktionalitet og design. Jeg starter altid med en kort snak om dine behov, så du får et tydeligt tilbud uden skjulte omkostninger.',
        },
        {
          question: 'Hvor lang tid tager det at få en ny hjemmeside?',
          answer:
            'De fleste projekter tager mellem 4 og 10 uger fra kickoff til lancering. Tidsplanen afhænger af indhold, feedback og hvor mange sider og funktioner løsningen skal have.',
        },
        {
          question: 'Kan du hjælpe med både design og udvikling?',
          answer:
            'Ja. Jeg håndterer hele processen fra første idé og visuelt udtryk til kodning, test og lancering — så du får én samlet løsning og én kontaktperson.',
        },
        {
          question: 'Hvad sker der efter lancering?',
          answer:
            'Jeg tilbyder løbende vedligeholdelse, opdateringer og videreudvikling. Mange kunder vælger et samarbejde efter lancering, så hjemmesiden fortsat performer og udvikler sig.',
        },
      ],
    },
  },
} as const satisfies Record<
  Locale,
  {
    splitPanel: SplitPanelContent
    whyChooseUs: WhyChooseUsContent
    process: ProcessSliderContent
    faq: FaqContent
  }
>

export function getWebudviklingContent(locale: Locale = defaultLocale) {
  return webudviklingContent[locale]
}
