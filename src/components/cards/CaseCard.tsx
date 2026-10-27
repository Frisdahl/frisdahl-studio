import { Link } from 'react-router-dom'
import { IMAGE_SIZES, responsiveImageProps } from '../../lib/responsiveImage'
import { CtaPillButton } from '../ui/CtaPillButton'

export interface CaseCardMeta {
  label: string
  /** null shows a dash until the value exists. */
  value: string | null
}

export interface CaseCardProps {
  client: string
  keywords: string
  description: string
  meta: CaseCardMeta[]
  imageSrc: string | null
  imageAlt: string
  href: string
  linkLabel: string
}

/**
 * One home-page case row: the image on the left; title, keywords, description,
 * a three-column meta row and a CTA at its top right. The image, the title and
 * the CTA link to the case.
 */
export function CaseCard({
  client,
  keywords,
  description,
  meta,
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
        {/* The section has no heading, so each title is the h2 under the hero's h1. */}
        <h2 className="case-card-client">
          <Link to={href} className="case-card-title-link">
            {client}
          </Link>
        </h2>
        <p className="case-card-keywords">{keywords}</p>
        {description ? <p className="case-card-description">{description}</p> : null}

        <dl className="case-card-facts">
          {meta.map(({ label, value }) => (
            <div key={label} className="case-card-fact">
              <dt className="case-card-fact-label">{label}</dt>
              <dd className="case-card-fact-value">{value ?? '—'}</dd>
            </div>
          ))}
        </dl>

        {/* The header contact button's style; its colours follow the section (see .home-cases). */}
        <CtaPillButton href={href} className="header-contact case-card-button" fillOnHover>
          {linkLabel}
        </CtaPillButton>
      </div>
    </div>
  )
}
