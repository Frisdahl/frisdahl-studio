import type { ProcessPageContent, ProcessStep } from '../types/process'
import type { Locale } from './navigation'
import { defaultLocale } from './navigation'

const processSteps = {
  da: [
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
  en: [
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
} as const satisfies Record<Locale, ProcessStep[]>

const processPageContent = {
  da: {
    eyebrow: 'Vores proces',
    title: 'Struktureret samarbejde — fra idé til lancering',
    description:
      'Vi arbejder tæt sammen med dig gennem hele forløbet, så du altid ved, hvor vi er, og hvad der sker næste skridt. Hvert trin er tydeligt defineret med fokus på fremdrift, feedback og kvalitet.',
    steps: processSteps.da,
  },
  en: {
    eyebrow: 'Our process',
    title: 'Structured collaboration — from idea to launch',
    description:
      'We work closely with you throughout the journey, so you always know where we are and what happens next. Each step is clearly defined with a focus on momentum, feedback, and quality.',
    steps: processSteps.en,
  },
} as const satisfies Record<Locale, ProcessPageContent>

export function getProcessPageContent(locale: Locale = defaultLocale): ProcessPageContent {
  return processPageContent[locale]
}

export function getSharedProcessSteps(locale: Locale = defaultLocale): ProcessStep[] {
  return [...processSteps[locale]]
}
