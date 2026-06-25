export interface CaseCardProps {
  client: string
  type: string
  imageSrc: string | null
  imageAlt: string
  href: string
  viewCaseLabel: string
  placeholderClassName?: string
}

function CaseCardArrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="11"
      viewBox="0 0 14 11"
      fill="none"
      className="case-card-action-arrow"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="m9.84 1.08 3.977 3.978a.625.625 0 0 1 0 .884L9.839 9.919a.625.625 0 0 1-.883-.884l2.91-2.91H1.375a.625.625 0 0 1 0-1.25h10.491l-2.91-2.91a.625.625 0 1 1 .883-.884"
      />
    </svg>
  )
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
    <a
      href={href}
      className="case-card group block"
      aria-label={`${viewCaseLabel}: ${client}`}
    >
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

        <span className="case-card-type">
          <span className="case-card-type-text">{type}</span>
        </span>

        <span className="case-card-action">
          <span className="case-card-action-track">
            <span className="case-card-action-label-wrap" aria-hidden="true">
              <span className="case-card-action-label">{viewCaseLabel}</span>
            </span>
            <span className="case-card-action-icon" aria-hidden="true">
              <CaseCardArrow />
            </span>
          </span>
        </span>
      </div>
    </a>
  )
}
