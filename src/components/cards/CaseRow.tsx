import { type CSSProperties } from 'react'
import { Link } from 'react-router-dom'

export interface CaseRowProps {
  client: string
  industry: string
  href: string
  imageSrc: string | null
  imageAlt: string
  keywords: string[]
  description: string
  reversed?: boolean
  panelHoverColor?: string
  placeholderClassName?: string
}

export function CaseRow({
  client,
  industry,
  href,
  imageSrc,
  imageAlt,
  keywords,
  description,
  reversed = false,
  panelHoverColor,
  placeholderClassName = 'bg-peach',
}: CaseRowProps) {
  const panelStyle = panelHoverColor
    ? ({ '--case-panel-hover': panelHoverColor } as CSSProperties)
    : undefined

  return (
    <Link to={href} className="case-row group block">
      <div className={`case-row-grid ${reversed ? 'case-row-grid-reversed' : ''}`.trim()}>
        <div className="case-row-panel" style={panelStyle}>
          <ul className="case-row-keywords" aria-label={`${client} keywords`}>
            {keywords.map((keyword) => (
              <li key={keyword}>{keyword}</li>
            ))}
          </ul>

          <div className="case-row-description-block">
            <span className="case-row-mark" aria-hidden="true">
              ✺
            </span>
            <p className="case-row-description">{description}</p>
          </div>
        </div>

        <div className="case-row-media">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={imageAlt}
              className="case-row-image"
              loading="lazy"
            />
          ) : (
            <div
              className={`case-row-image ${placeholderClassName}`}
              aria-hidden="true"
            />
          )}

          <div className="case-row-media-caption">
            <p className="case-row-media-client">{client}</p>
            <p className="case-row-media-industry">{industry}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
