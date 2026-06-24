import type { Locale } from "./navigation";
import { defaultLocale } from "./navigation";

const homeContent = {
  da: {
    hero: {
      eyebrow: "FRISDAHL STUDIO",
      headlineLine1: "Digitale l\u00f8sninger,",
      headlineLine2: "der skaber resultater",
      description:
        "Jeg hj\u00e6lper virksomheder med moderne hjemmesider, grafisk design og skr\u00e6ddersyede digitale l\u00f8sninger. Alt bliver kodet fra bunden med fokus p\u00e5 performance, brugeroplevelse og et design, der styrker jeres virksomhed.",
      ctaPrimary: "Start et projekt",
      ctaSecondary: "Se portfolio",
      muteOn: "Sl\u00e5 lyd til",
      muteOff: "Sl\u00e5 lyd fra",
    },
    feature: {
      eyebrow: "Det får du med os som digitalt bureau",
      title: "En digital løsning, der passer til din forretning.",
      description:
        "Vi tror ikke på standardløsninger. Derfor designer og udvikler vi hver hjemmeside fra bunden med fokus på jeres virksomhed, målgruppe og ambitioner. Resultatet er en løsning, der både ser professionel ud, skaber tillid og er bygget til at holde.",
      linkLabel: "Lad os tage en snak",
      linkHref: "#contact",
      imageSrc: null,
      imageAlt: "Frisdahl Studio arbejde",
    },
    cases: {
      ariaLabel: "Udvalgte cases",
      eyebrow: "Cases",
      titleLine1: "Udviklet med fokus",
      titleLine2: "p\u00e5 kvalitet",
      ctaLabel: "Se alle cases",
      ctaHref: "/cases",
      items: [
        {
          client: "Nordwear",
          type: "Website",
          href: "#portfolio",
          imageSrc: "/cases/Nordwear-mobile.webp",
          imageAlt: "Nordwear case",
        },
        {
          client: "Fresh Cut",
          type: "Website",
          href: "#portfolio",
          imageSrc: "/cases/freshCut-thumbnail.webp",
          imageAlt: "Fresh Cut case",
        },
      ],
    },
    partnership: {
      eyebrow: "Et samarbejde, der r\u00e6kker l\u00e6ngere",
      title: "Vi er med \u2013 ogs\u00e5 efter lanceringen",
      description:
        "En ny hjemmeside er kun begyndelsen. Vi tror p\u00e5 langvarige samarbejder, hvor vi l\u00f8bende hj\u00e6lper med vedligeholdelse, opdateringer og videreudvikling. P\u00e5 den m\u00e5de sikrer vi, at jeres hjemmeside forts\u00e6tter med at skabe v\u00e6rdi i takt med, at virksomheden udvikler sig.",
      ctaLabel: "Har du sp\u00f8rgsm\u00e5l du vil stille os?",
      ctaHref: "#contact",
      imageSrc: null,
      imageAlt: "Frisdahl Studio samarbejde",
    },
    services: {
      eyebrow: "Ydelser",
      title:
        "Alt hvad du beh\u00f8ver for en st\u00e6rk digital tilstedev\u00e6relse",
      description:
        "Fra strategi til lancering \u2014 vi leverer gennemarbejdede l\u00f8sninger med h\u00f8j kvalitet og tydelig kommunikation.",
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
        "Vi arbejder t\u00e6t sammen med dig gennem hele forl\u00f8bet, s\u00e5 du altid ved, hvor vi er, og hvad der sker n\u00e6ste skridt.",
      steps: [
        {
          number: "01",
          title: "Indsigt & strategi",
          description:
            "Vi starter med at forst\u00e5 din virksomhed, m\u00e5lgruppe og m\u00e5l.",
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
            "Vi s\u00f8rger for en smooth go-live og er klar, n\u00e5r du har brug for os.",
        },
      ],
    },
    concept: {
      eyebrow: "Vi g\u00f8r det komplekse enkelt",
      title: "Projektet starter i en konceptfase, s\u00e5 vi ser hele potentialet.",
      description:
        "Projektet starter altid med en konceptfase, som sikrer, at indsatsen fokuserer p\u00e5 de afg\u00f8rende succeskrav, og alle parter har en f\u00e6lles forst\u00e5else for, hvor I er nu, og hvor I gerne vil v\u00e6re i fremtiden. Dermed sikrer vi, at de inkluderede tekniske krav og \u00f8nsker til funktioner underst\u00f8tter den rejse, og taler ind i jeres overordnede strategi.",
      steps: [
        {
          title: "1. Hvilken smerte skal fjernes?",
          description:
            "Vi starter altid med at diagnosticere jeres smerte, inden vi kommer med r\u00e5d, s\u00e5 vi ikke bare er et fix men giver den rigtige \u201cmedicin\u201d.",
        },
        {
          title: "2. Hvilken v\u00e6rdi kan skabes?",
          description:
            "Vi vil forst\u00e5 v\u00e6rdien, der kan skabes, og finde ud af, hvordan vi skaber den st\u00f8rste effekt for jer. Hvad er jeres baseline, og hvor vil I hen?",
        },
        {
          title: "3. Hvordan skaber vi den v\u00e6rdi?",
          description:
            "Vi forst\u00e5r nu smerten og v\u00e6rdien og skal nu dele alt arbejdet op i mindre leverancer, s\u00e5 vi sikrer god fremdrift og feedbackmuligheder.",
        },
      ],
    },
    contact: {
      eyebrow: "T\u00f8v ikke \u2013 vi er altid klar p\u00e5 en snak",
      title: "Lad os tage en snak om jeres digitale projekt",
      description:
        "Lad os g\u00e5 i detaljer, s\u00e5 vi sammen kan finde l\u00f8sninger, der passer til dine behov.",
      ctaPrimary: "Kontakt os",
      ctaSecondary: "Book et m\u00f8de",
      drawer: {
        writeEyebrow: "Skriv til os",
        writeTitle: "F\u00f8rste skridt i din forretningsudvikling",
        writeDescription:
          "Fort\u00e6l os kort om dit projekt, s\u00e5 vender vi tilbage med en klar plan.",
        form: {
          nameLabel: "Navn*",
          companyLabel: "Virksomhed",
          emailLabel: "E-mail*",
          phoneLabel: "Tlf*",
          messageLabel: "Hvad kan vi hj\u00e6lpe dig med?*",
          privacy: {
            before: "Jeg accepterer Frisdahl Studio's ",
            cookieLabel: "cookie",
            cookieHref: "#cookiepolitik",
            between: " og ",
            policyLabel: "privatlivspolitik",
            policyHref: "#datapolitik",
            after: "*",
          },
          namePlaceholder: "Dit navn",
          companyPlaceholder: "Din virksomhed",
          emailPlaceholder: "din@email.dk",
          phonePlaceholder: "+45 00 00 00 00",
          messagePlaceholder: "Fort\u00e6l os kort om dit projekt",
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
  en: {
    hero: {
      eyebrow: "FRISDAHL STUDIO",
      headlineLine1: "Digital solutions,",
      headlineLine2: "that deliver results",
      description:
        "I help businesses with modern websites, strong visual identity, and digital experiences built properly from the start.",
      ctaPrimary: "Start a project",
      ctaSecondary: "View portfolio",
      muteOn: "Unmute video",
      muteOff: "Mute video",
    },
    feature: {
      eyebrow: "FROM IDEA TO FINISHED WEBSITE",
      title: "We build a website that fits your business",
      description:
        "I do not believe in one-size-fits-all solutions. Every website is designed and developed from scratch with a focus on your business, audience, and ambitions. The result is a solution that looks professional and is built to last.",
      linkLabel: "Let's have a chat",
      linkHref: "#contact",
      imageSrc: null,
      imageAlt: "Frisdahl Studio work",
    },
    cases: {
      ariaLabel: "Selected cases",
      eyebrow: "Cases",
      titleLine1: "Built with a focus",
      titleLine2: "on quality",
      ctaLabel: "View all cases",
      ctaHref: "/cases",
      items: [
        {
          client: "Nordwear",
          type: "Website",
          href: "#portfolio",
          imageSrc: "/cases/Nordwear-mobile.webp",
          imageAlt: "Nordwear case",
        },
        {
          client: "Fresh Cut",
          type: "Website",
          href: "#portfolio",
          imageSrc: "/cases/freshCut-thumbnail.webp",
          imageAlt: "Fresh Cut case",
        },
      ],
    },
    partnership: {
      eyebrow: "A partnership that goes further",
      title: "We're with you \u2014 even after launch",
      description:
        "A new website is only the beginning. We believe in long-term partnerships where we continuously help with maintenance, updates, and further development. That way we ensure your website keeps creating value as your business evolves.",
      ctaLabel: "Do you have questions for us?",
      ctaHref: "#contact",
      imageSrc: null,
      imageAlt: "Frisdahl Studio partnership",
    },
    services: {
      eyebrow: "Services",
      title: "Everything you need for a strong digital presence",
      description:
        "From strategy to launch — we deliver polished solutions with high quality and clear communication.",
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
        "We work closely with you throughout the journey, so you always know where we are and what happens next.",
      steps: [
        {
          number: "01",
          title: "Insight & strategy",
          description:
            "We start by understanding your business, audience, and goals.",
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
            "We ensure a smooth go-live and are ready when you need us.",
        },
      ],
    },
    concept: {
      eyebrow: "We make the complex simple",
      title: "Every project starts with a concept phase, so we see the full potential.",
      description:
        "Every project always begins with a concept phase that ensures the effort focuses on the critical success requirements, and all parties share a common understanding of where you are now and where you want to be in the future. This way we ensure that the included technical requirements and functional needs support that journey and align with your overall strategy.",
      steps: [
        {
          title: "1. What pain should be removed?",
          description:
            "We always start by diagnosing your pain before giving advice, so we are not just a quick fix but provide the right \u201cmedicine\u201d.",
        },
        {
          title: "2. What value can be created?",
          description:
            "We want to understand the value that can be created and find out how we create the greatest effect for you. What is your baseline, and where do you want to go?",
        },
        {
          title: "3. How do we create that value?",
          description:
            "We now understand the pain and the value, and we break the work into smaller deliverables to ensure good progress and opportunities for feedback.",
        },
      ],
    },
    contact: {
      eyebrow: "Don\u2019t hesitate \u2013 we\u2019re always ready for a chat",
      title: "Let\u2019s talk about your digital project",
      description:
        "Let\u2019s get into the details, so together we can find solutions that fit your needs.",
      ctaPrimary: "Contact us",
      ctaSecondary: "Book a meeting",
      drawer: {
        writeEyebrow: "Write to us",
        writeTitle: "The first step in your business development",
        writeDescription:
          "Tell us briefly about your project and we will get back to you with a clear plan.",
        form: {
          nameLabel: "Name*",
          companyLabel: "Company",
          emailLabel: "Email*",
          phoneLabel: "Phone*",
          messageLabel: "What can we help you with?*",
          privacy: {
            before: "I accept Frisdahl Studio's ",
            cookieLabel: "cookie",
            cookieHref: "#cookie-policy",
            between: " and ",
            policyLabel: "privacy policy",
            policyHref: "#privacy-policy",
            after: "*",
          },
          namePlaceholder: "Your name",
          companyPlaceholder: "Your company",
          emailPlaceholder: "you@email.com",
          phonePlaceholder: "+45 00 00 00 00",
          messagePlaceholder: "Tell us briefly about your project",
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
  },
} as const;

export type HomeContent = (typeof homeContent)[Locale];

export function getHomeContent(locale: Locale = defaultLocale): HomeContent {
  return homeContent[locale];
}
