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
        "Jeg hj\u00e6lper virksomheder med moderne hjemmesider, grafisk design og skr\u00e6ddersyede digitale l\u00f8sninger. Alt bliver kodet fra bunden med fokus p\u00e5 performance, brugeroplevelse og et design, der styrker jeres virksomhed.",
      ctaPrimary: "Start dit projekt",
      ctaSecondary: "Se cases",
      muteOn: "Sl\u00e5 lyd til",
      muteOff: "Sl\u00e5 lyd fra",
    },
    feature: {
      eyebrow: "// PROCES",
      title: "S\u00e5dan arbejder vi",
      linkLabel: "Lad os tage en snak",
      linkHref: "#contact",
      steps: [
        {
          title: "Send os en brief.",
          description:
            "Et afsnit er nok. Vi svarer inden for to hverdage med, om opgaven passer til det, vi laver.",
          imageSrc: "/cases/nordwear/mobile--6-7.jpg",
          imageAlt: "Nordwear case på mobil",
        },
        {
          title: "En samtale.",
          description:
            "Du fortæller, hvor brandet skal hen. Vi giver dig et klart billede af løsningen, tidsplanen og prisen, før du forpligter dig.",
          imageSrc: "/cases/fresh-cut/thumbnail--6-7.jpg",
          imageAlt: "Fresh Cut case",
        },
        {
          title: "Design og udvikling.",
          description:
            "Begge brødre på hvert projekt, custom-kodet fra bunden. Forløb varer seks til tolv uger. Motion er mediet – i hver transition, scroll-oplevelse og interaktion.",
          imageSrc: "/cases/nordwear/production-mac.webp",
          imageAlt: "Nordwear hjemmeside på desktop",
        },
        {
          title: "Lancering.",
          description: "Sitet lander som brandets vartegn online.",
          imageSrc: "/cases/fresh-cut/mobile2--16-10.jpg",
          imageAlt: "Fresh Cut hjemmeside efter lancering",
        },
      ],
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
          href: '/cases/nordwear',
          imageSrc: "/cases/nordwear/mobile--6-7.jpg",
          imageAlt: "Nordwear case",
        },
        {
          client: "Fresh Cut",
          type: "Hjemmeside",
          href: '/cases/fresh-cut',
          imageSrc: "/cases/fresh-cut/thumbnail--6-7.jpg",
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
      imageSrc: '/images/team/alexander-portrait.webp',
      imageAlt: 'Portræt af Alexander Frisdahl',
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
        { imageSrc: '/cases/nordwear/mobile2--16-10.jpg', imageAlt: 'Nordwear hjemmeside' },
        { imageSrc: '/cases/fresh-cut/mobile1--16-10.jpg', imageAlt: 'Fresh Cut hjemmeside' },
        { imageSrc: '/cases/fresh-cut/mobile2--16-10.jpg', imageAlt: 'Fresh Cut hjemmeside' },
        { imageSrc: '/cases/visuel-atelier/hero--16-10.jpg', imageAlt: 'Visuel Atelier hjemmeside' },
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
            policyHref: PRIVACY_POLICY_PATH,
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
        headlineLine1: "S\u00e5dan scoper vi et projekt.",
        headlineLine2: "",
        description:
          "Tre former for samarbejde, alt skr\u00e6ddersyet kodet og motion-drevet. Prisen kommer p\u00e5 bordet i det f\u00f8rste m\u00f8de, s\u00e5 vi kan tilpasse den til det, I faktisk skal bygge.",
        ctaPrimary: "Start dit projekt",
        ctaSecondary: "Se priser",
        imageSrc: "/images/pricing/digital-strategy.webp",
        imageAlt: "Digital strategi illustration",
      },
      examplesIntro: {
        title: "Tre m\u00e5der at samarbejde p\u00e5",
        subtitle:
          "Alle l\u00f8sninger er skr\u00e6ddersyet kodet fra bunden med fokus p\u00e5 performance, motion og brand. Vi finder den rigtige model i f\u00f8rste samtale.",
      },
      plans: {
        items: [
          {
            id: "kickstart",
            eyebrow: "Hjemmeside",
            title: "Per projekt",
            audience: "TIL VIRKSOMHEDER DER SKAL I GANG MED EN ST\u00c6RK ONLINE TILSTEDEV\u00c6RELSE",
            availability: "TIL BRANDS DER VIL V\u00c6KSTE ONLINE MED EN HELHEDSOPLEVELSE",
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
            audience: "TIL BRANDS DER VIL V\u00c6KSTE ONLINE MED EN HELHEDSOPLEVELSE",
            availability: "TIL BRANDS DER VIL V\u00c6KSTE ONLINE MED EN HELHEDSOPLEVELSE",
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
            audience: "TIL KOMPLEKSE L\u00d8SNINGER, WEBSHOP OG INTEGRATIONER",
            availability: "TILBUD EFTER SAMTALE",
            cta: "Kontakt os",
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
    feature: {
      eyebrow: "// PROCESS",
      title: "How we work",
      linkLabel: "Let's have a chat",
      linkHref: "#contact",
      steps: [
        {
          title: "Send us a brief.",
          description:
            "One paragraph is enough. We reply within two business days with whether the shape is right for what we do.",
          imageSrc: "/cases/nordwear/mobile--6-7.jpg",
          imageAlt: "Nordwear case on mobile",
        },
        {
          title: "One conversation.",
          description:
            "You tell us where the brand is going. We give you a clear picture of the artifact, the timeline and the cost before you commit to anything.",
          imageSrc: "/cases/fresh-cut/thumbnail--6-7.jpg",
          imageAlt: "Fresh Cut case",
        },
        {
          title: "Design and build.",
          description:
            "Both brothers on every project, custom-coded from the ground up. Engagements run six to twelve weeks. Motion is the medium, running through every transition, scroll moment and interaction.",
          imageSrc: "/cases/nordwear/production-mac.webp",
          imageAlt: "Nordwear website on desktop",
        },
        {
          title: "Ship.",
          description: "The site lands as the brand's landmark online.",
          imageSrc: "/cases/fresh-cut/mobile2--16-10.jpg",
          imageAlt: "Fresh Cut website after launch",
        },
      ],
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
          href: '/cases/nordwear',
          imageSrc: "/cases/nordwear/mobile--6-7.jpg",
          imageAlt: "Nordwear case",
        },
        {
          client: "Fresh Cut",
          type: "Website",
          href: '/cases/fresh-cut',
          imageSrc: "/cases/fresh-cut/thumbnail--6-7.jpg",
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
      imageSrc: '/images/team/alexander-portrait.webp',
      imageAlt: 'Portrait of Alexander Frisdahl',
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
        { imageSrc: '/cases/nordwear/mobile2--16-10.jpg', imageAlt: 'Nordwear website' },
        { imageSrc: '/cases/fresh-cut/mobile1--16-10.jpg', imageAlt: 'Fresh Cut website' },
        { imageSrc: '/cases/fresh-cut/mobile2--16-10.jpg', imageAlt: 'Fresh Cut website' },
        { imageSrc: '/cases/visuel-atelier/hero--16-10.jpg', imageAlt: 'Visuel Atelier website' },
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
            policyHref: PRIVACY_POLICY_PATH,
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
        headlineLine1: "How we scope a project.",
        headlineLine2: "",
        description:
          "Three shapes of engagement, all custom-coded and motion-led. Pricing comes up in the first call so we can match it to what you're actually building.",
        ctaPrimary: "Start your project",
        ctaSecondary: "See pricing",
        imageSrc: "/images/pricing/digital-strategy.webp",
        imageAlt: "Digital strategy illustration",
      },
      examplesIntro: {
        title: "Three ways to work together",
        subtitle:
          "Every solution is custom-coded from scratch with a focus on performance, motion and brand. We find the right model in the first conversation.",
      },
      plans: {
        items: [
          {
            id: "kickstart",
            eyebrow: "Website",
            title: "By project",
            audience: "FOR BUSINESSES READY TO BUILD A STRONG ONLINE PRESENCE",
            availability: "ONLY 3 SPOTS LEFT",
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
            audience: "FOR BRANDS READY TO GROW ONLINE WITH A FULL EXPERIENCE",
            availability: "ONLY 3 SPOTS LEFT",
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
            audience: "FOR COMPLEX SOLUTIONS, WEBSHOPS AND INTEGRATIONS",
            availability: "QUOTE AFTER CONVERSATION",
            cta: "Contact us",
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
