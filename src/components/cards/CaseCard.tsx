import { ArrowIcon } from '../ui/ArrowIcon'
import { Link } from 'react-router-dom'
import { IMAGE_SIZES, responsiveImageProps } from '../../lib/responsiveImage'

export interface CaseCardProps {
  client: string
  type: string
  imageSrc: string | null
  imageAlt: string
  href: string
  viewCaseLabel: string
  placeholderClassName?: string
}

export function CaseCard({
  client,
  type,
  imageSrc,
  imageAlt,
  href,
  viewCaseLabel,
  placeholderClassName = 'bg-peach',
}: CaseCardProps) {
  return (
    <Link
      to={href}
      className="case-card group block"
      aria-label={`${viewCaseLabel}: ${client}`}
    >
      <div className="case-card-media">
        {imageSrc ? (
          <img
            {...responsiveImageProps(imageSrc, IMAGE_SIZES.halfContainer)}
            alt={imageAlt}
            className="case-card-image"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div
            className={`case-card-image ${placeholderClassName}`}
            aria-hidden="true"
          />
        )}

        <span className="case-card-caption">
          <span className="case-card-client">{client}</span>
          <span className="case-card-industry">{type}</span>
        </span>

        <span className="case-card-arrow" aria-hidden="true">
          <ArrowIcon rotate={-45} />
        </span>
      </div>
    </Link>
  )
}
