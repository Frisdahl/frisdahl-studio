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
        title: "Introduktion",
        textBefore: "Jeg hedder ",
        name: "Alexander",
        textAfter: ", og Frisdahl Studio er mit studie for webdesign og webudvikling.",
        // A new paragraph: who I am above, what I do below.
        textMore:
          "Jeg designer og bygger hjemmesider og webshops fra bunden – fra første idé og strategi over design og kode til lancering – med fokus på performance, brugeroplevelse og et udtryk, der styrker din virksomhed. Du arbejder direkte med mig hele vejen.",
      },
      listTitle: "Seneste projekter",
      linkLabel: "Se projekt",
      metaLabels: { role: "Rolle", technologies: "Teknologier", year: "År" },
      items: [
        {
          id: 'peter-salling',
          client: "Peter Salling",
          technologies: "React, TypeScript, Supabase",
          keywords: "Website • Design • CMS",
          href: '/cases/peter-salling',
          imageSrc: "/cases/peter-salling/official--16-9.webp",
          imageAlt: "Peter Salling case",
        },
        {
          id: 'nordwear',
          client: "Nordwear",
          technologies: "Shopify, Liquid, Figma",
          keywords: "E-commerce • Design • Udvikling",
          href: '/cases/nordwear',
          imageSrc: "/cases/nordwear/official--16-9.webp",
          imageAlt: "Nordwear case",
        },
        {
          id: 'fresh-cut',
          client: "Fresh Cut",
          technologies: "React, TypeScript, Tailwind CSS",
          keywords: "Website • Branding • Booking",
          href: '/cases/fresh-cut',
          imageSrc: "/cases/fresh-cut/thumbnail--16-9.jpg",
          imageAlt: "Fresh Cut case",
        },
        {
          id: 'det-kollektive-klaedeskab',
          client: "Det Kollektive Klædeskab",
          technologies: "React, Vite, Tailwind CSS",
          keywords: "Redesign • UX-design • Udvikling",
          href: '/cases/det-kollektive-klaedeskab',
          imageSrc: "/cases/det-kollektive-klaedeskab/forside--16-9.webp",
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
  en: {
    hero: {
      eyebrow: "DESIGN & DEVELOPMENT",
      headlineLine1: "Digital solutions,",
      headlineLine2: "that deliver results",
      description:
        "I help businesses with modern websites, strong visual identity, and digital experiences built properly from the start.",
      ctaPrimary: "Start your project",
      ctaSecondary: "View cases",
      muteOn: "Unmute video",
      muteOff: "Mute video",
    },
    cases: {
      ariaLabel: "Selected cases",
      intro: {
        title: "Introduction",
        textBefore: "My name is ",
        name: "Alexander",
        textAfter: ", and Frisdahl Studio is my studio for web design and development.",
        textMore:
          "I design and build websites and webshops from scratch – from first idea and strategy through design and code to launch – with a focus on performance, user experience and a look that strengthens your business. You work directly with me the whole way.",
      },
      listTitle: "Latest projects",
      linkLabel: "View project",
      metaLabels: { role: "Role", technologies: "Technologies", year: "Year" },
      items: [
        {
          id: 'peter-salling',
          client: "Peter Salling",
          technologies: "React, TypeScript, Supabase",
          keywords: "Website • Design • CMS",
          href: '/cases/peter-salling',
          imageSrc: "/cases/peter-salling/official--16-9.webp",
          imageAlt: "Peter Salling case",
        },
        {
          id: 'nordwear',
          client: "Nordwear",
          technologies: "Shopify, Liquid, Figma",
          keywords: "E-commerce • Design • Development",
          href: '/cases/nordwear',
          imageSrc: "/cases/nordwear/official--16-9.webp",
          imageAlt: "Nordwear case",
        },
        {
          id: 'fresh-cut',
          client: "Fresh Cut",
          technologies: "React, TypeScript, Tailwind CSS",
          keywords: "Website • Branding • Booking",
          href: '/cases/fresh-cut',
          imageSrc: "/cases/fresh-cut/thumbnail--16-9.jpg",
          imageAlt: "Fresh Cut case",
        },
        {
          id: 'det-kollektive-klaedeskab',
          client: "Det Kollektive Klædeskab",
          technologies: "React, Vite, Tailwind CSS",
          keywords: "Redesign • UX design • Development",
          href: '/cases/det-kollektive-klaedeskab',
          imageSrc: "/cases/det-kollektive-klaedeskab/forside--16-9.webp",
          imageAlt: "Det Kollektive Klædeskab case",
        },
      ],
    },
    addedValue: {
      ariaLabel: "What I can offer",
      eyebrow: "What I can offer your business",
      items: [
        {
          title: "Brand strategy",
          text: "I help you define who you are, who you speak to and what sets you apart from competitors. The strategy becomes the compass for every choice that follows.",
          imageSrc: "/images/pricing/digital-strategy.webp",
          imageAlt: "Strategy work on screen",
        },
        {
          title: "Brand identity",
          text: "Logo, colours, typography and a visual language that feels like you – brought together in a system that works on screen, in print and on social media.",
          imageSrc: "/cases/visuel-atelier/hero.webp",
          imageAlt: "Visual identity for Visuel Atelier",
        },
        {
          title: "Brand presentation",
          text: "I make sure your brand looks sharp everywhere – from presentations and sales material to the first impressions customers meet.",
          imageSrc: "/cases/nordwear/production.webp",
          imageAlt: "Nordwear shown on a laptop",
        },
        {
          title: "Website design",
          text: "Considered design focused on user experience and conversion, where every page guides visitors towards the next step.",
          imageSrc: "/cases/nordwear/category.webp",
          imageAlt: "Nordwear category page",
        },
        {
          title: "Website development",
          text: "Fast, accessible and scalable websites, built with modern technology and easy to maintain as your business grows.",
          imageSrc: "/images/webudvikling/webudvikling-split.webp",
          imageAlt: "Website in development",
        },
      ],
    },
    partnership: {
      eyebrow: "A partnership that goes further",
      title: "I'm with you – even after launch",
      description:
        "A new website is only the beginning. I believe in long-term partnerships where I continuously help with maintenance, updates and further development. That way I make sure your website keeps creating value as your business evolves.",
      ctaLabel: "Do you have questions for me?",
      ctaHref: "#contact",
      imageSrc: '/images/team/alexander-portrait.webp',
      imageAlt: 'Portrait of Alexander Frisdahl',
    },
    services: {
      eyebrow: "Services",
      title: "Everything you need for a strong digital presence",
      description:
        "From strategy to launch – I deliver polished solutions with high quality and clear communication.",
      items: [
        {
          title: "Custom websites",
          description:
            "Unique websites built from scratch with modern technology and sharp performance.",
        },
        {
          title: "Responsive development",
          description:
            "Flawless experience on mobile, tablet, and desktop — without compromise.",
        },
        {
          title: "Graphic design",
          description:
            "Visual identity, UI design, and digital assets that strengthen your brand.",
        },
        {
          title: "Maintenance & optimization",
          description:
            "Ongoing support, updates, and performance improvements after launch.",
        },
      ],
    },
    portfolio: {
      eyebrow: "Portfolio",
      title: "Selected work",
      description:
        "A selection of projects where design, code, and strategy work together.",
      items: [
        { title: "Studio Nord", tag: "Brand & website" },
        { title: "Form Architects", tag: "Portfolio site" },
        { title: "Greenline", tag: "E-commerce" },
      ],
      link: "View full portfolio",
    },
    process: {
      eyebrow: "Process",
      title: "Structured collaboration — from idea to launch",
      description:
        "I work closely with you throughout the journey, so you always know where the project stands and what happens next.",
      steps: [
        {
          number: "01",
          title: "Insight & strategy",
          description:
            "I start by understanding your business, audience and goals.",
        },
        {
          number: "02",
          title: "Design & development",
          description: "Visual concepts and robust code — tested and refined.",
        },
        {
          number: "03",
          title: "Launch & support",
          description:
            "I make sure the go-live is smooth and I'm ready when you need me.",
        },
      ],
    },
    pricing: {
      eyebrow: "Not just a template",
      title: "High performance with lower risk and faster time-to-market",
      description:
        "You get a unique website that performs faster and more securely because I build it on proven components. That lets me focus on what creates business value, such as business-critical features and your visual identity.",
      sliderAriaLabel: "Pricing examples",
      sliderPrev: "Previous",
      sliderNext: "Next",
      sliderStatus: "Image {current} of {total}",
      slides: [
        { imageSrc: '/cases/nordwear/mobile2--16-10.jpg', imageAlt: 'Nordwear website' },
        { imageSrc: '/cases/fresh-cut/mobile1--16-10.jpg', imageAlt: 'Fresh Cut website' },
        { imageSrc: '/cases/fresh-cut/mobile2--16-10.jpg', imageAlt: 'Fresh Cut website' },
        { imageSrc: '/cases/visuel-atelier/hero--16-10.jpg', imageAlt: 'Visuel Atelier website' },
      ],
    },
    contact: {
      eyebrow: "Don’t hesitate – I’m always up for a chat",
      title: "Let\u2019s talk about your digital project",
      description:
        "Let\u2019s get into the details, so together we can find solutions that fit your needs.",
      ctaPrimary: "Contact me",
      ctaSecondary: "Book a meeting",
      drawer: {
        writeEyebrow: "Write to me",
        writeTitle: "The first step in your business development",
        writeDescription:
          "Tell me briefly about your project and I will get back to you with a clear plan.",
        form: {
          nameLabel: "Name*",
          companyLabel: "Company",
          emailLabel: "Email*",
          phoneLabel: "Phone*",
          messageLabel: "What can I help you with?*",
          privacy: {
            before: "I accept Frisdahl Studio's ",
            cookieLabel: "cookie",
            cookieHref: "#cookie-policy",
            between: " and ",
            policyLabel: "privacy policy",
            policyHref: PRIVACY_POLICY_PATH,
            after: "*",
          },
          namePlaceholder: "Your name",
          companyPlaceholder: "Your company",
          emailPlaceholder: "you@email.com",
          phonePlaceholder: "+45 00 00 00 00",
          messagePlaceholder: "Tell me briefly about your project",
        },
        bookEyebrow: "Book a meeting",
        bookTitle: "When suits you best for a conversation?",
        whenLabel: "When?",
        dateLabel: "Choose a date",
        timesLabel: "Available times",
        back: "Back",
        next: "Next",
        closeLabel: "Close panel",
      },
    },
    pricingPage: {
      hero: {
        eyebrow: "Pricing",
        headlineLine1: "Find the plan",
        headlineLine2: "that fits your project",
        description:
          "Three shapes of engagement, all custom-coded and motion-led. Pricing comes up in the first call so I can match it to what you're actually building.",
        ctaPrimary: "Start your project",
        ctaSecondary: "See pricing",
        imageSrc: "/images/pricing/digital-strategy.webp",
        imageAlt: "Digital strategy illustration",
      },
      examplesIntro: {
        title: "Three ways to work together",
        subtitle:
          "Every solution is custom-coded from scratch with a focus on performance, motion and brand. We find the right model together in our first conversation.",
      },
      plans: {
        items: [
          {
            id: "kickstart",
            eyebrow: "Website",
            title: "By project",
            cta: "Start a project",
            ctaAction: "book",
            featured: false,
            features: [
              "Custom frontend build, end to end",
              "Motion design and animation system",
              "Brand identity carried through every breakpoint",
              "CMS setup and content modeling",
              "Performance and Core Web Vitals on launch day",
            ],
          },
          {
            id: "business",
            eyebrow: "Growth",
            title: "By scope",
            cta: "Start a project",
            ctaAction: "book",
            featured: true,
            features: [
              "Everything in By project",
              "Visual identity and design direction",
              "Motion language and interaction design",
              "Typography and design-system foundations",
              "Conversion focus and SEO structure",
            ],
          },
          {
            id: "custom",
            eyebrow: "Custom",
            title: "Per engagement",
            cta: "Contact me",
            ctaAction: "contact",
            featured: false,
            features: [
              "Custom features and user flows",
              "Webshop, booking or membership systems",
              "API integrations and customer login",
              "Typically 6\u201312 weeks per surface",
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
