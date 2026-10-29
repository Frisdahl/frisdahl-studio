import type { CaseDetailGallery, CaseDetailGalleryImage } from '../types/caseDetail'
import type { Locale } from './navigation'

type CaseGalleryAssets = Omit<CaseDetailGallery, 'ariaLabel'>

const placeholderPair = (
  altA: string,
  altB: string,
): [CaseDetailGalleryImage, CaseDetailGalleryImage] => [
  { imageSrc: null, imageAlt: altA, placeholderClassName: 'bg-peach' },
  { imageSrc: null, imageAlt: altB, placeholderClassName: 'bg-peach-hover' },
]

const caseGalleryAssets: Record<string, CaseGalleryAssets> = {
  nordwear: {
    horizontalTop: {
      imageSrc: '/cases/nordwear/category--16-9.jpg',
      imageAlt: 'Nordwear kategori',
    },
    horizontalTopPair: [
      { imageSrc: '/cases/nordwear/nordwear-mockup-alle-produkter--3-2.webp', imageAlt: 'Nordwear produktoversigt på en MacBook', aspectRatio: '3 / 2' },
      { imageSrc: '/cases/nordwear/nordwear-mockup-produktside--3-2.webp', imageAlt: 'Nordwear produktside på en MacBook', aspectRatio: '3 / 2' },
    ],
    introPair: [
      { imageSrc: '/cases/nordwear/nordwear-macbook-right--5-4.webp', imageAlt: 'Nordwear hjemmeside på en bærbar (højre)', aspectRatio: '5 / 4', transparent: true },
      { imageSrc: '/cases/nordwear/nordwear-macbook-left--5-4.webp', imageAlt: 'Nordwear hjemmeside på en bærbar (venstre)', aspectRatio: '5 / 4', transparent: true },
    ],
    bottomWide: {
      imageSrc: '/cases/nordwear/nordwear-ipad-produktside--3-2.webp',
      imageAlt: 'Nordwear produktside på en iPad',
      aspectRatio: '3 / 2',
    },
    verticalPairBottom: [
      { imageSrc: '/cases/nordwear/mobile--5-6.jpg', imageAlt: 'Nordwear forside' },
      { imageSrc: '/cases/nordwear/mobile2--5-6.jpg', imageAlt: 'Nordwear mobilvisning' },
    ],
    horizontalBottom: {
      imageSrc: '/cases/nordwear/production--16-9.jpg',
      imageAlt: 'Nordwear oversigt',
    },
    horizontalBottomPair: [
      { imageSrc: '/cases/nordwear/nordwear-iphones-forside--3-2.webp', imageAlt: 'Nordwear forside og produktside på to iPhones', aspectRatio: '3 / 2', transparent: true },
      { imageSrc: '/cases/nordwear/nordwear-iphones-produkter--3-2.webp', imageAlt: 'Nordwear produktoversigt og produktinfo på to iPhones', aspectRatio: '3 / 2', transparent: true },
    ],
  },
  'fresh-cut': {
    horizontalTop: {
      imageSrc: '/cases/fresh-cut/thumbnail--16-9.jpg',
      imageAlt: 'Fresh Cut forside',
    },
    verticalPairTop: [
      { imageSrc: '/cases/fresh-cut/mobile1--5-6.jpg', imageAlt: 'Fresh Cut booking' },
      { imageSrc: '/cases/fresh-cut/mobile2--5-6.jpg', imageAlt: 'Fresh Cut ydelser' },
    ],
    verticalPairBottom: [
      { imageSrc: '/cases/fresh-cut/mobile2--5-6.jpg', imageAlt: 'Fresh Cut mobilvisning' },
      { imageSrc: '/cases/fresh-cut/mobile1--5-6.jpg', imageAlt: 'Fresh Cut stemning' },
    ],
    horizontalBottom: {
      imageSrc: '/cases/fresh-cut/thumbnail--16-9.jpg',
      imageAlt: 'Fresh Cut oversigt',
    },
  },
  'peter-salling': {
    introPair: [
      { imageSrc: '/cases/peter-salling/mobiler-projektsider--4-3.webp', imageAlt: 'Trailer, premierebilleder og festivalpriser på tre iPhones', aspectRatio: '4 / 3', transparent: true },
      { imageSrc: '/cases/peter-salling/mobiler-forside-strandet--4-3.webp', imageAlt: 'Forsiden og Strandet på to iPhones', aspectRatio: '4 / 3', transparent: true },
    ],
    horizontalTop: {
      imageSrc: '/cases/peter-salling/forside--16-9.webp',
      imageAlt: 'Peter Sallings forside med kortfilmen Sælhud',
    },
    horizontalBottom: {
      imageSrc: '/cases/peter-salling/projektside--16-9.webp',
      imageAlt: 'Peter Sallings projektside for Sælhud',
    },
    verticalPairBottom: [
      { imageSrc: '/cases/peter-salling/mobil-top--5-6.webp', imageAlt: 'Peter Sallings forside på mobil' },
      { imageSrc: '/cases/peter-salling/mobil-bund--5-6.webp', imageAlt: 'Peter Sallings projekter på mobil' },
    ],
  },
  'det-kollektive-klaedeskab': {
    horizontalTop: {
      imageSrc: '/cases/det-kollektive-klaedeskab/forside--16-9.webp',
      imageAlt: 'Det Kollektive Klædeskabs forside',
    },
    horizontalBottom: {
      imageSrc: '/cases/det-kollektive-klaedeskab/nyeste-fund--16-9.webp',
      imageAlt: 'Nyeste fund i garderoben',
    },
    verticalPairBottom: [
      { imageSrc: '/cases/det-kollektive-klaedeskab/mobil-top--5-6.webp', imageAlt: 'Det Kollektive Klædeskabs forside på mobil' },
      { imageSrc: '/cases/det-kollektive-klaedeskab/mobil-bund--5-6.webp', imageAlt: 'Det Kollektive Klædeskab på mobil' },
    ],
  },
  northline: {
    horizontalTop: {
      imageSrc: null,
      imageAlt: 'Northline forside',
      placeholderClassName: 'bg-peach',
    },
    verticalPairTop: placeholderPair('Northline content', 'Northline tone of voice'),
    verticalPairBottom: placeholderPair('Northline artikel', 'Northline strategi'),
    horizontalBottom: {
      imageSrc: null,
      imageAlt: 'Northline oversigt',
      placeholderClassName: 'bg-peach-hover',
    },
  },
  'urban-supply': {
    horizontalTop: {
      imageSrc: null,
      imageAlt: 'Urban Supply shop',
      placeholderClassName: 'bg-peach-hover',
    },
    verticalPairTop: placeholderPair('Urban Supply produktkatalog', 'Urban Supply kategori'),
    verticalPairBottom: placeholderPair('Urban Supply produktside', 'Urban Supply kurv'),
    horizontalBottom: {
      imageSrc: null,
      imageAlt: 'Urban Supply oversigt',
      placeholderClassName: 'bg-peach',
    },
  },
}

const caseGalleryAriaLabels: Record<Locale, Record<string, string>> = {
  da: {
    nordwear: 'Projektbilleder fra Nordwear',
    'fresh-cut': 'Projektbilleder fra Fresh Cut',
    'peter-salling': 'Projektbilleder fra Peter Salling',
    'det-kollektive-klaedeskab': 'Projektbilleder fra Det Kollektive Klædeskab',
    northline: 'Projektbilleder fra Northline',
    'urban-supply': 'Projektbilleder fra Urban Supply',
  },
  en: {
    nordwear: 'Project images from Nordwear',
    'fresh-cut': 'Project images from Fresh Cut',
    'peter-salling': 'Project images from Peter Salling',
    'det-kollektive-klaedeskab': 'Project images from Det Kollektive Klædeskab',
    northline: 'Project images from Northline',
    'urban-supply': 'Project images from Urban Supply',
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
