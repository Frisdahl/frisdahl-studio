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
 * One home-page case row: the 16:9 image on one side of the content area (the
 * side alternates per row, see .case-card in index.css) and the text beside
 * it, lined up with the image's bottom edge. The image, the title and the CTA
 * link to the case.
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
        <div className="case-card-body">
          {/* Each element sits in its own mask ("case-card-line") so the desktop
              stage can slide it up out of view (see CasesSection). */}
          {/* Each title is an h3 under the section's "Latest projects" h2. */}
          <div className="case-card-line">
            <h3 className="case-card-client">
              <Link to={href} className="case-card-title-link">
                {client}
              </Link>
            </h3>
          </div>
          <div className="case-card-line">
            <p className="case-card-keywords">{keywords}</p>
          </div>
          {description ? (
            <div className="case-card-line">
              <p className="case-card-description">{description}</p>
            </div>
          ) : null}

          {/* Same text + arrow-chip button as the project page hero. */}
          <div className="case-card-line">
            <ArrowChipButton
              direction="right"
              label={linkLabel}
              text={linkLabel}
              href={href}
              className="case-card-button"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
