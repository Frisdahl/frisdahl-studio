import type { MeetUsPageContent } from '../types/meetUs'
import type { Locale } from './navigation'
import { defaultLocale } from './navigation'

const meetUsPageContent = {
  da: {
    title: 'Mød mig',
    intro: [
      'Jeg er webudvikler med en passion for at kombinere design, teknologi og kreativitet, og jeg er fascineret af, hvordan AI kan gøre mit arbejde bedre. Jeg bruger det som en fast del af min proces, fra idé og design til kode og test, men det er stadig mig, der træffer beslutningerne.',
      'Jeg bliver ved med at forbedre min opsætning: Claude Code med egne plugins og skills, MCP-forbindelser til Figma og browseren og faste tjek af tilgængelighed og performance. Det giver hurtigere iterationer og mere tid til de små detaljer i animationer og interaktioner, så design og funktionalitet fungerer naturligt sammen.',
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
