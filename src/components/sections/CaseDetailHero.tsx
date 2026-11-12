import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { CaseDetailHero as CaseDetailHeroContent } from '../../types/caseDetail'
import { HERO_ZOOM } from '../../lib/heroZoom'
import { IMAGE_SIZES, responsiveImageProps } from '../../lib/responsiveImage'
import { CONTACT_PATH } from '../../lib/routes'
import { ArrowButton, ArrowIcon, Container, WithHeadingDot } from '../ui'

gsap.registerPlugin(ScrollTrigger)

interface CaseDetailHeroProps {
  hero: CaseDetailHeroContent
}

export function CaseDetailHero({ hero }: CaseDetailHeroProps) {
  const { title, name, slides, meta } = hero
  const image = slides[0]
  const imageFrameRef = useRef<HTMLElement>(null)

  // The hero picture starts a little zoomed in and settles to its normal size as the page scrolls
  // away from the top, until the picture's top edge reaches the top of the screen. Scrubbed, so it
  // follows the scroll in both directions. Reduced motion: the picture stays at its normal size.
  useLayoutEffect(() => {
    const frame = imageFrameRef.current
    const picture = frame?.querySelector('img')
    if (!frame || !picture) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        picture,
        { scale: HERO_ZOOM },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: frame, start: 0, end: 'top top', scrub: true, invalidateOnRefresh: true },
        },
      )
    })
    return () => mm.revert()
  }, [image?.imageSrc])

  return (
    <section className="case-detail relative isolate" aria-label={title}>
      <Container className="relative z-[1]">
        <div className="case-detail-hero-intro">
          <h1 className="case-detail-hero-name">
            <WithHeadingDot>{name}</WithHeadingDot>
          </h1>

          {meta.length > 0 && (
            <dl className="case-detail-hero-meta">
              {meta.map((item) => (
                <div key={item.label} className="case-detail-hero-meta-item">
                  <dt className="case-detail-hero-meta-label">{item.label}</dt>
                  <dd className="case-detail-hero-meta-value">
                    {item.button && item.value ? (
                      <ArrowButton variant="text" href={item.href ?? CONTACT_PATH} external={Boolean(item.href)}>
                        {item.value}
                      </ArrowButton>
                    ) : item.href && item.value ? (
                      <a
                        className="case-detail-hero-meta-link"
                        href={item.href}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        <span>{item.value}</span>
                        <ArrowIcon width={14} height={14} />
                      </a>
                    ) : (
                      item.value ?? null
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {image?.imageSrc && (
            <figure ref={imageFrameRef} className="case-detail-hero-image">
              <img
                {...responsiveImageProps(image.imageSrc, IMAGE_SIZES.container)}
                alt={image.imageAlt}
                className="h-full w-full object-cover"
                decoding="async"
              />
            </figure>
          )}
        </div>
      </Container>
    </section>
  )
}
