import { Link } from 'react-router-dom'
import { IMAGE_SIZES, responsiveImageProps } from '../../lib/responsiveImage'

export interface CaseCardProps {
  client: string
  keywords: string
  imageSrc: string | null
  imageAlt: string
  href: string
  linkLabel: string
}

/**
 * One home-page case row: the image on the left, title and keywords at its
 * top right. Only the image and the title link to the case; hovering either
 * lights up the "[se projekt]" label next to the title.
 */
export function CaseCard({ client, keywords, imageSrc, imageAlt, href, linkLabel }: CaseCardProps) {
  return (
    <div className="case-card">
      {/* Same target as the title link, so it's left out of the tab order and
          the accessibility tree to avoid a duplicate link. */}
      <Link to={href} className="case-card-media-link" tabIndex={-1} aria-hidden="true">
        <div className="case-card-media">
          {imageSrc ? (
            <img
              {...responsiveImageProps(imageSrc, IMAGE_SIZES.homeCaseRow)}
              alt={imageAlt}
              className="case-card-image"
              loading="lazy"
              decoding="async"
            />
          ) : null}
        </div>
      </Link>

      <div className="case-card-meta">
        {/* The section has no heading, so each title is the h2 under the hero's h1. */}
        <h2 className="case-card-client">
          <Link to={href} className="case-card-title-link">
            {client}
            <span className="case-card-cta">[{linkLabel}]</span>
          </Link>
        </h2>
        <p className="case-card-keywords">{keywords}</p>
      </div>
    </div>
  )
}
