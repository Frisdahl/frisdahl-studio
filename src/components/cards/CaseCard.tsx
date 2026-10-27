import { Link } from 'react-router-dom'
import { IMAGE_SIZES, responsiveImageProps } from '../../lib/responsiveImage'

export interface CaseCardProps {
  client: string
  keywords: string
  imageSrc: string | null
  imageAlt: string
  href: string
  viewCaseLabel: string
}

/** One home-page case row: the image on the left, title and keywords at its top right. */
export function CaseCard({
  client,
  keywords,
  imageSrc,
  imageAlt,
  href,
  viewCaseLabel,
}: CaseCardProps) {
  return (
    <Link to={href} className="case-card group" aria-label={`${viewCaseLabel}: ${client}`}>
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

      <div className="case-card-meta">
        {/* The section has no heading, so each title is the h2 under the hero's h1. */}
        <h2 className="case-card-client">{client}</h2>
        <p className="case-card-keywords">{keywords}</p>
      </div>
    </Link>
  )
}
