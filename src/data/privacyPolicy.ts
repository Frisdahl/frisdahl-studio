import type { PrivacyPolicyPageContent } from '../types/privacyPolicy'
import type { Locale } from './navigation'
import { defaultLocale } from './navigation'

const privacyPolicyContent = {
  da: {
    eyebrow: 'Juridisk',
    title: 'Datapolitik',
    lastUpdatedLabel: 'Sidst opdateret',
    lastUpdated: '2. juli 2026',
    intro:
      'Frisdahl Studio respekterer dit privatliv. Denne datapolitik beskriver, hvordan vi indsamler, behandler og beskytter personoplysninger, når du besøger vores website, kontakter os eller samarbejder med os.',
    sections: [
      {
        title: 'Dataansvarlig',
        blocks: [
          {
            type: 'paragraph',
            text: 'Frisdahl Studio er dataansvarlig for behandlingen af de personoplysninger, vi modtager via vores website og i forbindelse med vores samarbejde.',
          },
          {
            type: 'paragraph',
            text: 'Har du spørgsmål til vores behandling af personoplysninger, kan du kontakte os på hello@frisdahlstudio.dk.',
          },
        ],
      },
      {
        title: 'Hvilke oplysninger indsamler vi?',
        blocks: [
          {
            type: 'paragraph',
            text: 'Vi indsamler kun oplysninger, der er relevante for at kunne kommunikere med dig og levere vores ydelser. Det kan omfatte:',
          },
          {
            type: 'bullets',
            items: [
              'Kontaktoplysninger som navn, e-mail, telefonnummer og virksomhed',
              'Oplysninger, du sender via kontaktformular, e-mail eller booking',
              'Tekniske data som IP-adresse, browser, enhedstype og besøgsadfærd på websitet',
              'Cookie- og analyseoplysninger, når du har givet samtykke',
            ],
          },
        ],
      },
      {
        title: 'Formål og retsgrundlag',
        blocks: [
          {
            type: 'paragraph',
            text: 'Vi behandler personoplysninger til følgende formål:',
          },
          {
            type: 'bullets',
            items: [
              'At besvare henvendelser og føre dialog om projekter',
              'At planlægge og gennemføre møder og samarbejder',
              'At levere, administrere og forbedre vores website og ydelser',
              'At overholde gældende lovgivning og dokumentere aftaler',
            ],
          },
          {
            type: 'paragraph',
            text: 'Behandlingen sker på baggrund af samtykke, opfyldelse af aftale, legitime interesser eller retlig forpligtelse afhængigt af situationen.',
          },
        ],
      },
      {
        title: 'Cookies og analyse',
        blocks: [
          {
            type: 'paragraph',
            text: 'Vi bruger cookies og lignende teknologier til at sikre grundlæggende funktionalitet og, hvor det er relevant, til at forstå, hvordan websitet anvendes.',
          },
          {
            type: 'paragraph',
            text: 'Du kan til enhver tid ændre eller trække dit samtykke tilbage via dine browserindstillinger eller cookieindstillinger på websitet.',
          },
        ],
      },
      {
        title: 'Datamodtagere og overførsel',
        blocks: [
          {
            type: 'paragraph',
            text: 'Vi deler kun personoplysninger med betroede databehandlere, der hjælper os med drift af website, kommunikation, booking og analyse. Det kan fx være hosting-, e-mail- og analyseleverandører.',
          },
          {
            type: 'paragraph',
            text: 'Vi overfører som udgangspunkt ikke personoplysninger uden for EU/EØS, medmindre der er et gyldigt overførselsgrundlag.',
          },
        ],
      },
      {
        title: 'Opbevaring',
        blocks: [
          {
            type: 'paragraph',
            text: 'Vi opbevarer personoplysninger, så længe det er nødvendigt for det formål, de er indsamlet til, og i overensstemmelse med gældende lovgivning.',
          },
          {
            type: 'paragraph',
            text: 'Henvendelser uden etableret samarbejde slettes typisk, når dialogen afsluttes, medmindre der er et sagligt behov for at bevare dem længere.',
          },
        ],
      },
      {
        title: 'Dine rettigheder',
        blocks: [
          {
            type: 'paragraph',
            text: 'Du har efter GDPR ret til at:',
          },
          {
            type: 'bullets',
            items: [
              'Få indsigt i de oplysninger, vi behandler om dig',
              'Få urigtige oplysninger rettet',
              'Få oplysninger slettet, når betingelserne er opfyldt',
              'Begrænse eller gøre indsigelse mod behandling',
              'Modtage oplysninger i et struktureret, almindeligt anvendt format',
              'Trække samtykke tilbage, hvor behandlingen bygger på samtykke',
            ],
          },
          {
            type: 'paragraph',
            text: 'Du kan også klage til Datatilsynet, hvis du mener, at vi behandler dine oplysninger i strid med reglerne.',
          },
        ],
      },
      {
        title: 'Sikkerhed',
        blocks: [
          {
            type: 'paragraph',
            text: 'Vi beskytter personoplysninger gennem tekniske og organisatoriske foranstaltninger, herunder adgangsstyring, kryptering hvor relevant og begrænset adgang internt.',
          },
          {
            type: 'paragraph',
            text: 'Ingen metoder til dataoverførsel eller -lagring kan garanteres 100 % sikre, men vi arbejder løbende på at reducere risici.',
          },
        ],
      },
    ],
  },
} as const satisfies Record<Locale, PrivacyPolicyPageContent>

export function getPrivacyPolicyPageContent(locale: Locale = defaultLocale): PrivacyPolicyPageContent {
  return privacyPolicyContent[locale]
}
