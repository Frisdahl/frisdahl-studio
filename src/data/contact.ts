import type { Locale } from './navigation'
import { defaultLocale } from './navigation'

/** The contact page: the two-line heading and the form copy of its own. The
 *  other field labels are shared with the drawer form copy in home.ts. */
const contactPageContent = {
  da: {
    headingLine1: 'Lad os skabe',
    headingLine2: 'noget smukt',
    // The second line swaps between these (the first is the one that is read out).
    headingPhrases: ['noget smukt', 'noget unikt', 'noget bedre'],
    sourceLabel: 'Hvordan fandt du min hjemmeside?',
    sourcePlaceholder: 'Hvilken lille fugl fortalte mig',
    messageLabel: 'Besked*',
    requiredNote: 'Alle felter markeret med * er nødvendige',
    submit: 'Send besked',
    sending: 'Sender…',
    sent: 'Tak for din besked! Jeg vender tilbage hurtigst muligt.',
    error: 'Noget gik galt. Prøv igen, eller skriv direkte til hello@frisdahlstudio.dk.',
    toast: {
      close: 'Luk besked',
      errorLabel: 'Fejl',
      sendingLabel: 'Et øjeblik',
      sentLabel: 'Sendt',
      sendingTitle: 'Sender din besked',
      sentTitle: 'Besked sendt',
      errorTitle: 'Det lykkedes ikke',
      missingTitle: 'Tjek felterne',
      missingText: 'Navn, e-mail og besked skal udfyldes.',
      emailTitle: 'Tjek din e-mail',
      emailText: 'Adressen ser ikke helt rigtig ud. Prøv fx navn@mail.dk.',
    },
  },
} as const

export type ContactPageContent = (typeof contactPageContent)[Locale]

export function getContactPageContent(locale: Locale = defaultLocale): ContactPageContent {
  return contactPageContent[locale]
}
