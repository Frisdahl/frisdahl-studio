import type { ProcessPageContent, ProcessStep } from '../types/process'
import type { Locale } from './navigation'
import { defaultLocale } from './navigation'

const processSteps = {
  da: [
    {
      title: 'Opdagelse og strategi',
      description:
        'Jeg starter med at forstå din virksomhed, målgruppe og ambitioner. Her definerer vi sammen scope, prioriteringer og en klar retning for projektet.',
      keywords: ['Brief', 'Målgruppe', 'Scope', 'Roadmap', 'Konkurrentanalyse', 'Mål'],
    },
    {
      title: 'Design og prototyp',
      description:
        'Jeg omsætter strategien til et stærkt visuelt udtryk med wireframes, UI-design og en klikbar prototype, så du kan se løsningen, før den bygges.',
      keywords: ['Wireframes', 'UI-design', 'Prototype', 'Branding', 'Designsystem', 'UX'],
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
    },
    {
      title: 'Test og lancering',
      description:
        'Før go-live gennemgår jeg alt grundigt på tværs af enheder og browsere. Derefter lancerer jeg og sikrer en stabil overgang til den nye løsning.',
      keywords: ['QA', 'SEO', 'Go-live', 'Tracking', 'Browser-test', 'Performance-test'],
    },
  ],
  en: [
    {
      title: 'Discovery and strategy',
      description:
        'I start by understanding your business, audience and ambitions. Together we define scope, priorities and a clear direction for the project.',
      keywords: ['Brief', 'Audience', 'Scope', 'Roadmap', 'Competitor review', 'Goals'],
    },
    {
      title: 'Design and prototype',
      description:
        'I translate the strategy into a strong visual direction with wireframes, UI design and a clickable prototype, so you can see the solution before it is built.',
      keywords: ['Wireframes', 'UI design', 'Prototype', 'Branding', 'Design system', 'UX'],
    },
    {
      title: 'Development',
      description:
        'I build the solution from scratch with modern technology, a focus on performance and a structure that is easy to maintain and extend.',
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
        'Before go-live I review everything across devices and browsers. Then I launch and make sure the transition to the new solution is stable.',
      keywords: ['QA', 'SEO', 'Go-live', 'Tracking', 'Browser testing', 'Performance testing'],
    },
  ],
} as const satisfies Record<Locale, ProcessStep[]>

const processPageContent = {
  da: {
    eyebrow: 'Min proces',
    title: 'Struktureret samarbejde — fra idé til lancering',
    description:
      'Jeg arbejder tæt sammen med dig gennem hele forløbet, så du altid ved, hvor projektet står, og hvad der sker næste skridt. Hvert trin er tydeligt defineret med fokus på fremdrift, feedback og kvalitet.',
    steps: processSteps.da,
  },
  en: {
    eyebrow: 'My process',
    title: 'Structured collaboration — from idea to launch',
    description:
      'I work closely with you throughout the journey, so you always know where the project stands and what happens next. Each step is clearly defined with a focus on momentum, feedback and quality.',
    steps: processSteps.en,
  },
} as const satisfies Record<Locale, ProcessPageContent>

export function getProcessPageContent(locale: Locale = defaultLocale): ProcessPageContent {
  return processPageContent[locale]
}

export function getSharedProcessSteps(locale: Locale = defaultLocale): ProcessStep[] {
  return [...processSteps[locale]]
}
