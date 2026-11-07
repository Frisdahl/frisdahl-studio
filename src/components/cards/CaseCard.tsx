import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { IMAGE_SIZES, responsiveImageProps } from '../../lib/responsiveImage'
import type { CasePreviewImage } from '../../data/caseDetails'
import { ArrowIcon } from '../ui/ArrowIcon'

export interface CaseCardProps {
  client: string
  keywords: string
  imageSrc: string | null
  imageAlt: string
  href: string
  /** The images of the case's page; three of them slide in when the project is hovered. */
  previewImages?: CasePreviewImage[]
}

/** How many of the case page's images the hover shows. */
const TRIO = 3

/** Start loading the hover images once the card is this close to the screen. */
const ARM_MARGIN = '600px 0px'

/**
 * One home-page case row: the title (left) and the keywords (far right) in a
 * row above the 16:9 image, which spans the content width. The image and the
 * title link to the case.
 * Hovering the image darkens it and three of the case page's images slide in
 * along its bottom edge, the middle one from the top and the two beside it from
 * the bottom, each inside its own clipped frame (CSS: .case-card-hover in
 * index.css), and an arrow slides in from the bottom left to the right of the
 * title, leaving towards the top right when the mouse does.
 */
export function CaseCard({
  client,
  keywords,
  imageSrc,
  imageAlt,
  href,
  previewImages = [],
}: CaseCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  // The hover images are only added once the card is near the screen, so the
  // page doesn't load them up front, but they are ready by the first hover.
  const [armed, setArmed] = useState(false)
  // The title's arrow: waits at the bottom left ('idle'), slides in on hover ('in'),
  // leaves at the top right when the mouse does ('out'), then waits again.
  const [arrow, setArrow] = useState<'idle' | 'in' | 'out'>('idle')

  useEffect(() => {
    const card = cardRef.current
    if (!card || armed) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setArmed(true)
      },
      { rootMargin: ARM_MARGIN },
    )
    observer.observe(card)
    return () => observer.disconnect()
  }, [armed])

  // Not the image the card already shows.
  const trio = previewImages.filter((image) => image.imageSrc !== imageSrc).slice(0, TRIO)

  return (
    <div ref={cardRef} className="case-card">
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
                if (event.target === event.currentTarget) setArrow((state) => (state === 'out' ? 'idle' : state))
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
        onMouseEnter={() => setArrow('in')}
        onMouseLeave={() => setArrow((state) => (state === 'in' ? 'out' : state))}
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

          {trio.length === TRIO ? (
            <div className="case-card-hover">
              <div className="case-card-trio">
                {trio.map((image) => (
                  <div key={image.imageSrc} className="case-card-trio-frame">
                    {armed ? (
                      <img
                        {...responsiveImageProps(image.imageSrc, '(min-width: 64rem) 20vw, 30vw')}
                        alt=""
                        className="case-card-trio-image"
                        decoding="async"
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </Link>
    </div>
  )
}
