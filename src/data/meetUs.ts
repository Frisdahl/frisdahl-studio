import type { MeetUsPageContent } from '../types/meetUs'
import type { Locale } from './navigation'
import { defaultLocale } from './navigation'

const meetUsPageContent = {
  da: {
    eyebrow: 'Mød teamet bag Frisdahl Studio',
    title: 'De mennesker, der bygger jeres næste digitale løsning',
    members: [
      {
        name: 'Alexander Frisdahl',
        title: 'Founder & Udvikler',
        imageSrc: '/images/team/alexander-portrait.webp',
        imageAlt: 'Portræt af Alexander Frisdahl',
      },
      {
        name: 'Emma Nielsen',
        title: 'Art Director',
        imageSrc: null,
        imageAlt: 'Portræt af Emma Nielsen',
      },
      {
        name: 'Jonas Holm',
        title: 'Strategi & Koncept',
        imageSrc: null,
        imageAlt: 'Portræt af Jonas Holm',
      },
    ],
  },
  en: {
    eyebrow: 'Meet the Frisdahl Studio team',
    title: 'The people building your next digital solution',
    members: [
      {
        name: 'Alexander Frisdahl',
        title: 'Founder & Developer',
        imageSrc: '/images/team/alexander-portrait.webp',
        imageAlt: 'Portrait of Alexander Frisdahl',
      },
      {
        name: 'Emma Nielsen',
        title: 'Art Director',
        imageSrc: null,
        imageAlt: 'Portrait of Emma Nielsen',
      },
      {
        name: 'Jonas Holm',
        title: 'Strategy & Concept',
        imageSrc: null,
        imageAlt: 'Portrait of Jonas Holm',
      },
    ],
  },
} as const satisfies Record<Locale, MeetUsPageContent>

export function getMeetUsPageContent(locale: Locale = defaultLocale): MeetUsPageContent {
  return meetUsPageContent[locale]
}
