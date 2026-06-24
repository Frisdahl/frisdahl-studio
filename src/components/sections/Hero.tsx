import { useState } from 'react'
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2'
import { useContactDrawer } from '../../context/ContactDrawerContext'
import { useLocale } from '../../context/LocaleContext'
import { getHomeContent } from '../../data/home'
import { toAppHref } from '../../lib/routes'
import { Button, Container } from '../ui'
import { DecorativeRings } from '../ui/DecorativeRings'

const heroVideoSrc: string | null = null

export type HeroVariant = 'home' | 'pricing'

interface HeroProps {
  variant?: HeroVariant
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

function HeroDecorations() {
  return (
    <>
      <svg
        className="pointer-events-none absolute bottom-[-5rem] left-1/2 z-[1] h-auto w-[1600px] max-w-[220vw] -translate-x-1/2 text-peach opacity-90 sm:bottom-[-6rem] lg:bottom-[-8rem] xl:w-[2500px]"
        viewBox="0 0 3066 964.24"
        fill="none"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(576 3.067)">
          <path
            d="M-1234.934,470.344S-417.694,862.1-36,673.477C486.858,404.691,1234.5,1235.59,1958.05,863.631s860.108-261.125,860.108-261.125"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <path
            d="M2490.15,18.3C1696.23-159.366,1182.04,833.087,608.333,704.7"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </g>
      </svg>

      <span className="pointer-events-none absolute left-[8%] top-[30%] z-[1] h-2.5 w-2.5 rounded-full bg-accent-yellow/70 lg:left-[12%]" />
      <span className="pointer-events-none absolute bottom-[32%] left-[22%] z-[1] hidden h-2 w-2 rounded-full bg-accent/45 sm:block" />
      <span className="pointer-events-none absolute bottom-[24%] right-[12%] z-[1] h-2 w-2 rounded-full bg-accent-yellow/50 lg:right-[18%]" />
    </>
  )
}

function HeroVideoRings() {
  return <DecorativeRings />
}

export function Hero({ variant = 'home' }: HeroProps) {
  const { locale } = useLocale()
  const { hero, pricingPage } = getHomeContent(locale)
  const { openDrawer } = useContactDrawer()
  const content = variant === 'pricing' ? pricingPage.hero : hero
  const [isMuted, setIsMuted] = useState(true)
  const hasVideo = Boolean(heroVideoSrc)

  const muteLabel = isMuted ? hero.muteOn : hero.muteOff
  const isPricing = variant === 'pricing'

  return (
    <section className="relative overflow-hidden">
      <HeroDecorations />

      <Container className="relative z-10">
        <div className="hero-grid grid min-h-[calc(100svh-4rem)] items-start gap-12 px-2 pb-12 pt-6 max-[1088px]:gap-8 max-[1088px]:pb-8 max-[1088px]:pt-5 min-[1089px]:sm:gap-16 sm:px-3 sm:pt-8 lg:min-h-0 lg:grid-cols-[1.14fr_0.86fr] lg:gap-24 lg:px-0 lg:pb-16 lg:pt-16">
          <div className="min-w-0 self-center lg:max-w-[42rem]">
            <p className="eyebrow text-secondary">{content.eyebrow}</p>
            <h1 className="mt-5 max-[1088px]:mt-3">
              <span className="block min-[801px]:max-[1088px]:whitespace-nowrap">
                {content.headlineLine1}
              </span>
              <span className="block min-[801px]:max-[1088px]:whitespace-nowrap">
                {content.headlineLine2}
              </span>
            </h1>
            <p className="mt-6 max-w-[34rem] text-body-lg text-secondary max-[1088px]:mt-4 min-[1089px]:sm:mt-7 lg:max-w-none">
              {content.description}
            </p>
            <div className="mt-8 flex flex-col gap-4 max-[1088px]:mt-5 max-[1088px]:gap-3 min-[1089px]:sm:mt-9 sm:flex-row sm:items-center">
              {isPricing ? (
                <>
                  <Button type="button" onClick={() => openDrawer('book')}>
                    {content.ctaPrimary}
                  </Button>
                  <Button href="#priser" variant="secondary">
                    {content.ctaSecondary}
                  </Button>
                </>
              ) : (
                <>
                  <Button href={toAppHref('#contact')}>{content.ctaPrimary}</Button>
                  <Button href={toAppHref('#portfolio')} variant="secondary">
                    {content.ctaSecondary}
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="relative min-w-0 w-full pt-3 pb-12 max-[1088px]:pb-6 max-[1088px]:pt-2 sm:pt-4 sm:pb-8">
            <div className="relative mx-auto w-full max-w-[520px] lg:ml-auto lg:mr-0 lg:max-w-[560px]">
              <HeroVideoRings />

              <div className="relative z-[2] rounded-tl-xl rounded-bl-xl rounded-br-xl rounded-tr-[2.75rem] border border-border-light bg-surface shadow-medium lg:rounded-tr-[3rem]">
                <div className="aspect-[3/4] max-h-[540px] w-full overflow-hidden rounded-[inherit] lg:max-h-[580px]">
                  {hasVideo && heroVideoSrc ? (
                    <video
                      className="h-full w-full object-cover"
                      src={heroVideoSrc}
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                    />
                  ) : (
                    <div className="h-full w-full bg-peach" aria-hidden="true" />
                  )}
                </div>

                <button
                  type="button"
                  className="absolute left-0 top-1/2 z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-surface shadow-medium transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:h-16 sm:w-16"
                  aria-label={muteLabel}
                  aria-pressed={hasVideo ? isMuted : undefined}
                  onClick={hasVideo ? () => setIsMuted((muted) => !muted) : undefined}
                >
                  <MuteToggleIcon muted={isMuted} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
