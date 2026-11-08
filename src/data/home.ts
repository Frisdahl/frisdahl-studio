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
          id: 'peter-salling',
          client: "Peter Salling",
          keywords: "Website • Design • CMS",
          href: '/cases/peter-salling',
          imageSrc: "/cases/peter-salling/main-higgs--16-9.webp",
          imageAlt: "Peter Salling case",
        },
        {
          id: 'nordwear',
          client: "Nordwear",
          keywords: "E-commerce • Design • Udvikling",
          href: '/cases/nordwear',
          imageSrc: "/cases/nordwear/main-higgs--16-9.webp",
          imageAlt: "Nordwear case",
        },
        {
          id: 'fresh-cut',
          client: "Fresh Cut",
          keywords: "Website • Branding • Booking",
          href: '/cases/fresh-cut',
          imageSrc: "/cases/fresh-cut/official--16-9.webp",
          imageAlt: "Fresh Cut case",
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
      eyebrow: "Hvad jeg kan tilbyde jeres virksomhed",
      // The images are placeholders from existing case material.
      items: [
        {
          title: "Brand strategi",
          text: "Jeg hjælper jer med at definere, hvem I er, hvem I taler til, og hvad der adskiller jer fra konkurrenterne. Strategien bliver kompasset for alle de valg, der følger.",
          imageSrc: "/images/pricing/digital-strategy.webp",
          imageAlt: "Strategiarbejde på skærm",
        },
        {
          title: "Brand identitet",
          text: "Logo, farver, typografi og et visuelt sprog, der føles som jer – samlet i et system, der fungerer lige godt på skærm, i tryk og på sociale medier.",
          imageSrc: "/cases/visuel-atelier/hero.webp",
          imageAlt: "Visuel identitet for Visuel Atelier",
        },
        {
          title: "Brand præsentation",
          text: "Jeg sørger for, at jeres brand fremstår skarpt overalt – fra præsentationer og salgsmaterialer til de første indtryk, kunderne møder.",
          imageSrc: "/cases/nordwear/production.webp",
          imageAlt: "Nordwear præsenteret på en bærbar computer",
        },
        {
          title: "Hjemmeside design",
          text: "Gennemarbejdet design med fokus på brugeroplevelse og konvertering, hvor hver side guider den besøgende videre mod næste skridt.",
          imageSrc: "/cases/nordwear/category.webp",
          imageAlt: "Nordwear kategoriside",
        },
        {
          title: "Hjemmeside udvikling",
          text: "Hurtige, tilgængelige og skalerbare hjemmesider, bygget med moderne teknologi og nemme at vedligeholde, i takt med at jeres virksomhed vokser.",
          imageSrc: "/images/webudvikling/webudvikling-split.webp",
          imageAlt: "Hjemmeside under udvikling",
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
    process: {
      eyebrow: "Proces",
      title: "Struktureret samarbejde \u2014 fra id\u00e9 til lancering",
      description:
        "Jeg arbejder tæt sammen med dig gennem hele forløbet, så du altid ved, hvor projektet står, og hvad der sker næste skridt.",
      steps: [
        {
          number: "01",
          title: "Indsigt & strategi",
          description:
            "Jeg starter med at forstå din virksomhed, målgruppe og mål.",
        },
        {
          number: "02",
          title: "Design & udvikling",
          description:
            "Visuelle koncepter og robust kode \u2014 testet og finpudset.",
        },
        {
          number: "03",
          title: "Lancering & support",
          description:
            "Jeg sørger for en smooth go-live og er klar, når du har brug for mig.",
        },
      ],
    },
    pricing: {
      eyebrow: "Ikke bare en template",
      title: "Høj performance med lavere risiko og hurtig time-to-market",
      description:
        "Du får et unikt website, der performer hurtigere og mere sikkert, fordi jeg bygger det på gennemtestede komponenter. Det gør, at jeg kan fokusere på det, der skaber forretningsværdi – f.eks. forretningskritiske funktioner og din visuelle identitet.",
      sliderAriaLabel: "Priseksempler",
      sliderPrev: "Forrige",
      sliderNext: "N\u00e6ste",
      sliderStatus: "Billede {current} af {total}",
      slides: [
        { imageSrc: '/cases/nordwear/mobile2--16-10.jpg', imageAlt: 'Nordwear hjemmeside' },
        { imageSrc: '/cases/fresh-cut/mobile1--16-10.jpg', imageAlt: 'Fresh Cut hjemmeside' },
        { imageSrc: '/cases/fresh-cut/mobile2--16-10.jpg', imageAlt: 'Fresh Cut hjemmeside' },
        { imageSrc: '/cases/visuel-atelier/hero--16-10.jpg', imageAlt: 'Visuel Atelier hjemmeside' },
      ],
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
    pricingPage: {
      hero: {
        eyebrow: "Priser",
        headlineLine1: "Find den løsning,",
        headlineLine2: "der passer til dig",
        description:
          "Tre former for samarbejde, alt skr\u00e6ddersyet kodet og motion-drevet. Prisen kommer på bordet i det første møde, så jeg kan tilpasse den til det, du faktisk skal bygge.",
        ctaPrimary: "Start dit projekt",
        ctaSecondary: "Se priser",
        imageSrc: "/images/pricing/digital-strategy.webp",
        imageAlt: "Digital strategi illustration",
      },
      examplesIntro: {
        title: "Tre m\u00e5der at samarbejde p\u00e5",
        subtitle:
          "Alle l\u00f8sninger er skr\u00e6ddersyet kodet fra bunden med fokus p\u00e5 performance, motion og brand. Den rigtige model finder vi sammen i første samtale.",
      },
      plans: {
        items: [
          {
            id: "kickstart",
            eyebrow: "Hjemmeside",
            title: "Per projekt",
            cta: "Start et projekt",
            ctaAction: "book",
            featured: false,
            features: [
              "Skr\u00e6ddersyet frontend fra bunden",
              "Motion og animation integreret i oplevelsen",
              "Brand og identitet b\u00e6res gennem alle breakpoints",
              "CMS-ops\u00e6tning og indholdsstruktur",
              "Performance og Core Web Vitals ved lancering",
            ],
          },
          {
            id: "business",
            eyebrow: "V\u00e6kst",
            title: "Per scope",
            cta: "Start et projekt",
            ctaAction: "book",
            featured: true,
            features: [
              "Alt fra Per projekt",
              "Visuel identitet og designretning",
              "Motion-sprog og interaktionsdesign",
              "Typografi og designsystem som fundament",
              "Konverteringsfokus og SEO-struktur",
            ],
          },
          {
            id: "custom",
            eyebrow: "Skr\u00e6ddersyet",
            title: "Per engagement",
            cta: "Kontakt mig",
            ctaAction: "contact",
            featured: false,
            features: [
              "Specialudviklede funktioner og flows",
              "Webshop, booking eller medlemssystem",
              "API-integrationer og kundelogin",
              "Typisk 6\u201312 uger per overflade",
            ],
          },
        ],
      },
    },
  },
} as const;

export type HomeContent = (typeof homeContent)[Locale];

export function getHomeContent(locale: Locale = defaultLocale): HomeContent {
  return homeContent[locale];
}
