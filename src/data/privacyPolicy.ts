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
  en: {
    eyebrow: 'Legal',
    title: 'Privacy policy',
    lastUpdatedLabel: 'Last updated',
    lastUpdated: '2 July 2026',
    intro:
      'Frisdahl Studio respects your privacy. This privacy policy explains how we collect, process and protect personal data when you visit our website, contact us or work with us.',
    sections: [
      {
        title: 'Data controller',
        blocks: [
          {
            type: 'paragraph',
            text: 'Frisdahl Studio is the data controller for personal data we receive through our website and in connection with our work.',
          },
          {
            type: 'paragraph',
            text: 'If you have questions about how we process personal data, you can contact us at hello@frisdahlstudio.dk.',
          },
        ],
      },
      {
        title: 'What information do we collect?',
        blocks: [
          {
            type: 'paragraph',
            text: 'We only collect information that is relevant for communicating with you and delivering our services. This may include:',
          },
          {
            type: 'bullets',
            items: [
              'Contact details such as name, email, phone number and company',
              'Information you submit through contact forms, email or booking',
              'Technical data such as IP address, browser, device type and website usage',
              'Cookie and analytics data when you have given consent',
            ],
          },
        ],
      },
      {
        title: 'Purpose and legal basis',
        blocks: [
          {
            type: 'paragraph',
            text: 'We process personal data for the following purposes:',
          },
          {
            type: 'bullets',
            items: [
              'Responding to enquiries and discussing projects',
              'Planning and conducting meetings and collaborations',
              'Delivering, maintaining and improving our website and services',
              'Complying with applicable law and documenting agreements',
            ],
          },
          {
            type: 'paragraph',
            text: 'Processing is based on consent, contract performance, legitimate interests or legal obligation depending on the situation.',
          },
        ],
      },
      {
        title: 'Cookies and analytics',
        blocks: [
          {
            type: 'paragraph',
            text: 'We use cookies and similar technologies to ensure basic functionality and, where relevant, to understand how the website is used.',
          },
          {
            type: 'paragraph',
            text: 'You can change or withdraw your consent at any time through your browser settings or the cookie settings on the website.',
          },
        ],
      },
      {
        title: 'Recipients and transfers',
        blocks: [
          {
            type: 'paragraph',
            text: 'We only share personal data with trusted processors that help us operate the website, communication, booking and analytics. This may include hosting, email and analytics providers.',
          },
          {
            type: 'paragraph',
            text: 'As a general rule, we do not transfer personal data outside the EU/EEA unless a valid transfer basis exists.',
          },
        ],
      },
      {
        title: 'Retention',
        blocks: [
          {
            type: 'paragraph',
            text: 'We retain personal data for as long as necessary for the purpose it was collected and in accordance with applicable law.',
          },
          {
            type: 'paragraph',
            text: 'Enquiries without an established collaboration are typically deleted when the dialogue ends, unless there is a legitimate need to retain them longer.',
          },
        ],
      },
      {
        title: 'Your rights',
        blocks: [
          {
            type: 'paragraph',
            text: 'Under the GDPR, you have the right to:',
          },
          {
            type: 'bullets',
            items: [
              'Access the information we process about you',
              'Have inaccurate information corrected',
              'Have information deleted when the conditions are met',
              'Restrict or object to processing',
              'Receive information in a structured, commonly used format',
              'Withdraw consent where processing is based on consent',
            ],
          },
          {
            type: 'paragraph',
            text: 'You may also lodge a complaint with the Danish Data Protection Agency if you believe we process your data unlawfully.',
          },
        ],
      },
      {
        title: 'Security',
        blocks: [
          {
            type: 'paragraph',
            text: 'We protect personal data through technical and organisational measures, including access control, encryption where relevant and limited internal access.',
          },
          {
            type: 'paragraph',
            text: 'No method of data transmission or storage can be guaranteed 100% secure, but we continuously work to reduce risk.',
          },
        ],
      },
    ],
  },
} as const satisfies Record<Locale, PrivacyPolicyPageContent>

export function getPrivacyPolicyPageContent(locale: Locale = defaultLocale): PrivacyPolicyPageContent {
  return privacyPolicyContent[locale]
}
