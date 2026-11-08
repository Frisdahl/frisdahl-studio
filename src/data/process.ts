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
} as const satisfies Record<Locale, ProcessStep[]>

const processPageContent = {
  da: {
    eyebrow: 'Min proces',
    title: 'Struktureret samarbejde — fra idé til lancering',
    description:
      'Jeg arbejder tæt sammen med dig gennem hele forløbet, så du altid ved, hvor projektet står, og hvad der sker næste skridt. Hvert trin er tydeligt defineret med fokus på fremdrift, feedback og kvalitet.',
    steps: processSteps.da,
  },
} as const satisfies Record<Locale, ProcessPageContent>

export function getProcessPageContent(locale: Locale = defaultLocale): ProcessPageContent {
  return processPageContent[locale]
}

export function getSharedProcessSteps(locale: Locale = defaultLocale): ProcessStep[] {
  return [...processSteps[locale]]
}
