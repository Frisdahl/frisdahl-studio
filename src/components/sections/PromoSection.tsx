import { type CSSProperties, useRef } from 'react'
import { usePromoVideoReveal } from '../../hooks/usePromoVideoReveal'

export function PromoSection() {
  const videoFrameRef = useRef<HTMLDivElement>(null)
  const revealProgress = usePromoVideoReveal(videoFrameRef)

  return (
    <section id="promo" className="promo-section">
      <div className="promo-stage">
        <div className="container-promo promo-stage-inner">
          <div className="promo-video-mask">
            <div
              ref={videoFrameRef}
              className="promo-video-frame"
              style={{ '--promo-reveal': revealProgress } as CSSProperties}
            >
              <video
                className="promo-video"
                src="/promo_h264.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
