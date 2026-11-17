import type { CaseDetailGalleryVideo } from '../types/caseDetail'

/**
 * A case's main image as a clip: the device stays a still and only its screen plays. The card plays it on
 * hover, the case page's hero while it is on screen. The poster is the still the clip starts from.
 */
const caseMainVideos: Partial<Record<string, CaseDetailGalleryVideo>> = {
  nordwear: {
    src: '/cases/nordwear/main--16-9.mp4',
    poster: '/cases/nordwear/main--16-9.webp',
  },
  // A 4:3 clip of the OFFSCRIPT® site on a phone; the home card shows the middle of it (see `focus` in home.ts).
  offscript: {
    src: '/cases/offscript/mockup--4-3.mp4',
    poster: '/cases/offscript/mockup--4-3.webp',
  },
  // A 4:3 clip of the Rethink Furniture site (preloader through to the hero) on an iPad Pro; the home card shows the middle of it.
  'rethink-furniture': {
    src: '/cases/rethink-furniture/mockup--4-3.mp4',
    poster: '/cases/rethink-furniture/mockup--4-3.webp',
  },
  'peter-salling': {
    src: '/cases/peter-salling/main--16-9.mp4',
    poster: '/cases/peter-salling/main--16-9.webp',
  },
}

export function getCaseMainVideo(caseSlug: string): CaseDetailGalleryVideo | undefined {
  return caseMainVideos[caseSlug]
}
