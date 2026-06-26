import type { FaqContent } from '../types/faq'
import type { ProcessContent } from '../types/process'
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
      eyebrow: 'Følg tæt på vores arbejdsflow',
      title: 'Sådan arbejder vi',
      steps: [
        {
          title: 'Opdagelse og strategi',
          description:
            'Vi starter med at forstå jeres virksomhed, målgruppe og ambitioner. Her definerer vi scope, prioriteringer og en klar retning for projektet.',
          keywords: ['Brief', 'Målgruppe', 'Scope', 'Roadmap', 'Konkurrentanalyse', 'Mål'],
        },
        {
          title: 'Design og prototyp',
          description:
            'Vi omsætter strategien til et stærkt visuelt udtryk med wireframes, UI-design og en klikbar prototype, så I kan se løsningen, før den bygges.',
          keywords: ['Wireframes', 'UI-design', 'Prototype', 'Branding', 'Designsystem', 'UX'],
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
        },
        {
          title: 'Test og lancering',
          description:
            'Før go-live gennemgår vi alt grundigt på tværs af enheder og browsere. Derefter lancerer vi og sikrer en stabil overgang til den nye løsning.',
          keywords: ['QA', 'SEO', 'Go-live', 'Tracking', 'Browser-test', 'Performance-test'],
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
      eyebrow: 'Follow our workflow closely',
      title: 'How we work',
      steps: [
        {
          title: 'Discovery and strategy',
          description:
            'We start by understanding your business, audience, and ambitions. Here we define scope, priorities, and a clear direction for the project.',
          keywords: ['Brief', 'Audience', 'Scope', 'Roadmap', 'Competitor review', 'Goals'],
        },
        {
          title: 'Design and prototype',
          description:
            'We translate strategy into a strong visual direction with wireframes, UI design, and a clickable prototype so you can see the solution before it is built.',
          keywords: ['Wireframes', 'UI design', 'Prototype', 'Branding', 'Design system', 'UX'],
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
        },
        {
          title: 'Testing and launch',
          description:
            'Before go-live we review everything across devices and browsers. Then we launch and ensure a stable transition to the new solution.',
          keywords: ['QA', 'SEO', 'Go-live', 'Tracking', 'Browser testing', 'Performance testing'],
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
    process: ProcessContent
    faq: FaqContent
  }
>

export function getWebudviklingContent(locale: Locale = defaultLocale) {
  return webudviklingContent[locale]
}
