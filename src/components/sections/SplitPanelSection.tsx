import type { SplitPanelContent } from '../../types/splitPanel'
import { IMAGE_SIZES, responsiveImageProps } from '../../lib/responsiveImage'

interface SplitPanelSectionProps {
  content: SplitPanelContent
}

export function SplitPanelSection({ content }: SplitPanelSectionProps) {
  return (
    <section className="split-panel-section" aria-labelledby="split-panel-heading">
      <div className="split-panel">
        <div className="split-panel-content">
          <div className="split-panel-content-inner">
            <h3 id="split-panel-heading" className="split-panel-title">
              {content.title}
            </h3>
            <p className="split-panel-description mt-lg">{content.description}</p>
          </div>
        </div>

        <div className="split-panel-media">
          <div className="split-panel-media-frame">
            <img
              {...responsiveImageProps(content.imageSrc, IMAGE_SIZES.splitPanel)}
              alt={content.imageAlt}
              className="split-panel-image"
              loading="lazy"
              decoding="async"
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
