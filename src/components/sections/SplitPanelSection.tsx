import type { SplitPanelContent } from '../../types/splitPanel'

interface SplitPanelSectionProps {
  content: SplitPanelContent
}

export function SplitPanelSection({ content }: SplitPanelSectionProps) {
  return (
    <section className="split-panel-section" aria-labelledby="split-panel-heading">
      <div className="split-panel">
        <div className="split-panel-content">
          <div className="split-panel-content-inner">
            <h2 id="split-panel-heading" className="split-panel-title">
              {content.title}
            </h2>
            <p className="split-panel-description mt-lg">{content.description}</p>
          </div>
        </div>

        <div className="split-panel-media">
          <div className="split-panel-media-frame">
            <img
              src={content.imageSrc}
              alt={content.imageAlt}
              className="split-panel-image"
              loading="lazy"
            />
          </div>
        </div>

        <div className="split-panel-badge-wrap" aria-hidden="true">
          <span className="split-panel-badge-ring" />
          <span className="split-panel-badge-ring split-panel-badge-ring-delayed" />
          <div className="split-panel-badge">
            <span className="split-panel-badge-text">{content.badgeLabel}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
