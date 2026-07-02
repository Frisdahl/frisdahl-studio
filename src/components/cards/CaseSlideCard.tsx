import { Link } from 'react-router-dom'

export interface CaseSlideCardProps {
  client: string
  industry: string
  href: string
  imageSrc: string | null
  imageAlt: string
  placeholderClassName?: string
}

export function CaseSlideCard({
  client,
  industry,
  href,
  imageSrc,
  imageAlt,
  placeholderClassName = 'bg-peach',
}: CaseSlideCardProps) {
  return (
    <Link
      to={href}
      className="case-slide-card group block h-full"
      draggable={false}
      onDragStart={(event) => event.preventDefault()}
    >
      <div className="case-slide-card-media">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt}
            className="case-slide-card-image"
            loading="lazy"
            draggable={false}
          />
        ) : (
          <div
            className={`case-slide-card-image ${placeholderClassName}`}
            aria-hidden="true"
          />
        )}

        <div className="case-slide-card-caption">
          <p className="case-slide-card-client">{client}</p>
          <p className="case-slide-card-industry">{industry}</p>
        </div>
      </div>
    </Link>
  )
}
