export interface CaseCardProps {
  client: string
  type: string
  imageSrc: string | null
  imageAlt: string
  href: string
  placeholderClassName?: string
}

export function CaseCard({
  client,
  type,
  imageSrc,
  imageAlt,
  href,
  placeholderClassName = 'bg-peach',
}: CaseCardProps) {
  return (
    <a href={href} className="case-card group block">
      <div className="case-card-media">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt}
            className="case-card-image"
            loading="lazy"
          />
        ) : (
          <div
            className={`case-card-image ${placeholderClassName}`}
            aria-hidden="true"
          />
        )}

        <span className="case-card-type">{type}</span>
        <span className="case-card-client">{client}</span>
      </div>
    </a>
  )
}
