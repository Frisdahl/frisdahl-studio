import type { Locale } from "./navigation";
import { defaultLocale } from "./navigation";
import { PRIVACY_POLICY_PATH } from "../lib/routes";

const homeContent = {
  da: {
    hero: {
      eyebrow: "DESIGN & UDVIKLING",
      headlineLine1: "Digitale l\u00f8sninger,",
      headlineLine2: "der skaber resultater",
      description:
        "Jeg hj\u00e6lper virksomheder med moderne hjemmesider, grafisk design og skr\u00e6ddersyede digitale l\u00f8sninger. Alt bliver kodet fra bunden med fokus på performance, brugeroplevelse og et design, der styrker din virksomhed.",
      ctaPrimary: "Start dit projekt",
      ctaSecondary: "Se cases",
      muteOn: "Sl\u00e5 lyd til",
      muteOff: "Sl\u00e5 lyd fra",
    },
    cases: {
      ariaLabel: "Udvalgte cases",
      // Intro above the projects; the name links to the meet-me page.
      intro: {
        // The small heading of the statement section: ( Frisdahl Studio ).
        label: "Frisdahl Studio",
        title: "Et lille studio med store ambitioner og en klar vision for godt design",
        textBefore: "Jeg hedder ",
        name: "Alexander",
        textAfter: ", og jeg står bag Frisdahl Studio – et selvstændigt studio med fokus på webdesign og webudvikling.",
        // A new paragraph: who I am above, what I do below.
        textMore:
          "Jeg hjælper virksomheder med at omsætte idéer til gennemtænkte digitale løsninger. Fra den første idé og visuelle retning til design, udvikling og lancering skaber jeg hjemmesider og webshops, hvor æstetik, funktionalitet og performance går hånd i hånd. Du arbejder direkte med mig gennem hele processen – fra start til slut.",
      },
      listTitle: "Seneste projekter",
      linkLabel: "Se projekt",
      items: [
        {
          id: 'offscript',
          client: "OFFSCRIPT®",
          keywords: "Website • Design",
          // No project page yet: the card is not a link.
          href: '',
          imageSrc: "/cases/offscript/mockup--4-3.webp",
          // Where the picture is centred in a portrait card: on the phone.
          focus: "52.4% 50%",
          imageAlt: "OFFSCRIPT® på en iPhone",
        },
        {
          id: 'peter-salling',
          client: "Peter Salling",
          keywords: "Website • Design • CMS",
          href: '/cases/peter-salling',
          imageSrc: "/cases/peter-salling/main--16-9.webp",
          imageAlt: "Peter Salling case",
        },
        {
          id: 'nordwear',
          client: "Nordwear",
          keywords: "E-commerce • Design • Udvikling",
          href: '/cases/nordwear',
          imageSrc: "/cases/nordwear/main--16-9.webp",
          imageAlt: "Nordwear case",
        },
        {
          id: 'rethink-furniture',
          client: "Rethink Furniture",
          keywords: "Website • Design • Udvikling",
          // No project page yet: the card is not a link.
          href: '',
          imageSrc: "/cases/rethink-furniture/mockup--4-3.webp",
          // Where the picture is centred in a narrow card: on the iPad.
          focus: "52.7% 50%",
          imageAlt: "Rethink Furniture på en iPad Pro på en sten",
        },
        {
          id: 'det-kollektive-klaedeskab',
          client: "Det Kollektive Klædeskab",
          keywords: "Redesign • UX-design • Udvikling",
          href: '/cases/det-kollektive-klaedeskab',
          imageSrc: "/cases/det-kollektive-klaedeskab/official--16-9.webp",
          imageAlt: "Det Kollektive Klædeskab case",
        },
      ],
    },
    addedValue: {
      ariaLabel: "Hvad jeg kan tilbyde",
      heading: "Hvad jeg kan tilbyde jeres virksomhed",
      columns: [
        {
          title: "Brand identitet",
          icon: "brand",
          // DRAFT copy (written for the redesign, not from the old site): to be approved or rewritten.
          description:
            "Et visuelt sprog, der gør din virksomhed let at genkende: fra logo og farver til typografi og retningslinjer, der holder på tværs af alle flader.",
          items: ["Logo", "Farver og typografi", "Visuelt sprog", "Brand guidelines", "Præsentationer"],
        },
        {
          title: "Hjemmeside design",
          icon: "design",
          // DRAFT copy, see above.
          description:
            "Design, der gør det let at forstå, hvad du tilbyder: gennemtænkte brugerflader, et konsekvent designsystem og prototyper, du kan prøve, før noget bliver bygget.",
          items: ["UX / UI-design", "Designsystem", "Landingssider", "Webshops", "Prototyper"],
        },
        {
          title: "Hjemmeside udvikling",
          icon: "development",
          // DRAFT copy, see above.
          description:
            "Hjemmesider kodet fra bunden med fokus på hastighed og tilgængelighed og med et system, der er let at redigere, så siden bliver ved med at fungere, når din virksomhed vokser.",
          items: ["Hurtige hjemmesider", "Tilgængelighed", "CMS og redigering", "Animation", "Vedligeholdelse"],
        },
      ],
    },
    partnership: {
      eyebrow: "Et samarbejde, der r\u00e6kker l\u00e6ngere",
      title: "Jeg er med – også efter lanceringen",
      description:
        "En ny hjemmeside er kun begyndelsen. Jeg tror på langvarige samarbejder, hvor jeg løbende hjælper med vedligeholdelse, opdateringer og videreudvikling. På den måde sikrer jeg, at din hjemmeside fortsætter med at skabe værdi i takt med, at din virksomhed udvikler sig.",
      ctaLabel: "Har du spørgsmål, du vil stille mig?",
      ctaHref: "#contact",
      imageSrc: '/images/team/alexander-portrait.webp',
      imageAlt: 'Portræt af Alexander Frisdahl',
    },
    services: {
      eyebrow: "Ydelser",
      title:
        "Alt hvad du beh\u00f8ver for en st\u00e6rk digital tilstedev\u00e6relse",
      description:
        "Fra strategi til lancering – jeg leverer gennemarbejdede løsninger med høj kvalitet og tydelig kommunikation.",
      items: [
        {
          title: "Skr\u00e6ddersyede hjemmesider",
          description:
            "Unikke websites bygget fra bunden med moderne teknologi og skarp performance.",
        },
        {
          title: "Responsiv udvikling",
          description:
            "Flawless oplevelse p\u00e5 mobil, tablet og desktop \u2014 uden kompromis.",
        },
        {
          title: "Grafisk design",
          description:
            "Visuel identitet, UI-design og digitale assets der styrker dit brand.",
        },
        {
          title: "Vedligehold & optimering",
          description:
            "L\u00f8bende support, opdateringer og performance-forbedringer efter lancering.",
        },
      ],
    },
    portfolio: {
      eyebrow: "Portfolio",
      title: "Udvalgt arbejde",
      description:
        "Et udpluk af projekter, hvor design, kode og strategi spiller sammen.",
      items: [
        { title: "Studio Nord", tag: "Brand & website" },
        { title: "Form Arkitekter", tag: "Portfolio site" },
        { title: "Greenline", tag: "E-handel" },
      ],
      link: "Se hele portfolio",
    },
    contact: {
      eyebrow: "Tøv ikke – jeg er altid klar på en snak",
      title: "Lad os tage en snak om dit digitale projekt",
      description:
        "Lad os g\u00e5 i detaljer, s\u00e5 vi sammen kan finde l\u00f8sninger, der passer til dine behov.",
      ctaPrimary: "Kontakt mig",
      ctaSecondary: "Book et m\u00f8de",
      drawer: {
        writeEyebrow: "Skriv til mig",
        writeTitle: "F\u00f8rste skridt i din forretningsudvikling",
        writeDescription:
          "Fortæl mig kort om dit projekt, så vender jeg tilbage med en klar plan.",
        form: {
          nameLabel: "Navn*",
          companyLabel: "Virksomhed",
          emailLabel: "E-mail*",
          phoneLabel: "Tlf*",
          messageLabel: "Hvad kan jeg hjælpe dig med?*",
          privacy: {
            before: "Jeg accepterer Frisdahl Studio's ",
            cookieLabel: "cookie",
            cookieHref: "#cookiepolitik",
            between: " og ",
            policyLabel: "privatlivspolitik",
            policyHref: PRIVACY_POLICY_PATH,
            after: "*",
          },
          namePlaceholder: "Dit navn",
          companyPlaceholder: "Din virksomhed",
          emailPlaceholder: "din@email.dk",
          phonePlaceholder: "+45 00 00 00 00",
          messagePlaceholder: "Fortæl mig kort om dit projekt",
        },
        bookEyebrow: "Book m\u00f8de",
        bookTitle: "Hvorn\u00e5r passer det dig bedst at tage en snak?",
        whenLabel: "Hvorn\u00e5r?",
        dateLabel: "V\u00e6lg dato",
        timesLabel: "Ledige tider",
        back: "Tilbage",
        next: "N\u00e6ste",
        closeLabel: "Luk panel",
      },
    },
  },
} as const;

export type HomeContent = (typeof homeContent)[Locale];

export function getHomeContent(locale: Locale = defaultLocale): HomeContent {
  return homeContent[locale];
}
