import type { CaseDetailGalleryVideo } from '../types/caseDetail'

/**
 * A case's main image as a clip: the device stays a still and only its screen plays. The card plays it on
 * hover, the case page's hero while it is on screen. The poster is the still the clip starts from.
 */
const caseMainVideos: Partial<Record<string, CaseDetailGalleryVideo>> = {
  'peter-salling': {
    src: '/cases/peter-salling/main--16-9.mp4',
    poster: '/cases/peter-salling/main--16-9.webp',
  },
}

export function getCaseMainVideo(caseSlug: string): CaseDetailGalleryVideo | undefined {
  return caseMainVideos[caseSlug]
}
