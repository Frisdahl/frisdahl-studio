import { useState, useEffect, useRef } from 'react'
import type { SplitPanelContent, SplitPanelImage } from '../../types/splitPanel'

interface SplitPanelSectionProps {
  content: SplitPanelContent
}

export function SplitPanelSection({ content }: SplitPanelSectionProps) {
  const { title, description, images } = content
  const [currentIndex, setCurrentIndex] = useState(0)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    let cancelled = false

    const startAutoSlide = () => {
      if (cancelled) return
      timerRef.current = window.setTimeout(() => {
        if (cancelled) return
        setCurrentIndex((i) => (i + 1) % images.length)
        startAutoSlide()
      }, 5000)
    }

    startAutoSlide()

    return () => {
      cancelled = true
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [images.length])

  return (
    <section className="split-panel-section" aria-labelledby="split-panel-heading">
      <div className="split-panel">
        <div className="split-panel-content">
          <div className="split-panel-content-inner">
            <h3 id="split-panel-heading" className="split-panel-title">
              {title}
            </h3>
            <p className="split-panel-description mt-lg">{description}</p>
          </div>
        </div>

        <div className="split-panel-media">
          <div className="split-panel-media-frame">
            <Slider
              images={images}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function Slider({
  images,
  currentIndex,
  setCurrentIndex,
}: {
  images: SplitPanelImage[]
  currentIndex: number
  setCurrentIndex: (i: number) => void
}) {
  return (
    <div className="slider-container">
      {images.map((image, i) => (
        <img
          key={i}
          src={image.src}
          alt={image.alt}
          className="slider-image"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: i === currentIndex ? 1 : 0,
            transition: 'opacity 0.5s ease transform 1s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: `translateX(${i !== currentIndex ? (i > currentIndex ? 100 : -100) : 0}%)`,
          }}
        />
      ))}

      <div className="slider-dots" role="group" aria-label="Slide navigation">
        {images.map((_, i) => (
          <div
            key={i}
            className={`slider-dot${i === currentIndex ? ' is-active' : ''}`}
            onClick={() => setCurrentIndex(i)}
            role="button"
            tabIndex={0}
          />
        ))}
      </div>

      <div
        className="slider-timer"
        role="progressbar"
        aria-label="Slide transition progress"
      />
    </div>
  )
}