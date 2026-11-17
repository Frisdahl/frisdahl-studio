import { Fragment, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { IMAGE_SIZES, responsiveImageProps } from '../../lib/responsiveImage'
import type { CaseDetailGalleryVideo } from '../../types/caseDetail'
import { ArrowIcon } from '../ui/ArrowIcon'
import { LoopVideo } from '../ui/LoopVideo'
import { MaskedLineReveal } from '../ui/MaskedLineReveal'
import { DUR, EASE, STAGGER } from '../../lib/motion'

/**
 * The row's text rises once, when the row's top reaches 78% of the screen: the same line rise
 * the page used before it was moved onto MaskedLineReveal (1 s, power3.out, 0.08 s between lines),
 * with the split undone afterwards so the shared-image transition finds plain text. The keywords
 * start one stagger step after the title, as when both were split together.
 */
const ROW_REVEAL = {
  trigger: 'view',
  start: 'top 78%',
  triggerClosest: '.case-card',
  duration: DUR.line,
  stagger: STAGGER.lines,
  ease: EASE.rise,
  revertWhenDone: true,
} as const

export interface CaseCardProps {
  client: string
  keywords: string
  imageSrc: string | null
  imageAlt: string
  /** The image as a clip: plays while the card is on screen and stops when it scrolls out of view. */
  video?: CaseDetailGalleryVideo
  /** The case page; empty means there is none yet and the card is not a link. */
  href: string
  /** Title and keywords on the picture (bottom left, on a soft dark gradient) instead of beside it:
   *  the home page's project grid. The card then has no arrow; the cursor label stands in for it. */
  overlay?: boolean
  /** Extra classes for the card (layout modifiers such as the wide card). */
  className?: string
  /** Put the title and keywords under the image instead of above it. */
  metaBelow?: boolean
  /** The arrow that slides in to the left of the title on hover (default on). */
  showArrow?: boolean
  /** Title and keywords rise line by line out of their masks once the row scrolls in (the home
   *  page). Off where the page's own entrance already animates the text. */
  revealOnScroll?: boolean
}

/**
 * The keywords arrive as one string with " • " between them. The font draws that
 * bullet as a small square, so each separator becomes a round dot (CSS), and
 * stays out of the accessibility tree.
 */
function keywordsWithDots(keywords: string) {
  return keywords.split(' • ').map((word, index) => (
    <Fragment key={word}>
      {index > 0 && <span className="case-card-dot" aria-hidden="true" />}
      <span className="case-card-keyword">{word}</span>
    </Fragment>
  ))
}

/**
 * One home-page case row: the title (left) and the keywords (far right) in a
 * row above the 16:9 image, which spans the content width. The image and the
 * title link to the case.
 * Hovering the image zooms it slightly (CSS: .case-card-image in index.css) and slides
 * an arrow in from the bottom left to the right of the title. The arrow always plays
 * its full slide in: if the mouse leaves before it has arrived, it finishes arriving
 * and then carries on to the top right.
 */
export function CaseCard({ client, keywords, imageSrc, imageAlt, video, href, overlay = false, className = '', metaBelow = false, showArrow = true, revealOnScroll = false }: CaseCardProps) {
  // The title's arrow: waits out of sight to the left ('idle'), slides in on hover ('in'),
  // leaves to the right when the mouse does ('out'), then waits again.
  const [arrow, setArrow] = useState<'idle' | 'in' | 'out'>('idle')
  // The arrow has arrived (its slide in is done); until then a leaving mouse has to wait.
  const arrived = useRef(false)
  const leaveWhenArrived = useRef(false)

  return (
    <div className={`case-card${metaBelow ? ' case-card-meta-below' : ''}${overlay ? ' case-card-overlay' : ''}${className ? ` ${className}` : ''}`}>
      <div className="case-card-meta">
        {/* Each title is an h3 under the section's "Latest projects" h2. */}
        <div className="case-card-title-row">
          {showArrow && !overlay && (
            <span className="case-card-arrow" aria-hidden="true">
              <span
                className={`case-card-arrow-slider${arrow === 'idle' ? '' : ` is-${arrow}`}`}
                onTransitionEnd={(event) => {
                  if (event.target !== event.currentTarget || event.propertyName !== 'transform') return
                  if (arrow === 'in') {
                    arrived.current = true
                    if (leaveWhenArrived.current) {
                      leaveWhenArrived.current = false
                      setArrow('out')
                    }
                  } else if (arrow === 'out') {
                    setArrow('idle')
                  }
                }}
              >
                {/* The site's arrow, pointing right: at the title it stands to the left of. */}
                <ArrowIcon width="100%" height="100%" />
              </span>
            </span>
          )}
          {revealOnScroll ? (
            <MaskedLineReveal as="h3" className="case-card-client" {...ROW_REVEAL}>
              {href ? (
                <Link to={href} className="case-card-title-link">
                  {client}
                </Link>
              ) : (
                client
              )}
            </MaskedLineReveal>
          ) : (
            <h3 className="case-card-client">
              {href ? (
                <Link to={href} className="case-card-title-link">
                  {client}
                </Link>
              ) : (
                client
              )}
            </h3>
          )}
        </div>
        {revealOnScroll ? (
          <MaskedLineReveal as="p" className="case-card-keywords" {...ROW_REVEAL} delay={STAGGER.lines}>
            {keywordsWithDots(keywords)}
          </MaskedLineReveal>
        ) : (
          <p className="case-card-keywords">{keywordsWithDots(keywords)}</p>
        )}
      </div>

      {/* Same target as the title link, so it's left out of the tab order and
          the accessibility tree to avoid a duplicate link. */}
      {href ? (
        <Link
        to={href}
        className="case-card-media-link"
        tabIndex={-1}
        aria-hidden="true"
        onMouseEnter={() => {
          // Touch screens have no hover, only a tap that follows the link.
          if (!window.matchMedia('(hover: hover)').matches) return
          leaveWhenArrived.current = false
          // Coming back while it is still leaving: it slides in again from where it is.
          if (arrow !== 'in') arrived.current = false
          setArrow('in')
        }}
        onMouseLeave={() => {
          if (arrow !== 'in') return
          // Still sliding in: let it arrive first, then it leaves (see onTransitionEnd).
          // (With reduced motion nothing slides, so there is nothing to wait for.)
          if (arrived.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) setArrow('out')
          else leaveWhenArrived.current = true
        }}
      >
        <div className="case-card-media">
          {imageSrc ? (
            <img
              {...responsiveImageProps(imageSrc, IMAGE_SIZES.container)}
              alt={imageAlt}
              className="case-card-image"
              loading="lazy"
              decoding="async"
            />
          ) : null}
          {imageSrc && video ? (
            // Over the picture, with its box (and so its hover zoom). The picture stays underneath: the
            // shared page transition and the layout rely on it.
            <LoopVideo
              src={video.src}
              poster={video.poster}
              label={imageAlt}
              className="case-card-image case-card-video"
              mode="visible"
            />
          ) : null}
        </div>
        </Link>
      ) : (
        <div className="case-card-media-link" data-static>
        <div className="case-card-media">
          {imageSrc ? (
            <img
              {...responsiveImageProps(imageSrc, IMAGE_SIZES.container)}
              alt={imageAlt}
              className="case-card-image"
              loading="lazy"
              decoding="async"
            />
          ) : null}
          {imageSrc && video ? (
            // Over the picture, with its box (and so its hover zoom). The picture stays underneath: the
            // shared page transition and the layout rely on it.
            <LoopVideo
              src={video.src}
              poster={video.poster}
              label={imageAlt}
              className="case-card-image case-card-video"
              mode="visible"
            />
          ) : null}
        </div>
        </div>
      )}
    </div>
  )
}
