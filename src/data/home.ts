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
          href: '/cases/offscript',
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
          imageSrc: "/cases/nordwear/main-v2--16-9.webp",
          imageAlt: "Nordwear case",
        },
        {
          id: 'rethink-furniture',
          client: "Rethink Furniture",
          keywords: "Website • Design • Udvikling",
          href: '/cases/rethink-furniture',
          imageSrc: "/cases/rethink-furniture/macbook-main--4-3.webp",
          // Where the picture is centred in a narrow card: on the MacBook (the clip is framed with the laptop in the middle).
          focus: "50% 50%",
          imageAlt: "Rethink Furniture på en MacBook Pro",
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
      ariaLabel: "Mit workflow",
      heading: "Mit workflow",
      columns: [
        {
          title: "Fra idé til lancering",
          icon: "development",
          description:
            "Hvert projekt følger samme forløb: brugerbehov og krav, wireframes og designsystem i Figma, komponentbaseret udvikling og test i rigtige browsere på alle skærmstørrelser, før noget går live.",
          items: ["Brugerbehov og krav", "Wireframes og prototyper", "Designsystem og tokens", "Responsive breakpoints", "Build og deploy til Cloudflare"],
        },
        {
          title: "Min AI-struktur",
          icon: "design",
          description:
            "Projektviden, designregler og beslutninger ligger i et versioneret vidensystem, som AI-agenterne læser, før de arbejder. Hver opgave får sin egen Git-gren og worktree, og et andet agent-gennemsyn fanger fejl, inden de når master.",
          items: ["Kontekst som kode", "Git worktrees og branches", "Agent-review", "Regelstyret AI", "Dokumenterede beslutninger"],
        },
        {
          title: "Værktøjer og AI-fluency",
          icon: "brand",
          description:
            "React, TypeScript og Tailwind i bunden. Claude er koblet direkte til mine værktøjer via MCP og plugins: Figma til design, en rigtig browser til test og Lighthouse til performance. Jeg specificerer, reviewer og verificerer, før jeg kalder noget færdigt.",
          items: ["React 19 og TypeScript", "Claude Code plugins og skills", "MCP: Figma og browser", "Chrome DevTools og Playwright", "WCAG og Lighthouse"],
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
