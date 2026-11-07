import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { IMAGE_SIZES, responsiveImageProps } from '../../lib/responsiveImage'
import type { CasePreviewImage } from '../../data/caseDetails'
import { ArrowIcon } from '../ui/ArrowIcon'

export interface CaseCardProps {
  client: string
  keywords: string
  imageSrc: string | null
  imageAlt: string
  href: string
  /** The images of the case's page, flashed through in the hover preview. */
  previewImages?: CasePreviewImage[]
  /** The text shown under the hover preview, e.g. "Se projekt". */
  linkLabel?: string
}

/** How long each preview image shows while the project is hovered. */
const FLASH_MS = 450
/** How long the preview takes to close (the clip-path transition in index.css). */
const CLOSE_MS = 1000

/**
 * One home-page case row: the 16:9 image across the content width with the
 * title and the keywords underneath. The image and the title link to the case.
 * Hovering the image darkens it and opens the case page's first image in the
 * middle (to half the width) with the link text under it; the image then
 * flashes through the page's images in a loop (CSS: .case-card-hover in
 * index.css).
 */
export function CaseCard({
  client,
  keywords,
  imageSrc,
  imageAlt,
  href,
  previewImages = [],
  linkLabel,
}: CaseCardProps) {
  const [hovered, setHovered] = useState(false)
  // The images after the first (which the card already shows) are only added
  // on the first hover, so the page doesn't load them up front.
  const [armed, setArmed] = useState(false)
  const [flash, setFlash] = useState(0)
  // Which preview images have finished loading: the loop only shows those, so
  // a picture that is still arriving never shows up as an empty frame.
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set())
  const resetTimer = useRef<number | null>(null)
  const count = previewImages.length

  const markLoaded = useCallback((index: number) => {
    setLoaded((current) => (current.has(index) ? current : new Set(current).add(index)))
  }, [])

  useEffect(() => {
    if (!hovered || count < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => {
      setFlash((current) => {
        for (let step = 1; step <= count; step += 1) {
          const candidate = (current + step) % count
          if (loaded.has(candidate)) return candidate
        }
        return current
      })
    }, FLASH_MS)
    return () => window.clearInterval(id)
  }, [hovered, count, loaded])

  useEffect(() => () => {
    if (resetTimer.current !== null) window.clearTimeout(resetTimer.current)
  }, [])

  const handleEnter = () => {
    // Coming back while the preview is still closing: carry on with the same
    // picture instead of jumping back to the first one.
    if (resetTimer.current !== null) {
      window.clearTimeout(resetTimer.current)
      resetTimer.current = null
    }
    setHovered(true)
    setArmed(true)
  }

  const handleLeave = () => {
    setHovered(false)
    // The picture stays as it is while the preview closes, and only goes back
    // to the first one once it is fully closed, ready for the next hover.
    resetTimer.current = window.setTimeout(() => {
      resetTimer.current = null
      setFlash(0)
    }, CLOSE_MS + 100)
  }

  return (
    <div className="case-card">
      {/* Same target as the title link, so it's left out of the tab order and
          the accessibility tree to avoid a duplicate link. */}
      <Link
        to={href}
        className="case-card-media-link"
        tabIndex={-1}
        aria-hidden="true"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <div className="case-card-media">
          {imageSrc ? (
            <img
              {...responsiveImageProps(imageSrc, IMAGE_SIZES.container)}
              alt={imageAlt}
              className="case-card-image"
              loading="lazy"
              decoding="async"
            />
          ) : null}

          {count > 0 ? (
            <div className="case-card-hover">
              <div className="case-card-preview">
                {previewImages.map((image, index) =>
                  index === 0 || armed ? (
                    <img
                      key={image.imageSrc}
                      ref={(element) => {
                        if (element?.complete && element.naturalWidth > 0) markLoaded(index)
                      }}
                      {...responsiveImageProps(image.imageSrc, '(min-width: 64rem) 40vw, 60vw')}
                      alt=""
                      className={`case-card-preview-image${index === flash ? ' is-on' : ''}`}
                      onLoad={() => markLoaded(index)}
                      decoding="sync"
                    />
                  ) : null,
                )}
              </div>
              {linkLabel ? (
                <span className="case-card-hover-label">
                  {linkLabel}
                  {/* The site's arrow, turned to point up to the right corner. */}
                  <ArrowIcon rotate={-45} />
                </span>
              ) : null}
            </div>
          ) : null}
        </div>
      </Link>

      <div className="case-card-meta">
        {/* Each title is an h3 under the section's "Latest projects" h2. */}
        <h3 className="case-card-client">
          <Link to={href} className="case-card-title-link">
            {client}
          </Link>
        </h3>
        <p className="case-card-keywords">{keywords}</p>
      </div>
    </div>
  )
}
