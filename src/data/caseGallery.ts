import type { CaseDetailGallery } from '../types/caseDetail'
import type { Locale } from './navigation'

type CaseGalleryAssets = Omit<CaseDetailGallery, 'ariaLabel'>

const caseGalleryAssets: Record<string, CaseGalleryAssets> = {
  nordwear: {
    // Home page hover: the two phones at the sides, one of the PCs in the middle.
    hoverTrio: [
      { imageSrc: '/cases/nordwear/iphone-forside--4-3.webp', imageAlt: 'Nordwear forside på en iPhone' },
      { imageSrc: '/cases/nordwear/macbook-alle-produkter--3-2.webp', imageAlt: 'Nordwear produktoversigt på en MacBook Pro' },
      { imageSrc: '/cases/nordwear/iphone-produktside--4-3.webp', imageAlt: 'Nordwear produktside på en iPhone' },
    ],
    // Only supplies the next-project preview; the pair below is what the gallery shows.
    horizontalTop: {
      imageSrc: '/cases/nordwear/main-higgs--16-9.webp',
      imageAlt: 'Nordwear forside på en MacBook Pro',
    },
    horizontalTopPair: [
      { imageSrc: '/cases/nordwear/macbook-alle-produkter--3-2.webp', imageAlt: 'Nordwear produktoversigt på en MacBook Pro', aspectRatio: '3 / 2' },
      { imageSrc: '/cases/nordwear/macbook-produktside--3-2.webp', imageAlt: 'Nordwear produktside på en MacBook Pro', aspectRatio: '3 / 2' },
    ],
    afterPalette: { imageSrc: '/cases/nordwear/ipad-glas--3-2.webp', imageAlt: 'Nordwear forside på en iPad Pro', aspectRatio: '3 / 2' },
    horizontalBottomPair: [
      { imageSrc: '/cases/nordwear/iphone-forside--4-3.webp', imageAlt: 'Nordwear forside på en iPhone', aspectRatio: '4 / 3' },
      { imageSrc: '/cases/nordwear/iphone-produktside--4-3.webp', imageAlt: 'Nordwear produktside på en iPhone', aspectRatio: '4 / 3' },
    ],
  },
  'fresh-cut': {
    introPair: [
      { imageSrc: '/cases/fresh-cut/freshcut-macbook-hero--5-4.webp', imageAlt: 'Fresh Cut forside på en bærbar', aspectRatio: '5 / 4', transparent: true },
      { imageSrc: '/cases/fresh-cut/freshcut-macbook-services--5-4.webp', imageAlt: 'Fresh Cut tjenester og priser på en bærbar', aspectRatio: '5 / 4', transparent: true },
    ],
    horizontalTopPair: [
      { imageSrc: '/cases/fresh-cut/freshcut-macbook-booking--3-2.webp', imageAlt: 'Fresh Cut booking på en bærbar i en barbersalon', aspectRatio: '3 / 2' },
      { imageSrc: '/cases/fresh-cut/freshcut-macbook-anmeldelser--3-2.webp', imageAlt: 'Fresh Cut anmeldelser på en bærbar på en marmordisk', aspectRatio: '3 / 2' },
    ],
    horizontalTop: {
      imageSrc: '/cases/fresh-cut/thumbnail--16-9.jpg',
      imageAlt: 'Fresh Cut forside',
    },
    horizontalBottomPair: [
      { imageSrc: '/cases/fresh-cut/freshcut-iphones-forside--4-3.webp', imageAlt: 'Fresh Cut forside og prisliste på to iPhones', aspectRatio: '4 / 3', transparent: true },
      { imageSrc: '/cases/fresh-cut/freshcut-iphones-booking--4-3.webp', imageAlt: 'Fresh Cut booking og lokationer på to iPhones', aspectRatio: '4 / 3', transparent: true },
    ],
    bottomWide: {
      imageSrc: '/cases/fresh-cut/freshcut-ipad-lokationer--3-2.webp',
      imageAlt: 'Fresh Cut lokationer på en iPad på foldede håndklæder i en barbersalon',
      aspectRatio: '3 / 2',
    },
  },
  'peter-salling': {
    mockupBackground: '#f4f5f6',
    afterPalette: { imageSrc: '/cases/peter-salling/ipad-portrait-i-kunsten-kan-livet-kendes--16-9.webp', imageAlt: 'I kunsten kan livet kendes på Peter Sallings projektside på en iPad', aspectRatio: '16 / 9' },
    // Home page hover: the two phones at the sides, one of the PCs in the middle.
    hoverTrio: [
      { imageSrc: '/cases/peter-salling/iphone-sikkerheden-er-paa-spil--4-3.webp', imageAlt: 'Sikkerheden er på spil på Peter Sallings projektside på en iPhone' },
      { imageSrc: '/cases/peter-salling/macbook-alt-jeg-forventede--4-3.webp', imageAlt: 'Alt jeg forventede på Peter Sallings projektside på en MacBook Pro' },
      { imageSrc: '/cases/peter-salling/iphone-live-life-in-colour--4-3.webp', imageAlt: 'Live Life in Colour på Peter Sallings projektside på en iPhone' },
    ],
    introPair: [
      {
        imageSrc: '/cases/peter-salling/macbook-alt-jeg-forventede--4-3.webp',
        imageAlt: 'Alt jeg forventede på Peter Sallings projektside på en MacBook Pro',
        aspectRatio: '4 / 3',
        // The screen plays a recording of the real project page; the laptop and table stay a still.
        video: {
          src: '/cases/peter-salling/macbook-alt-jeg-forventede--4-3.mp4',
          poster: '/cases/peter-salling/macbook-alt-jeg-forventede--poster--4-3.webp',
        },
      },
      { imageSrc: '/cases/peter-salling/macbook-make-football-your-game--4-3.webp', imageAlt: 'Make Football Your Game på Peter Sallings projektside på en MacBook Pro', aspectRatio: '4 / 3' },
    ],
    verticalPairTop: [
      {
        imageSrc: '/cases/peter-salling/iphone-sikkerheden-er-paa-spil--4-3.webp',
        imageAlt: 'Sikkerheden er på spil på Peter Sallings projektside på en iPhone',
        aspectRatio: '4 / 3',
        video: {
          src: '/cases/peter-salling/iphone-sikkerheden-er-paa-spil--4-3.mp4',
          poster: '/cases/peter-salling/iphone-sikkerheden-er-paa-spil--poster--4-3.webp',
        },
      },
      { imageSrc: '/cases/peter-salling/iphone-live-life-in-colour--4-3.webp', imageAlt: 'Live Life in Colour på Peter Sallings projektside på en iPhone', aspectRatio: '4 / 3' },
    ],
    horizontalTopHidden: true,
    horizontalTop: {
      imageSrc: '/cases/peter-salling/iphone-live-life-glass--16-9.webp',
      imageAlt: 'Live Life in Colour på Peter Sallings projektside på en iPhone på et glasbord',
      aspectRatio: '16 / 9',
    },
  },
  'det-kollektive-klaedeskab': {
    introPair: [
      { imageSrc: '/cases/det-kollektive-klaedeskab/dkk-macbook-forside--5-4.webp', imageAlt: 'Det Kollektive Klædeskabs forside på en bærbar', aspectRatio: '5 / 4', transparent: true },
      { imageSrc: '/cases/det-kollektive-klaedeskab/dkk-macbook-produkter--5-4.webp', imageAlt: 'Nyeste fund i garderoben på en bærbar', aspectRatio: '5 / 4', transparent: true },
    ],
    horizontalTopPair: [
      { imageSrc: '/cases/det-kollektive-klaedeskab/dkk-macbook-medlemskab--3-2.webp', imageAlt: 'Medlemskaber på en bærbar ved siden af foldet strik', aspectRatio: '3 / 2' },
      { imageSrc: '/cases/det-kollektive-klaedeskab/dkk-macbook-saadan--3-2.webp', imageAlt: 'Sådan gør du på en bærbar foran et tøjstativ', aspectRatio: '3 / 2' },
    ],
    horizontalTop: {
      imageSrc: '/cases/det-kollektive-klaedeskab/forside--16-9.webp',
      imageAlt: 'Det Kollektive Klædeskabs forside',
    },
    horizontalBottomPair: [
      { imageSrc: '/cases/det-kollektive-klaedeskab/dkk-iphones-forside--4-3.webp', imageAlt: 'Forside og nyeste fund på to iPhones', aspectRatio: '4 / 3', transparent: true },
      { imageSrc: '/cases/det-kollektive-klaedeskab/dkk-iphones-medlemskab--4-3.webp', imageAlt: 'Medlemskab og FAQ på to iPhones', aspectRatio: '4 / 3', transparent: true },
    ],
    bottomWide: {
      imageSrc: '/cases/det-kollektive-klaedeskab/dkk-ipad-tal--3-2.webp',
      imageAlt: 'Fællesskabet i tal på en iPad i en bouclé-lænestol',
      aspectRatio: '3 / 2',
    },
  },
}

const caseGalleryAriaLabels: Record<Locale, Record<string, string>> = {
  da: {
    nordwear: 'Projektbilleder fra Nordwear',
    'fresh-cut': 'Projektbilleder fra Fresh Cut',
    'peter-salling': 'Projektbilleder fra Peter Salling',
    'det-kollektive-klaedeskab': 'Projektbilleder fra Det Kollektive Klædeskab',
  },
}

export function getCaseGallery(locale: Locale, caseId: string): CaseDetailGallery | null {
  const assets = caseGalleryAssets[caseId]
  const ariaLabel = caseGalleryAriaLabels[locale][caseId]

  if (!assets || !ariaLabel) return null

  return {
    ariaLabel,
    ...assets,
  }
}
