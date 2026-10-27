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
  en: {
    eyebrow: 'Meet me',
    title: 'I build your next digital solution',
    members: [
      {
        name: 'Alexander Frisdahl',
        title: 'Founder & Developer',
        imageSrc: '/images/team/alexander-portrait.webp',
        imageAlt: 'Portrait of Alexander Frisdahl',
        bioLabel: 'Experience',
        bio: "I have designed and built websites and digital products for several years – from first idea and strategy through design and code to launch. You work directly with me the whole way.",
      },
    ],
  },
} as const satisfies Record<Locale, MeetUsPageContent>

export function getMeetUsPageContent(locale: Locale = defaultLocale): MeetUsPageContent {
  return meetUsPageContent[locale]
}
