import type { Ref } from 'react'
import { IMAGE_SIZES, responsiveImageProps } from '../../lib/responsiveImage'
import type { CaseDetailGalleryVideo } from '../../types/caseDetail'
import { LoopVideo } from '../ui/LoopVideo'

export interface CaseMediaProps {
  imageSrc: string | null
  imageAlt: string
  /** The picture as a clip, over the still: the still stays underneath (the shared page transition and the
   *  layout rely on it). */
  video?: CaseDetailGalleryVideo
  /** The classes the variant's own CSS and the page transition (lib/sharedCaseTransition.ts) look for. */
  imageClassName?: string
  videoClassName?: string
  imageRef?: Ref<HTMLImageElement & HTMLDivElement>
  videoRef?: Ref<HTMLVideoElement>
  /** Classes for a plain coloured block shown when the case has no picture yet (nothing is shown if left out). */
  placeholderClassName?: string
  /** The dark layer over the picture that keeps the caption readable: a soft gradient at the foot of it
   *  (the grid cards), a flat dark layer all over it (the next-project card), or none. */
  scrim?: 'gradient' | 'flat' | 'none'
  /** 'visible': the clip plays by itself while on screen. 'manual': the parent decides. */
  videoMode?: 'visible' | 'manual'
  preload?: 'none' | 'metadata' | 'auto'
  /** The clip shares the decoder with the other clips of its grid (see LoopVideo). */
  sharedDecoder?: boolean
  /** The clip's accessible name (default: the picture's description). */
  videoLabel?: string
  /** The width the picture is drawn at, as an HTML `sizes` value, so the browser picks the smallest file that
   *  is still sharp (default: the full content width, which is too big for a card that is narrower). */
  imageSizes?: string
  /** The picture is on the first screen: load it at once and first (it is the page's largest paint). */
  priority?: boolean
  /** Leave out the clip's poster. The still under the clip is the same picture and already shown, so the poster
   *  would only be downloaded a second time. */
  omitPoster?: boolean
}

/**
 * The picture, its clip and the dark layer over them, for every project card: the home page's grid and the
 * /cases list (CaseCard) and the next-project card at the end of a case page. The box around it is the
 * caller's (it must be `position: relative` and clip its overflow). One place for how a project's picture is
 * drawn, so a change here reaches all of them; the caption on top is each card's own.
 */
export function CaseMedia({
  imageSrc,
  imageAlt,
  video,
  imageClassName = '',
  videoClassName = '',
  imageRef,
  videoRef,
  placeholderClassName,
  scrim = 'none',
  videoMode = 'visible',
  preload,
  sharedDecoder = false,
  videoLabel,
  imageSizes,
  priority = false,
  omitPoster = false,
}: CaseMediaProps) {
  return (
    <>
      {imageSrc ? (
        <img
          ref={imageRef}
          {...responsiveImageProps(imageSrc, imageSizes ?? IMAGE_SIZES.container)}
          alt={imageAlt}
          className={`case-media-image ${imageClassName}`}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
        />
      ) : placeholderClassName ? (
        <div ref={imageRef} className={`case-media-image ${imageClassName} ${placeholderClassName}`} aria-hidden="true" />
      ) : null}

      {imageSrc && video ? (
        <LoopVideo
          ref={videoRef}
          src={video.src}
          poster={omitPoster ? undefined : video.poster}
          label={videoLabel ?? imageAlt}
          className={`case-media-video ${videoClassName}`}
          mode={videoMode}
          preload={preload}
          shared={sharedDecoder}
        />
      ) : null}

      {scrim !== 'none' ? <div className={`case-media-scrim case-media-scrim--${scrim}`} aria-hidden="true" /> : null}
    </>
  )
}
