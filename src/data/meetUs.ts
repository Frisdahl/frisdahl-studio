import type { MeetUsPageContent } from '../types/meetUs'
import type { Locale } from './navigation'
import { defaultLocale } from './navigation'

const meetUsPageContent = {
  da: {
    title: 'Mød mig',
    intro: [
      'Jeg er webudvikler med en passion for at kombinere design, teknologi og kreativitet. Jeg arbejder med både frontend og backend og nyder at skabe digitale løsninger, der forener stærkt visuelt design med funktionalitet og gode brugeroplevelser.',
      'Jeg er særligt interesseret i motion design, animationer og flydende interaktioner, hvor de små detaljer gør en forskel. Samtidig går jeg op i performance og den tekniske struktur bag løsningerne, så design og funktionalitet fungerer naturligt sammen.',
    ],
    topics: [
      {
        number: '01',
        title: 'Design',
        text: 'Jeg designer websites fra bunden, former deres visuelle identitet eller forfiner eksisterende løsninger, så udtrykket bliver tydeligt, sammenhængende og let at bruge.',
      },
      {
        number: '02',
        title: 'Webudvikling',
        text: 'Jeg udvikler websites på tværs af frontend og backend, fra animationer og interaktioner til databaser og API-integrationer, så løsningen både er hurtig, stabil og nem at arbejde videre med.',
      },
      {
        title: 'Bosat',
        kind: 'location',
      },
      {
        title: 'Sociale medier',
        kind: 'socials',
      },
      {
        title: 'Kontakt',
        kind: 'contact',
      },
    ],
    members: [
      {
        name: 'Alexander Frisdahl',
        imageSrc: '/images/team/alexander-portrait.webp',
        imageAlt: 'Portræt af Alexander Frisdahl',
      },
    ],
  },
} as const satisfies Record<Locale, MeetUsPageContent>

export function getMeetUsPageContent(locale: Locale = defaultLocale): MeetUsPageContent {
  return meetUsPageContent[locale]
}
