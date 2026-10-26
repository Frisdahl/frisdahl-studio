import { useLocale } from '../../context/LocaleContext'
import { getHomeContent } from '../../data/home'
import { Container } from '../ui'
import { PartnershipImageDecorations } from './PartnershipDecorations'

export function PartnershipSection() {
  const { locale } = useLocale()
  const { partnership } = getHomeContent(locale)

  return (
    // id="om-os": target of the "Om os" links in the nav, mobile menu and footer.
    <section id="om-os" className="relative overflow-visible py-24 lg:py-32">
      <Container>
        <div className="relative grid gap-20 lg:grid-cols-2 lg:items-center lg:gap-3xl">
          <div className="min-w-0 max-w-[38rem]">
            <p className="eyebrow eyebrow-accent">{partnership.eyebrow}</p>
            <h2 className="mt-xl">{partnership.title}</h2>
            <p className="mt-2xl text-body">{partnership.description}</p>
          </div>

          <div className="relative mx-auto w-[16rem] shrink-0 sm:w-[19rem] lg:w-[24rem]">
            <PartnershipImageDecorations />

            <div className="relative overflow-hidden rounded-panel bg-peach">
              {partnership.imageSrc ? (
                <img
                  src={partnership.imageSrc}
                  alt={partnership.imageAlt}
                  className="aspect-[4/5] w-full object-cover"
                />
              ) : (
                <div className="aspect-[4/5] w-full" aria-hidden="true" />
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
