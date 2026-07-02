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
    verticalPairTop: [
      { imageSrc: '/cases/nordwear/production--5-6.jpg', imageAlt: 'Nordwear produktion' },
      { imageSrc: '/cases/nordwear/cart--5-6.jpg', imageAlt: 'Nordwear kurv' },
    ],
    verticalPairBottom: [
      { imageSrc: '/cases/nordwear/mobile--5-6.jpg', imageAlt: 'Nordwear forside' },
      { imageSrc: '/cases/nordwear/mobile2--5-6.jpg', imageAlt: 'Nordwear mobilvisning' },
    ],
    horizontalBottom: {
      imageSrc: '/cases/nordwear/production--16-9.jpg',
      imageAlt: 'Nordwear oversigt',
    },
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
  'atelier-noir': {
    horizontalTop: {
      imageSrc: null,
      imageAlt: 'Atelier Noir forside',
      placeholderClassName: 'bg-peach',
    },
    verticalPairTop: placeholderPair('Atelier Noir produktside', 'Atelier Noir kollektion'),
    verticalPairBottom: placeholderPair('Atelier Noir kurv', 'Atelier Noir checkout'),
    horizontalBottom: {
      imageSrc: null,
      imageAlt: 'Atelier Noir oversigt',
      placeholderClassName: 'bg-peach-hover',
    },
  },
  'forma-studio': {
    horizontalTop: {
      imageSrc: null,
      imageAlt: 'Forma Studio identitet',
      placeholderClassName: 'bg-peach-hover',
    },
    verticalPairTop: placeholderPair('Forma Studio typografi', 'Forma Studio print'),
    verticalPairBottom: placeholderPair('Forma Studio layout', 'Forma Studio guidelines'),
    horizontalBottom: {
      imageSrc: null,
      imageAlt: 'Forma Studio oversigt',
      placeholderClassName: 'bg-peach',
    },
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
    'atelier-noir': 'Projektbilleder fra Atelier Noir',
    'forma-studio': 'Projektbilleder fra Forma Studio',
    northline: 'Projektbilleder fra Northline',
    'urban-supply': 'Projektbilleder fra Urban Supply',
  },
  en: {
    nordwear: 'Project images from Nordwear',
    'fresh-cut': 'Project images from Fresh Cut',
    'atelier-noir': 'Project images from Atelier Noir',
    'forma-studio': 'Project images from Forma Studio',
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
