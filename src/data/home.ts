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
    contact: {
      title: "Klar til at starte dit n\u00e6ste projekt?",
      description:
        "Fort\u00e6l os om din id\u00e9 \u2014 vi vender tilbage med en klar plan og et uforpligtende tilbud.",
      cta: "Start et projekt",
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
    contact: {
      title: "Ready to start your next project?",
      description:
        "Tell us about your idea — we will get back with a clear plan and a no-obligation quote.",
      cta: "Start a project",
    },
  },
} as const;

export type HomeContent = (typeof homeContent)[Locale];

export function getHomeContent(locale: Locale = defaultLocale): HomeContent {
  return homeContent[locale];
}
