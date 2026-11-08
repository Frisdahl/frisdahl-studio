import type { MeetUsPageContent } from '../types/meetUs'
import type { Locale } from './navigation'
import { defaultLocale } from './navigation'

const meetUsPageContent = {
  da: {
    eyebrow: 'Mød mig',
    title: 'Jeg bygger din næste digitale løsning',
    members: [
      {
        name: 'Alexander Frisdahl',
        title: 'Founder & Udvikler',
        imageSrc: '/images/team/alexander-portrait.webp',
        imageAlt: 'Portræt af Alexander Frisdahl',
        bioLabel: 'Erfaring',
        bio: 'Jeg har designet og bygget websites og digitale produkter i flere år – fra første idé og strategi over design og kode til lancering. Du arbejder direkte med mig hele vejen.',
      },
    ],
  },
} as const satisfies Record<Locale, MeetUsPageContent>

export function getMeetUsPageContent(locale: Locale = defaultLocale): MeetUsPageContent {
  return meetUsPageContent[locale]
}
