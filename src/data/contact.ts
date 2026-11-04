import type { Locale } from './navigation'
import { defaultLocale } from './navigation'

/** The contact page: the two-line heading and the form copy of its own. The
 *  other field labels are shared with the drawer form copy in home.ts. */
const contactPageContent = {
  da: {
    headingLine1: 'Lad os skabe',
    headingLine2: 'noget smukt.',
    sourceLabel: 'Hvordan fandt du min hjemmeside?',
    sourcePlaceholder: 'Hvilken lille fugl fortalte mig',
    sourceMailLabel: 'Fandt siden via',
    messageLabel: 'Besked*',
    requiredNote: 'Alle felter markeret med * er nødvendige',
    submit: 'Send besked',
    // The form has no backend yet: sending opens the visitor's mail app.
    sent: 'Tak! Din mail-app åbner med beskeden klar til at sende.',
    mailSubject: 'Ny henvendelse fra',
  },
  en: {
    headingLine1: "Let's create",
    headingLine2: 'something beautiful.',
    sourceLabel: 'How did you find my website?',
    sourcePlaceholder: 'Which little bird told you',
    sourceMailLabel: 'Found the site via',
    messageLabel: 'Message*',
    requiredNote: 'All fields marked with * are required',
    submit: 'Send message',
    sent: 'Thank you! Your mail app opens with the message ready to send.',
    mailSubject: 'New enquiry from',
  },
} as const

export type ContactPageContent = (typeof contactPageContent)[Locale]

export function getContactPageContent(locale: Locale = defaultLocale): ContactPageContent {
  return contactPageContent[locale]
}
