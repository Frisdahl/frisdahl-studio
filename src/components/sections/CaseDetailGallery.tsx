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
    <figure className={`case-detail-gallery-item case-detail-gallery-item-${variant}`}>
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

export function CaseDetailGallery({ gallery }: CaseDetailGalleryProps) {
  return (
    <section className="case-detail-gallery-section" aria-label={gallery.ariaLabel}>
      <Container>
        <div className="case-detail-gallery">
          <GalleryFigure image={gallery.horizontalTop} variant="horizontal" />

          <div className="case-detail-gallery-pair">
            <GalleryFigure image={gallery.verticalPairTop[0]} variant="vertical" />
            <GalleryFigure image={gallery.verticalPairTop[1]} variant="vertical" />
          </div>

          <GalleryFigure image={gallery.horizontalBottom} variant="horizontal" />

          <div className="case-detail-gallery-pair">
            <GalleryFigure image={gallery.verticalPairBottom[0]} variant="vertical" />
            <GalleryFigure image={gallery.verticalPairBottom[1]} variant="vertical" />
          </div>
        </div>
      </Container>
    </section>
  )
}
