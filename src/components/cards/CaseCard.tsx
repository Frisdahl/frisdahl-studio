import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { IMAGE_SIZES, responsiveImageProps } from '../../lib/responsiveImage'
import { ArrowIcon } from '../ui/ArrowIcon'

export interface CaseCardProps {
  client: string
  keywords: string
  imageSrc: string | null
  imageAlt: string
  href: string
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
export function CaseCard({ client, keywords, imageSrc, imageAlt, href }: CaseCardProps) {
  // The title's arrow: waits at the bottom left ('idle'), slides in on hover ('in'),
  // leaves at the top right when the mouse does ('out'), then waits again.
  const [arrow, setArrow] = useState<'idle' | 'in' | 'out'>('idle')
  // The arrow has arrived (its slide in is done); until then a leaving mouse has to wait.
  const arrived = useRef(false)
  const leaveWhenArrived = useRef(false)

  return (
    <div className="case-card">
      <div className="case-card-meta">
        {/* Each title is an h3 under the section's "Latest projects" h2. */}
        <div className="case-card-title-row">
          <h3 className="case-card-client">
            <Link to={href} className="case-card-title-link">
              {client}
            </Link>
          </h3>
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
              {/* The site's arrow, turned to point up to the right corner. */}
              <ArrowIcon rotate={-45} width="100%" height="100%" />
            </span>
          </span>
        </div>
        <p className="case-card-keywords">{keywords}</p>
      </div>

      {/* Same target as the title link, so it's left out of the tab order and
          the accessibility tree to avoid a duplicate link. */}
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
        </div>
      </Link>
    </div>
  )
}
