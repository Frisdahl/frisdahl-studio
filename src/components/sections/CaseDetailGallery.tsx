import type { CaseDetailGallery, CaseDetailGalleryImage } from '../../types/caseDetail'
import { IMAGE_SIZES, responsiveImageProps } from '../../lib/responsiveImage'
import { Container } from '../ui'

interface CaseDetailGalleryProps {
  gallery: CaseDetailGallery
}

interface GalleryFigureProps {
  image: CaseDetailGalleryImage
  variant: 'horizontal' | 'vertical'
}

function GalleryFigure({ image, variant }: GalleryFigureProps) {
  return (
    <figure
      className={`case-detail-gallery-item case-detail-gallery-item-${variant}${image.transparent ? ' case-detail-gallery-item-transparent' : ''}`}
      style={image.aspectRatio ? { aspectRatio: image.aspectRatio } : undefined}
    >
      {image.imageSrc ? (
        <img
          {...responsiveImageProps(
            image.imageSrc,
            // Horizontal images span the container; vertical ones come in pairs.
            variant === 'horizontal' ? IMAGE_SIZES.container : IMAGE_SIZES.halfContainer,
          )}
          alt={image.imageAlt}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div
          className={`h-full w-full ${image.placeholderClassName ?? 'bg-peach'}`}
          role="img"
          aria-label={image.imageAlt}
        />
      )}
    </figure>
  )
}

/**
 * The pairs shown under the case overview, before the columns: introPair, then
 * horizontalTopPair (which the gallery below then leaves out).
 */
export function CaseDetailIntroPair({ gallery }: CaseDetailGalleryProps) {
  const pairs = [gallery.introPair, gallery.horizontalTopPair].filter((pair) => pair !== undefined)
  if (pairs.length === 0) return null

  return (
    <section className="case-detail-intro-pair" aria-label={gallery.ariaLabel}>
      <Container>
        <div className="case-detail-gallery">
          {pairs.map((pair) => (
            <div key={pair[0].imageAlt} className="case-detail-gallery-pair">
              <GalleryFigure image={pair[0]} variant="vertical" />
              <GalleryFigure image={pair[1]} variant="vertical" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export function CaseDetailGallery({ gallery }: CaseDetailGalleryProps) {
  return (
    <section className="case-detail-gallery-section" aria-label={gallery.ariaLabel}>
      <Container>
        <div className="case-detail-gallery">
          {gallery.verticalPairTop && (
            <div className="case-detail-gallery-pair">
              <GalleryFigure image={gallery.verticalPairTop[0]} variant="vertical" />
              <GalleryFigure image={gallery.verticalPairTop[1]} variant="vertical" />
            </div>
          )}

          {/* A horizontalTopPair is shown above the columns (CaseDetailIntroPair). */}
          {!gallery.horizontalTopPair && (
            <GalleryFigure image={gallery.horizontalTop} variant="horizontal" />
          )}

          {gallery.horizontalBottomPair ? (
            <div className="case-detail-gallery-pair">
              <GalleryFigure image={gallery.horizontalBottomPair[0]} variant="vertical" />
              <GalleryFigure image={gallery.horizontalBottomPair[1]} variant="vertical" />
            </div>
          ) : (
            <GalleryFigure image={gallery.horizontalBottom} variant="horizontal" />
          )}

          {gallery.bottomWide ? (
            <GalleryFigure image={gallery.bottomWide} variant="horizontal" />
          ) : (
            <div className="case-detail-gallery-pair">
              <GalleryFigure image={gallery.verticalPairBottom[0]} variant="vertical" />
              <GalleryFigure image={gallery.verticalPairBottom[1]} variant="vertical" />
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
