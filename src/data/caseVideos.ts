import type { CaseDetailGalleryVideo } from '../types/caseDetail'

/**
 * A case's main image as a clip: the device stays a still and only its screen plays. The card plays it on
 * hover, the case page's hero while it is on screen. The poster is the still the clip starts from.
 */
const caseMainVideos: Partial<Record<string, CaseDetailGalleryVideo>> = {
  nordwear: {
    src: '/cases/nordwear/main-v2--16-9.mp4',
    poster: '/cases/nordwear/main-v2--16-9.webp',
  },
  // A 4:3 clip of the OFFSCRIPT® site on a phone; the home card shows the middle of it (see `focus` in home.ts).
  offscript: {
    src: '/cases/offscript/mockup--4-3.mp4',
    poster: '/cases/offscript/mockup--4-3.webp',
  },
  // A 4:3 clip (2560x1920) of the Rethink Furniture home page on a MacBook Pro: the site's preloader, the hero, then a scroll
  // through the first part of the page and back; its last half second dissolves into the first frame (a seamless loop).
  // The still and the poster are the loaded hero. The home card shows the middle of it.
  'rethink-furniture': {
    src: '/cases/rethink-furniture/macbook-main-v2--4-3.mp4',
    poster: '/cases/rethink-furniture/macbook-main-v2--poster--4-3.webp',
  },
  'peter-salling': {
    src: '/cases/peter-salling/main--16-9.mp4',
    poster: '/cases/peter-salling/main--16-9.webp',
  },
}

export function getCaseMainVideo(caseSlug: string): CaseDetailGalleryVideo | undefined {
  return caseMainVideos[caseSlug]
}

/**
 * The shape (width / height) of each case's main clip and still, as the files are made. A card that shows
 * the whole clip needs it (the /cases grid); keep it in step with the files above.
 */
const caseMainAspects: Partial<Record<string, number>> = {
  nordwear: 16 / 9,
  offscript: 4 / 3,
  'rethink-furniture': 4 / 3,
  'peter-salling': 16 / 9,
}

export function getCaseMainAspect(caseSlug: string): number {
  return caseMainAspects[caseSlug] ?? 16 / 9
}
