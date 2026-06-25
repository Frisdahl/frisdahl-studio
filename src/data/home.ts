import type { Locale } from "./navigation";
import { defaultLocale } from "./navigation";

const homeContent = {
  da: {
    scrollToTopLabel: "Rul til toppen",
    hero: {
      eyebrow: "DESIGN & UDVIKLING",
      headlineLine1: "Digitale l\u00f8sninger,",
      headlineLine2: "der skaber resultater",
      description:
        "Jeg hj\u00e6lper virksomheder med moderne hjemmesider, grafisk design og skr\u00e6ddersyede digitale l\u00f8sninger. Alt bliver kodet fra bunden med fokus p\u00e5 performance, brugeroplevelse og et design, der styrker jeres virksomhed.",
      ctaPrimary: "Start dit projekt",
      ctaSecondary: "Se cases",
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
      ctaHref: '/cases',
      viewCaseLabel: "Se case",
      items: [
        {
          client: "Nordwear",
          type: "Hjemmeside",
          href: "#portfolio",
          imageSrc: "/cases/Nordwear-mobile.webp",
          imageAlt: "Nordwear case",
        },
        {
          client: "Fresh Cut",
          type: "Hjemmeside",
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
      eyebrow: "Hvad er udfordringen?",
      title: "En god l\u00f8sning starter med de rigtige sp\u00f8rgsm\u00e5l.",
      description:
        "F\u00f8r vi designer eller udvikler noget, l\u00e6rer vi jeres virksomhed at kende. Vi afd\u00e6kker m\u00e5l, udfordringer og muligheder, s\u00e5 l\u00f8sningen ikke kun ser godt ud \u2013 men ogs\u00e5 skaber v\u00e6rdi.",
      steps: [
        {
          title: "1. Hvilken smerte skal fjernes?",
          description:
            "Vi starter altid med at diagnosticere jeres smerte, inden vi kommer med r\u00e5d, s\u00e5 vi ikke bare er et fix men giver den rigtige \u201cmedicin\u201d.",
          imageSrc: "/images/concept/concept-step-pain.webp",
          imageAlt: "Konceptfase: identifikation af udfordringer",
        },
        {
          title: "2. Hvilken v\u00e6rdi kan skabes?",
          description:
            "Vi vil forst\u00e5 v\u00e6rdien, der kan skabes, og finde ud af, hvordan vi skaber den st\u00f8rste effekt for jer. Hvad er jeres baseline, og hvor vil I hen?",
          imageSrc: "/images/concept/concept-step-value.webp",
          imageAlt: "Konceptfase: kortl\u00e6gning af v\u00e6rdi og potentiale",
        },
        {
          title: "3. Hvordan skaber vi den v\u00e6rdi?",
          description:
            "Vi forst\u00e5r nu smerten og v\u00e6rdien og skal nu dele alt arbejdet op i mindre leverancer, s\u00e5 vi sikrer god fremdrift og feedbackmuligheder.",
          imageSrc: "/images/concept/concept-step-delivery.webp",
          imageAlt: "Konceptfase: plan for leverance og eksekvering",
        },
      ],
    },
    pricing: {
      eyebrow: "Ikke bare en template",
      title: "Høj performance med lavere risiko og hurtig time-to-market",
      description:
        "I får et unikt website, der performer hurtigere og mere sikkert, fordi vi bygger det på gennemtestede komponenter. Det gør at vi kan fokusere på det, der skaber forretningsværdi, som f.eks. forretningskritiske funktioner og jeres visuelle identitet.",
      sliderAriaLabel: "Priseksempler",
      sliderPrev: "Forrige",
      sliderNext: "N\u00e6ste",
      sliderStatus: "Billede {current} af {total}",
      slides: [
        { imageSrc: null, imageAlt: "Website eksempel 1" },
        { imageSrc: null, imageAlt: "Website eksempel 2" },
        { imageSrc: null, imageAlt: "Website eksempel 3" },
        { imageSrc: null, imageAlt: "Website eksempel 4" },
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
    pricingPage: {
      hero: {
        eyebrow: "Priser",
        headlineLine1: "Pakker tilpasset,",
        headlineLine2: "jeres virksomhed",
        description:
          "Vi tilbyder fleksible l\u00f8sninger, der matcher jeres behov og budget \u2014 fra landingssider til komplette digitale platforme.",
        ctaPrimary: "Start dit projekt",
        ctaSecondary: "Se priser",
      },
      examplesIntro: {
        title: "Klar til en hjemmeside, der skaber resultater?",
        subtitle:
          "Vi har sammensat tre priseksempler, s\u00e5 I nemt kan f\u00e5 et overblik over vores l\u00f8sninger og priser.",
      },
      plans: {
        includesLabel: "Inkluderer:",
        items: [
          {
            id: "kickstart",
            title: "Kickstart",
            subtitle: "Perfekt til mindre virksomheder og iv\u00e6rks\u00e6ttere",
            description:
              "En professionel hjemmeside med alt det vigtigste, s\u00e5 I kommer godt fra start. Vi s\u00f8rger for et moderne design, hurtig performance og en l\u00f8sning, der er nem at arbejde videre med.",
            price: "Fra 9.995 kr.",
            cta: "Kom i gang",
            ctaAction: "book",
            featured: false,
            badge: null,
            features: [
              "Design tilpasset jeres virksomhed",
              "Op til 5 sider",
              "Responsivt design",
              "Kontaktformular",
              "Basis SEO",
              "Hastighedsoptimering",
              "Hj\u00e6lp til lancering",
              "CMS i WordPress eller Shopify",
            ],
          },
          {
            id: "business",
            title: "Business",
            subtitle: "Til virksomheder, der vil v\u00e6kste online",
            description:
              "N\u00e5r hjemmesiden skal v\u00e6re mere end et digitalt visitkort. Vi udvikler en l\u00f8sning med fokus p\u00e5 brugeroplevelse, konverteringer og en st\u00e6rk online tilstedev\u00e6relse.",
            price: "Fra 19.995 kr.",
            cta: "V\u00e6lg Business",
            ctaAction: "book",
            featured: true,
            badge: "Mest popul\u00e6re",
            features: [
              "Alt fra Kickstart",
              "Skr\u00e6ddersyet design",
              "Flere undersider",
              "Blog eller nyhedssektion",
              "Avancerede formularer",
              "Grundl\u00e6ggende SEO-struktur",
              "Integrationer som nyhedsbrev eller CRM",
              "Performanceoptimering",
            ],
          },
          {
            id: "custom",
            title: "Skr\u00e6ddersyet",
            subtitle: "Til virksomheder med s\u00e6rlige behov",
            description:
              "Har I brug for specialudviklede funktioner, webshop eller integrationer? Vi bygger en l\u00f8sning, der passer pr\u00e6cis til jeres virksomhed.",
            price: "Kontakt os for tilbud",
            cta: "F\u00e5 et tilbud",
            ctaAction: "contact",
            featured: false,
            badge: null,
            features: [
              "Specialudviklede funktioner",
              "Webshop",
              "Booking- eller medlemssystem",
              "API-integrationer",
              "Kundelogin",
              "Flersprogede hjemmesider",
              "L\u00f8bende udvikling",
              "Teknisk sparring",
            ],
          },
        ],
      },
    },
  },
  en: {
    scrollToTopLabel: "Scroll to top",
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
      ctaHref: '/cases',
      viewCaseLabel: "View case",
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
          imageSrc: "/images/concept/concept-step-pain.webp",
          imageAlt: "Concept phase: identifying challenges",
        },
        {
          title: "2. What value can be created?",
          description:
            "We want to understand the value that can be created and find out how we create the greatest effect for you. What is your baseline, and where do you want to go?",
          imageSrc: "/images/concept/concept-step-value.webp",
          imageAlt: "Concept phase: mapping value and potential",
        },
        {
          title: "3. How do we create that value?",
          description:
            "We now understand the pain and the value, and we break the work into smaller deliverables to ensure good progress and opportunities for feedback.",
          imageSrc: "/images/concept/concept-step-delivery.webp",
          imageAlt: "Concept phase: delivery and execution plan",
        },
      ],
    },
    pricing: {
      eyebrow: "Not just a template",
      title: "High performance with lower risk and faster time-to-market",
      description:
        "You get a unique website that performs faster and more securely because we build it on proven components. That lets us focus on what creates business value, such as business-critical features and your visual identity.",
      sliderAriaLabel: "Pricing examples",
      sliderPrev: "Previous",
      sliderNext: "Next",
      sliderStatus: "Image {current} of {total}",
      slides: [
        { imageSrc: null, imageAlt: "Website example 1" },
        { imageSrc: null, imageAlt: "Website example 2" },
        { imageSrc: null, imageAlt: "Website example 3" },
        { imageSrc: null, imageAlt: "Website example 4" },
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
    pricingPage: {
      hero: {
        eyebrow: "Pricing",
        headlineLine1: "Packages tailored",
        headlineLine2: "to your business",
        description:
          "We offer flexible solutions that match your needs and budget \u2014 from landing pages to complete digital platforms.",
        ctaPrimary: "Start your project",
        ctaSecondary: "See pricing",
      },
      examplesIntro: {
        title: "Ready for a website that delivers results?",
        subtitle:
          "We've put together three pricing examples so you can easily get an overview of our solutions and prices.",
      },
      plans: {
        includesLabel: "Includes:",
        items: [
          {
            id: "kickstart",
            title: "Kickstart",
            subtitle: "Perfect for smaller businesses and entrepreneurs",
            description:
              "A professional website with everything essential, so you get off to a strong start. We deliver modern design, fast performance, and a solution that's easy to build on.",
            price: "From 9,995 DKK",
            cta: "Get started",
            ctaAction: "book",
            featured: false,
            badge: null,
            features: [
              "Design tailored to your business",
              "Up to 5 pages",
              "Responsive design",
              "Contact form",
              "Basic SEO",
              "Speed optimization",
              "Launch support",
              "CMS in WordPress or Shopify",
            ],
          },
          {
            id: "business",
            title: "Business",
            subtitle: "For companies ready to grow online",
            description:
              "When your website needs to be more than a digital business card. We build a solution focused on user experience, conversions, and a strong online presence.",
            price: "From 19,995 DKK",
            cta: "Choose Business",
            ctaAction: "book",
            featured: true,
            badge: "Most popular",
            features: [
              "Everything in Kickstart",
              "Custom design",
              "More subpages",
              "Blog or news section",
              "Advanced forms",
              "Foundational SEO structure",
              "Integrations such as newsletter or CRM",
              "Performance optimization",
            ],
          },
          {
            id: "custom",
            title: "Custom",
            subtitle: "For businesses with specific needs",
            description:
              "Need custom features, a webshop, or integrations? We build a solution that fits your business precisely.",
            price: "Contact us for a quote",
            cta: "Get a quote",
            ctaAction: "contact",
            featured: false,
            badge: null,
            features: [
              "Custom-developed features",
              "Webshop",
              "Booking or membership system",
              "API integrations",
              "Customer login",
              "Multilingual websites",
              "Ongoing development",
              "Technical consulting",
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
