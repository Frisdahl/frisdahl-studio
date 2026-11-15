import { useEffect, useRef, useState } from 'react'
import type { CaseDetailGallery, CaseDetailGalleryImage } from '../../types/caseDetail'
import { IMAGE_SIZES, responsiveImageProps } from '../../lib/responsiveImage'
import { Container } from '../ui'
import { LoopVideo } from '../ui/LoopVideo'

interface CaseDetailGalleryProps {
  gallery: CaseDetailGallery
}

interface GalleryFigureProps {
  image: CaseDetailGalleryImage
  variant: 'horizontal' | 'vertical'
  /** Solid colour behind an image with a transparent background. */
  background?: string
}

// How long each picture stays before the next one fades in (ms).
const SLIDE_DWELL = 3400

/**
 * Crossfades through a case's pictures, one after another. The next one fades (and settles from a
 * slight zoom) in over the one before it. It only runs while on screen, and with reduced motion it
 * stays on the first picture.
 */
function GallerySlideshow({ slides }: { slides: CaseDetailGalleryImage[] }) {
  const root = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = root.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.35 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible || slides.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setTimeout(() => setActive((index) => (index + 1) % slides.length), SLIDE_DWELL)
    return () => window.clearTimeout(timer)
  }, [visible, active, slides.length])

  return (
    <div ref={root} className="case-detail-slideshow">
      {slides.map((slide, index) => (
        <div
          key={slide.imageSrc}
          className={`case-detail-slideshow-slide${index === active ? ' is-active' : ''}`}
          style={{ backgroundColor: slide.background }}
          aria-hidden={index === active ? undefined : true}
        >
          <img
            {...responsiveImageProps(slide.imageSrc ?? '', IMAGE_SIZES.halfContainer)}
            alt={slide.imageAlt}
            className="case-detail-slideshow-image"
            loading="lazy"
            decoding="async"
          />
        </div>
      ))}
    </div>
  )
}

function GalleryFigure({ image, variant, background }: GalleryFigureProps) {
  return (
    <figure
      className={`case-detail-gallery-item case-detail-gallery-item-${variant}${image.transparent ? ' case-detail-gallery-item-transparent' : ''}`}
      style={{
        aspectRatio: image.aspectRatio,
        backgroundColor: image.transparent ? background : undefined,
      }}
    >
      {image.slideshow ? (
        <GallerySlideshow slides={image.slideshow} />
      ) : image.video ? (
        <LoopVideo
          src={image.video.src}
          poster={image.video.poster}
          label={image.imageAlt}
          className="h-full w-full object-cover"
          mode="visible"
        />
      ) : image.imageSrc ? (
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
              <GalleryFigure image={pair[0]} variant="vertical" background={gallery.mockupBackground} />
              <GalleryFigure image={pair[1]} variant="vertical" background={gallery.mockupBackground} />
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
              <GalleryFigure image={gallery.verticalPairTop[0]} variant="vertical" background={gallery.mockupBackground} />
              <GalleryFigure image={gallery.verticalPairTop[1]} variant="vertical" background={gallery.mockupBackground} />
            </div>
          )}

          {/* A horizontalTopPair is shown above the columns (CaseDetailIntroPair). */}
          {!gallery.horizontalTopPair && !gallery.horizontalTopHidden && (
            <GalleryFigure image={gallery.horizontalTop} variant="horizontal" background={gallery.mockupBackground} />
          )}

          {gallery.horizontalBottomPair ? (
            <div className="case-detail-gallery-pair">
              <GalleryFigure image={gallery.horizontalBottomPair[0]} variant="vertical" background={gallery.mockupBackground} />
              <GalleryFigure image={gallery.horizontalBottomPair[1]} variant="vertical" background={gallery.mockupBackground} />
            </div>
          ) : (
            gallery.horizontalBottom && <GalleryFigure image={gallery.horizontalBottom} variant="horizontal" background={gallery.mockupBackground} />
          )}

          {gallery.bottomWide ? (
            <GalleryFigure image={gallery.bottomWide} variant="horizontal" background={gallery.mockupBackground} />
          ) : (
            gallery.verticalPairBottom && (
              <div className="case-detail-gallery-pair">
                <GalleryFigure image={gallery.verticalPairBottom[0]} variant="vertical" background={gallery.mockupBackground} />
                <GalleryFigure image={gallery.verticalPairBottom[1]} variant="vertical" background={gallery.mockupBackground} />
              </div>
            )
          )}
        </div>
      </Container>
    </section>
  )
}

/** The image under the colour palette, when a case has one (afterPalette). */
export function CaseDetailAfterPalette({ gallery }: CaseDetailGalleryProps) {
  if (!gallery.afterPalette) return null

  return (
    <section className="case-detail-after-palette" aria-label={gallery.ariaLabel}>
      <Container>
        <GalleryFigure image={gallery.afterPalette} variant="horizontal" background={gallery.mockupBackground} />
      </Container>
    </section>
  )
}
