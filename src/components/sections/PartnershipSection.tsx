import { useLocale } from '../../context/LocaleContext'
import { getHomeContent } from '../../data/home'
import { Container, TextLink } from '../ui'
import { PartnershipImageDecorations } from './PartnershipDecorations'

export function PartnershipSection() {
  const { locale } = useLocale()
  const { partnership } = getHomeContent(locale)

  return (
    <section className="relative overflow-visible py-section-sm lg:py-section">
      <Container>
        <div className="relative grid gap-20 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-5xl">
          <div className="min-w-0 max-w-[38rem] lg:max-w-[75%]">
            <p className="eyebrow eyebrow-theme">{partnership.eyebrow}</p>
            <h2 className="mt-xl">{partnership.title}</h2>
            <p className="mt-2xl text-body leading-[1.65]">{partnership.description}</p>
            <div className="mt-3xl">
              <TextLink href={partnership.ctaHref} variant="nav">
                {partnership.ctaLabel}
              </TextLink>
            </div>
          </div>

          <div className="relative mx-auto w-[14rem] shrink-0 sm:w-[15rem] lg:mx-0 lg:w-[17rem]">
            <PartnershipImageDecorations />

            <div className="relative overflow-hidden rounded-full bg-peach">
              {partnership.imageSrc ? (
                <img
                  src={partnership.imageSrc}
                  alt={partnership.imageAlt}
                  className="aspect-[4/5] w-full object-cover lg:aspect-[9/16]"
                />
              ) : (
                <div
                  className="aspect-[4/5] w-full lg:aspect-[9/16]"
                  aria-hidden="true"
                />
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
