import type { CaseDetailGallery } from '../types/caseDetail'
import type { Locale } from './navigation'

type CaseGalleryAssets = Omit<CaseDetailGallery, 'ariaLabel'>

/** The grey of a picture that is not made yet. */
const GREY = 'bg-surface-gray'

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
      imageSrc: '/cases/nordwear/main--16-9.webp',
      imageAlt: 'Nordwear forside på en MacBook Pro',
    },
    horizontalTopPair: [
      {
        imageSrc: '/cases/nordwear/macbook-kategori-produkt--3-2.webp',
        imageAlt: 'Nordwear produktoversigt og produktside på en MacBook Pro',
        aspectRatio: '3 / 2',
        // The screen plays a recording of the real shop: the category page, a click on a product, the product page.
        video: {
          src: '/cases/nordwear/macbook-kategori-produkt--3-2.mp4',
          poster: '/cases/nordwear/macbook-kategori-produkt--poster--3-2.webp',
        },
      },
      {
        // The main pictures of products from the shop's category pages, one after another: square, each
        // on its own backdrop colour (which fills the frame around it).
        imageSrc: '/cases/nordwear/product-sneakers--1-1.webp',
        imageAlt: 'Nordwear sneakers',
        aspectRatio: '3 / 2',
        slideshow: [
          { imageSrc: '/cases/nordwear/product-sneakers--1-1.webp', imageAlt: 'Nordwear sneakers', background: '#d9d9d9' },
          { imageSrc: '/cases/nordwear/product-loafers--1-1.webp', imageAlt: 'Nordwear loafers', background: '#dbdbdb' },
          { imageSrc: '/cases/nordwear/product-dress-shoes--1-1.webp', imageAlt: 'Nordwear dress shoes', background: '#d6d6d6' },
          { imageSrc: '/cases/nordwear/product-boots--1-1.webp', imageAlt: 'Nordwear boots', background: '#d8d8d8' },
          { imageSrc: '/cases/nordwear/product-accessories--1-1.webp', imageAlt: 'Nordwear crossbody-taske', background: '#dddddd' },
        ],
      },
    ],
    afterPalette: { imageSrc: '/cases/nordwear/ipad-glas--3-2.webp', imageAlt: 'Nordwear forside på en iPad Pro', aspectRatio: '3 / 2' },
    horizontalBottomPair: [
      {
        imageSrc: '/cases/nordwear/iphone-produktside-video-v2--poster--4-3.webp',
        imageAlt: 'Nordwear produktside på en iPhone',
        aspectRatio: '4 / 3',
        // The screen plays a recording of the real shop: the product page's gallery (taps on the thumbnails), then a scroll.
        video: {
          src: '/cases/nordwear/iphone-produktside-video-v2--4-3.mp4',
          poster: '/cases/nordwear/iphone-produktside-video-v2--poster--4-3.webp',
        },
      },
      { imageSrc: '/cases/nordwear/iphone-produktside--4-3.webp', imageAlt: 'Nordwear produktside på en iPhone', aspectRatio: '4 / 3' },
    ],
  },
  'rethink-furniture': {
    // The MacBook plays a recording of the real site (a stand-in brand I designed and built): its home page with the
    // reveals that play while scrolling. The monitor is a still of the shop. Both are zoomed a little (see `zoom` in
    // types/caseDetail.ts), around the device, so the screens fill more of the frame and read better.
    introPair: [
      {
        imageSrc: '/cases/rethink-furniture/macbook-forside--4-3.webp',
        imageAlt: 'Rethink Furniture forside på en MacBook Pro',
        aspectRatio: '4 / 3',
        zoom: 1.12,
        zoomOrigin: '47% 50%',
        video: {
          src: '/cases/rethink-furniture/macbook-forside--4-3.mp4',
          poster: '/cases/rethink-furniture/macbook-forside--poster--4-3.webp',
        },
      },
      {
        imageSrc: '/cases/rethink-furniture/monitor-shop-produkt--4-3.webp',
        imageAlt: 'Rethink Furniture shoppen på en skærm',
        aspectRatio: '4 / 3',
        zoom: 1.15,
        zoomOrigin: '50% 52%',
      },
    ],
    // Only supplies the next-project preview; the pair above is what the gallery shows.
    horizontalTopHidden: true,
    horizontalTop: {
      imageSrc: '/cases/rethink-furniture/mockup--4-3.webp',
      imageAlt: 'Rethink Furniture på en iPad Pro',
      aspectRatio: '4 / 3',
    },
    // The mobile layout: the shop's product grid and the home page's collections, each on an iPhone (the screens are the
    // real site at 425 px wide; cropped in a little so the screens read well).
    horizontalBottomPair: [
      { imageSrc: '/cases/rethink-furniture/iphone-produkter--4-3.webp', imageAlt: 'Rethink Furniture shop med produkter på en iPhone', aspectRatio: '4 / 3' },
      { imageSrc: '/cases/rethink-furniture/iphone-kollektioner--4-3.webp', imageAlt: 'Rethink Furniture kollektioner på en iPhone', aspectRatio: '4 / 3' },
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
  offscript: {
    // The artist section of the home page as a clip on a MacBook (the marquee dragged, an artist opened, the artist page
    // loading), the site's footer on a second MacBook, then the Kontakt and Genrer pages on two phones. The clip is a
    // recording of the real site on a fake clock (60 fps, no dropped frames); the menu bar is macOS's dark one.
    introPair: [
      {
        imageSrc: '/cases/offscript/artists-macbook--4-3.webp',
        imageAlt: 'OFFSCRIPT® kunstnerne på en MacBook Pro',
        aspectRatio: '4 / 3',
        video: {
          src: '/cases/offscript/artists-macbook--4-3.mp4',
          poster: '/cases/offscript/artists-macbook--poster--4-3.webp',
        },
      },
      {
        imageSrc: '/cases/offscript/footer-macbook--4-3.webp',
        imageAlt: 'OFFSCRIPT® footer med kontakt og links på en MacBook Pro',
        aspectRatio: '4 / 3',
      },
    ],
    // Only supplies the next-project fallback; the page shows the pairs.
    horizontalTopHidden: true,
    horizontalTop: { imageSrc: null, imageAlt: 'OFFSCRIPT® forside', aspectRatio: '16 / 9', placeholderClassName: GREY },
    horizontalBottomPair: [
      { imageSrc: '/cases/offscript/phone-kontakt--4-3.webp', imageAlt: 'OFFSCRIPT® kontaktsiden på en iPhone', aspectRatio: '4 / 3' },
      { imageSrc: '/cases/offscript/phone-genrer--4-3.webp', imageAlt: 'OFFSCRIPT® genrer på en iPhone', aspectRatio: '4 / 3' },
    ],
    // Under the results: a recording of the real site on a MacBook (the genres on the home page hovered, a click, the page
    // transition and the genre page loading).
    afterResults: {
      imageSrc: '/cases/offscript/macbook-genrer--4-3.webp',
      imageAlt: 'OFFSCRIPT®: genrerne på forsiden, et klik og overgangen til genresiden på en MacBook',
      aspectRatio: '4 / 3',
      video: {
        src: '/cases/offscript/macbook-genrer--4-3.mp4',
        poster: '/cases/offscript/macbook-genrer--poster--4-3.webp',
      },
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
    'rethink-furniture': 'Projektbilleder fra Rethink Furniture',
    'fresh-cut': 'Projektbilleder fra Fresh Cut',
    'peter-salling': 'Projektbilleder fra Peter Salling',
    offscript: 'Projektbilleder fra OFFSCRIPT®',
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
