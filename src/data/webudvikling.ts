import type { FaqContent } from '../types/faq'
import type { SplitPanelContent } from '../types/splitPanel'
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
} as const satisfies Record<Locale, { splitPanel: SplitPanelContent; faq: FaqContent }>

export function getWebudviklingContent(locale: Locale = defaultLocale) {
  return webudviklingContent[locale]
}
