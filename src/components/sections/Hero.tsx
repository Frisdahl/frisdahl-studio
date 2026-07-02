import { useState } from 'react'
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2'
import { useContactDrawer } from '../../context/ContactDrawerContext'
import { useLocale } from '../../context/LocaleContext'
import { getHomeContent } from '../../data/home'
import { toAppHref } from '../../lib/routes'
import { Container, CtaPillButton } from '../ui'
import { DecorativeRings } from '../ui/DecorativeRings'

const heroVideoSrc: string | null = null

export type HeroVariant = 'home' | 'pricing'

interface HeroProps {
  variant?: HeroVariant
  showDecorations?: boolean
  showDecorationDots?: boolean
}

interface MuteToggleIconProps {
  muted: boolean
}

function MuteToggleIcon({ muted }: MuteToggleIconProps) {
  const className = 'h-7 w-7 text-surface sm:h-8 sm:w-8'

  if (muted) {
    return <HiSpeakerXMark className={className} aria-hidden="true" />
  }

  return <HiSpeakerWave className={className} aria-hidden="true" />
}

export function HeroDecorationLines() {
  return (
    <svg
      className="hero-decoration-lines"
      viewBox="0 0 3066 964.24"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(576 3.067)">
        <path
          d="M-1234.934,470.344S-417.694,862.1-36,673.477C486.858,404.691,1234.5,1235.59,1958.05,863.631s860.108-261.125,860.108-261.125"
          stroke="currentColor"
          strokeWidth="0.85"
        />
        <path
          d="M2490.15,18.3C1696.23-159.366,1182.04,833.087,608.333,704.7"
          stroke="currentColor"
          strokeWidth="0.85"
        />
      </g>
    </svg>
  )
}

function HeroDecorationDots() {
  return (
    <>
      <span className="hero-decoration-dot hero-decoration-dot-yellow hero-decoration-dot-left" />
      <span className="hero-decoration-dot hero-decoration-dot-accent hero-decoration-dot-mid hidden sm:block" />
      <span className="hero-decoration-dot hero-decoration-dot-yellow hero-decoration-dot-right" />
    </>
  )
}

export function HeroDecorations() {
  return (
    <>
      <HeroDecorationLines />
      <HeroDecorationDots />
    </>
  )
}

function HeroVideoRings() {
  return <DecorativeRings />
}

export function Hero({
  variant = 'home',
  showDecorations = true,
  showDecorationDots = false,
}: HeroProps) {
  const { locale } = useLocale()
  const { hero, pricingPage } = getHomeContent(locale)
  const { openDrawer } = useContactDrawer()
  const content = variant === 'pricing' ? pricingPage.hero : hero
  const isPricing = variant === 'pricing'
  const [isMuted, setIsMuted] = useState(true)
  const hasVideo = Boolean(heroVideoSrc)
  const heroImageSrc = isPricing && 'imageSrc' in content ? content.imageSrc : null
  const heroImageAlt = isPricing && 'imageAlt' in content ? content.imageAlt : ''

  const muteLabel = isMuted ? hero.muteOn : hero.muteOff

  return (
    <section className={`hero-section${isPricing ? ' hero-section--pricing' : ''}`}>
      {showDecorations ? <HeroDecorations /> : null}
      {showDecorationDots ? <HeroDecorationDots /> : null}

      <Container className="relative z-10">
        <div className="hero-grid grid min-h-[calc(100svh-4rem)] items-start gap-12 px-2 pb-12 pt-6 max-[1088px]:gap-8 max-[1088px]:pb-8 max-[1088px]:pt-5 min-[1089px]:sm:gap-12 sm:px-3 sm:pt-8 lg:min-h-0 lg:gap-10 lg:px-0 lg:pb-16 lg:pt-16">
          <div className="hero-grid-copy min-w-0 self-center lg:max-w-none">
            <p className="eyebrow text-secondary">{content.eyebrow}</p>
            <h1 className="hero-grid-title mt-5 max-[1088px]:mt-3">
              <span className="block min-[801px]:max-[1088px]:whitespace-nowrap">
                {content.headlineLine1}
              </span>
              <span className="block min-[801px]:max-[1088px]:whitespace-nowrap">
                {content.headlineLine2}
              </span>
            </h1>
            <p className="mt-6 max-w-[38rem] text-body-lg text-secondary max-[1088px]:mt-4 min-[1089px]:sm:mt-7 lg:max-w-[44rem]">
              {content.description}
            </p>
            <div className="mt-8 flex flex-col gap-4 max-[1088px]:mt-5 max-[1088px]:gap-3 min-[1089px]:sm:mt-9 sm:flex-row sm:items-center">
              {isPricing ? (
                <CtaPillButton onClick={() => openDrawer('book')}>{content.ctaPrimary}</CtaPillButton>
              ) : (
                <CtaPillButton href={toAppHref('#contact')}>{content.ctaPrimary}</CtaPillButton>
              )}
            </div>
          </div>

          <div className="hero-grid-media relative min-w-0 w-full pt-3 pb-12 max-[1088px]:pb-6 max-[1088px]:pt-2 sm:pt-4 sm:pb-8">
            <div className="hero-grid-media-inner relative mx-auto w-full max-w-[520px] lg:ml-auto lg:mr-0 lg:max-w-[480px]">
              <HeroVideoRings />

              <div className="hero-grid-media-frame relative z-[2] rounded-tl-xl rounded-bl-xl rounded-br-xl rounded-tr-[2.75rem] border border-border-light bg-surface shadow-medium lg:rounded-tr-[3rem]">
                <div className="hero-grid-media-aspect aspect-[3/4] max-h-[500px] w-full overflow-hidden rounded-[inherit] lg:max-h-[520px]">
                  {hasVideo && heroVideoSrc ? (
                    <video
                      className="h-full w-full object-cover"
                      src={heroVideoSrc}
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                    />
                  ) : heroImageSrc ? (
                    <img
                      src={heroImageSrc}
                      alt={heroImageAlt}
                      className="h-full w-full object-cover"
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
                    />
                  ) : (
                    <div className="h-full w-full bg-peach" aria-hidden="true" />
                  )}
                </div>

                {hasVideo ? (
                  <button
                    type="button"
                    className="absolute left-0 top-1/2 z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-surface shadow-medium transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:h-16 sm:w-16"
                    aria-label={muteLabel}
                    aria-pressed={isMuted}
                    onClick={() => setIsMuted((muted) => !muted)}
                  >
                    <MuteToggleIcon muted={isMuted} />
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
