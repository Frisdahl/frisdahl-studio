import { type HTMLAttributes } from 'react'

interface PromoSectionProps extends HTMLAttributes<HTMLElement> {}

export function PromoSection({ className = '', ...props }: PromoSectionProps) {
  return (
    <section
      id="promo"
      className={`promo-section ${className}`.trim()}
      {...props}
    >
      <div className="promo-stage">
        <div className="container-promo promo-stage-inner">
          <div className="promo-video-mask">
            <div className="promo-video-frame">
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
