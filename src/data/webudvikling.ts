import type { FaqContent } from '../types/faq'
import type { ProcessSliderContent } from '../types/process'
import type { SplitPanelContent } from '../types/splitPanel'
import type { WhyChooseUsContent } from '../types/whyChooseUs'
import type { Locale } from './navigation'
import { defaultLocale } from './navigation'

const webudviklingContent = {
  da: {
    splitPanel: {
      imageSrc: '/images/webudvikling/webudvikling-split.webp',
      imageAlt: 'Webudvikling hos Frisdahl Studio',
      badgeLabel: 'Webudvikling',
      title: 'Skræddersyede løsninger bygget til at performe',
      description:
        'Vi designer og udvikler hjemmesider fra bunden med fokus på hastighed, brugeroplevelse og et udtryk, der matcher jeres brand.',
    },
    whyChooseUs: {
      title: 'Der er masser af årsager til at vælge os',
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
      label: 'Vores proces',
      sliderAriaLabel: 'Sådan arbejder vi',
      sliderStatus: 'Trin {current} af {total}',
      steps: [
        {
          title: 'Skabt med vision. Afsluttet med omhu.',
          description:
            'Hos Frisdahl Studio følger hvert projekt en klar og gennemarbejdet proces — med præcision, transparens og ro i maven fra start til slut.',
          keywords: [],
          layout: 'horizontal-reveal',
          mediaPosition: 'right',
          imageSrc: '/cases/nordwear/production-mac.webp',
          imageAlt: 'Nordwear website vist på computer',
        },
        {
          title: 'Opdagelse og strategi',
          description:
            'Vi starter med at forstå jeres virksomhed, målgruppe og ambitioner. Her definerer vi scope, prioriteringer og en klar retning for projektet.',
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
            'Vi omsætter strategien til et stærkt visuelt udtryk med wireframes, UI-design og en klikbar prototype, så I kan se løsningen, før den bygges.',
          keywords: ['Wireframes', 'UI-design', 'Prototype', 'Branding', 'Designsystem', 'UX'],
          imageSrc: '/cases/fresh-cut/mobile1--16-10.jpg',
          imageAlt: 'Design og prototyp i webudviklingsprocessen',
        },
        {
          title: 'Udvikling',
          description:
            'Vi bygger løsningen fra bunden med moderne teknologi, fokus på performance og en struktur, der er nem at vedligeholde og udvide.',
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
            'Før go-live gennemgår vi alt grundigt på tværs af enheder og browsere. Derefter lancerer vi og sikrer en stabil overgang til den nye løsning.',
          keywords: ['QA', 'SEO', 'Go-live', 'Tracking', 'Browser-test', 'Performance-test'],
          imageSrc: '/cases/fresh-cut/mobile2.webp',
          imageAlt: 'Test og lancering af website',
        },
      ],
    },
    faq: {
      eyebrow: 'Se de spørgsmål vi får ofte',
      title: 'Ofte stillede spørgsmål',
      items: [
        {
          question: 'Hvad koster en hjemmeside?',
          answer:
            'Prisen afhænger af omfang, funktionalitet og design. Vi starter altid med en kort snak om jeres behov, så I får et tydeligt tilbud uden skjulte omkostninger.',
        },
        {
          question: 'Hvor lang tid tager det at få en ny hjemmeside?',
          answer:
            'De fleste projekter tager mellem 4 og 10 uger fra kickoff til lancering. Tidsplanen afhænger af indhold, feedback og hvor mange sider og funktioner løsningen skal have.',
        },
        {
          question: 'Kan I hjælpe med både design og udvikling?',
          answer:
            'Ja. Vi håndterer hele processen fra første idé og visuelt udtryk til kodning, test og lancering — så I får én samlet løsning og én kontaktperson.',
        },
        {
          question: 'Hvad sker der efter lancering?',
          answer:
            'Vi tilbyder løbende vedligeholdelse, opdateringer og videreudvikling. Mange af vores kunder vælger et samarbejde efter lancering, så hjemmesiden fortsat performer og udvikler sig.',
        },
      ],
    },
  },
  en: {
    splitPanel: {
      imageSrc: '/images/webudvikling/webudvikling-split.webp',
      imageAlt: 'Web development at Frisdahl Studio',
      badgeLabel: 'Web development',
      title: 'Tailored solutions built to perform',
      description:
        'We design and develop websites from scratch with a focus on speed, user experience, and an expression that matches your brand.',
    },
    whyChooseUs: {
      title: 'There are plenty of reasons to choose us',
      rows: [
        [
          'Tailored design',
          'High performance',
          'SEO from day one',
          'Responsive',
          'Modern tech stack',
          'Clear scope',
        ],
        [
          'Direct communication',
          'Transparent process',
          'Fast go-live',
          'Ongoing support',
          'Conversion focus',
          'Brand-aligned',
        ],
      ],
    },
    process: {
      label: 'Our process',
      sliderAriaLabel: 'How we work',
      sliderStatus: 'Step {current} of {total}',
      steps: [
        {
          title: 'Built with vision. Finished with care.',
          description:
            'At Frisdahl Studio, every project follows a clear and refined process — ensuring precision, transparency, and peace of mind from start to finish.',
          keywords: [],
          layout: 'horizontal-reveal',
          mediaPosition: 'right',
          imageSrc: '/cases/nordwear/production-mac.webp',
          imageAlt: 'Nordwear website shown on a computer',
        },
        {
          title: 'Discovery and strategy',
          description:
            'We start by understanding your business, audience, and ambitions. Here we define scope, priorities, and a clear direction for the project.',
          keywords: ['Brief', 'Audience', 'Scope', 'Roadmap', 'Competitor review', 'Goals'],
          layout: 'dual-portrait',
          mediaPosition: 'left',
          imageSrc: '/cases/nordwear/mobile--6-7.jpg',
          imageAlt: 'Mobile view of the Nordwear website',
          imageSrcSecondary: '/cases/nordwear/category--6-7.jpg',
          imageAltSecondary: 'Category page from the Nordwear case',
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
          title: 'Design and prototype',
          description:
            'We translate strategy into a strong visual direction with wireframes, UI design, and a clickable prototype so you can see the solution before it is built.',
          keywords: ['Wireframes', 'UI design', 'Prototype', 'Branding', 'Design system', 'UX'],
          imageSrc: '/cases/fresh-cut/mobile1--16-10.jpg',
          imageAlt: 'Design and prototype in the web development process',
        },
        {
          title: 'Development',
          description:
            'We build the solution from scratch with modern technology, a focus on performance, and a structure that is easy to maintain and extend.',
          keywords: [
            'Frontend',
            'React',
            'TypeScript',
            'Performance',
            'Responsive',
            'CMS',
            'API',
            'Accessibility',
          ],
          imageSrc: '/cases/nordwear/mobile.webp',
          imageAlt: 'Development of a tailored website',
        },
        {
          title: 'Testing and launch',
          description:
            'Before go-live we review everything across devices and browsers. Then we launch and ensure a stable transition to the new solution.',
          keywords: ['QA', 'SEO', 'Go-live', 'Tracking', 'Browser testing', 'Performance testing'],
          imageSrc: '/cases/fresh-cut/mobile2.webp',
          imageAlt: 'Testing and launch of a website',
        },
      ],
    },
    faq: {
      eyebrow: 'See the questions we get most often',
      title: 'Frequently asked questions',
      items: [
        {
          question: 'How much does a website cost?',
          answer:
            'The price depends on scope, functionality, and design. We always start with a short conversation about your needs so you get a clear quote without hidden costs.',
        },
        {
          question: 'How long does it take to build a new website?',
          answer:
            'Most projects take between 4 and 10 weeks from kickoff to launch. The timeline depends on content, feedback, and how many pages and features the solution needs.',
        },
        {
          question: 'Can you help with both design and development?',
          answer:
            'Yes. We handle the full process from first idea and visual direction to coding, testing, and launch — so you get one cohesive solution and one point of contact.',
        },
        {
          question: 'What happens after launch?',
          answer:
            'We offer ongoing maintenance, updates, and further development. Many of our clients choose a partnership after launch so the website keeps performing and evolving.',
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
