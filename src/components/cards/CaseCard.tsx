import { Link } from 'react-router-dom'
import { IMAGE_SIZES, responsiveImageProps } from '../../lib/responsiveImage'
import { ArrowChipButton } from '../ui/ArrowChipButton'

export interface CaseCardProps {
  client: string
  keywords: string
  description: string
  imageSrc: string | null
  imageAlt: string
  href: string
  linkLabel: string
}

/**
 * One home-page case row: the image on the left; title, keywords, description
 * and a CTA at its top right. The image, the title and the CTA link to the case.
 */
export function CaseCard({
  client,
  keywords,
  description,
  imageSrc,
  imageAlt,
  href,
  linkLabel,
}: CaseCardProps) {
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
        {/* Each title is an h3 under the section's "Latest projects" h2. */}
        <h3 className="case-card-client">
          <Link to={href} className="case-card-title-link">
            {client}
          </Link>
        </h3>
        <p className="case-card-keywords">{keywords}</p>
        {description ? <p className="case-card-description">{description}</p> : null}

        {/* Same text + arrow-chip button as the project page hero. */}
        <ArrowChipButton
          direction="right"
          label={linkLabel}
          text={linkLabel}
          href={href}
          className="case-card-button"
        />
      </div>
    </div>
  )
}
