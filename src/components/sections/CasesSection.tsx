import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CaseCard } from '../cards/CaseCard'
import { useLocale } from '../../context/LocaleContext'
import { getHomeContent } from '../../data/home'
import { getCaseRole } from '../../data/caseDetails'
import { getCaseYear } from '../../data/caseNavigation'
import { getCasesPageContent } from '../../data/cases'

gsap.registerPlugin(ScrollTrigger)

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))
// Symmetric ease: smoothstep(t) + smoothstep(1 - t) === 1, so the row that
// grows always gains exactly what its neighbour loses.
const smoothstep = (t: number) => t * t * (3 - 2 * t)

// Full image height, mirroring `.case-card-media` on desktop in index.css
// (clamp(22rem, 32vw, 38rem)); the smallest size is 80% of it.
const fullHeight = () => clamp(window.innerWidth * 0.32, 352, 608)
const SMALL = 0.8

export function CasesSection() {
  const { locale } = useLocale()
  const { cases } = getHomeContent(locale)
  const caseDescriptions = new Map<string, string>(
    getCasesPageContent(locale).items.map((item) => [item.id, item.description]),
  )
  const listRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return

    const mm = gsap.matchMedia()

    // Desktop only: on phones the rows stack at full size with the text shown.
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const rows = Array.from(list.querySelectorAll<HTMLElement>('.case-card'))
      const medias = rows.map((row) => row.querySelector<HTMLElement>('.case-card-media')!)
      const metas = rows.map((row) => row.querySelector<HTMLElement>('.case-card-meta')!)

      let maxH = 0
      let minH = 0
      let listTop = 0
      let activeIndex = -1
      let position = 0

      const measure = () => {
        maxH = fullHeight()
        minH = maxH * SMALL
        listTop = list.getBoundingClientRect().top + window.scrollY
      }

      // How far through the list the screen's centre is, in rows: at a whole
      // number k, row k is at full size and centred. Between two rows one grows
      // while the other shrinks by the same amount, so the images always touch
      // and the list's total height never changes. That keeps the mapping
      // exact: row k's centre sits at listTop + k·minH + maxH/2.
      // It starts at -1, so the first row arrives small and without its text
      // and grows into place; it stops at the last row, which stays full so
      // the sections below never shift while in view.
      const targetPosition = () => {
        const centre = window.scrollY + window.innerHeight / 2
        return clamp((centre - listTop - maxH / 2) / minH, -1, rows.length - 1)
      }

      const render = () => {
        medias.forEach((media, index) => {
          const weight = smoothstep(clamp(1 - Math.abs(index - position), 0, 1))
          media.style.height = `${minH + (maxH - minH) * weight}px`
          media.style.width = `${(SMALL + (1 - SMALL) * weight) * 100}%`
        })

        // The nearest row owns the text; it fades in as that row takes over
        // (none before the first row is halfway grown).
        const nextActive = position < -0.5 ? -1 : Math.round(position)
        if (nextActive === activeIndex) return
        metas.forEach((meta, index) => {
          gsap.to(meta, {
            autoAlpha: index === nextActive ? 1 : 0,
            y: index === nextActive ? 0 : -12,
            duration: index === nextActive ? 0.7 : 0.35,
            ease: 'power3.out',
            overwrite: true,
          })
        })
        activeIndex = nextActive
      }

      // The sizes ease towards the scroll position instead of following it
      // 1:1, so uneven wheel steps still read as one smooth glide. Each frame
      // closes 12% of the remaining distance (at 60fps, adjusted for frame
      // time), and nothing is written once it has settled.
      const tick = (_time: number, deltaMs: number) => {
        const target = targetPosition()
        const distance = target - position
        if (Math.abs(distance) < 0.0005) {
          if (position === target) return
          position = target
        } else {
          position += distance * (1 - Math.pow(1 - 0.12, deltaMs / (1000 / 60)))
        }
        render()
      }

      const snap = () => {
        measure()
        position = targetPosition()
        render()
      }

      gsap.set(metas, { autoAlpha: 0, y: 16 })
      snap()
      gsap.ticker.add(tick)
      ScrollTrigger.addEventListener('refresh', snap)
      window.addEventListener('resize', snap)

      return () => {
        gsap.ticker.remove(tick)
        ScrollTrigger.removeEventListener('refresh', snap)
        window.removeEventListener('resize', snap)
        medias.forEach((media) => {
          media.style.height = ''
          media.style.width = ''
        })
      }
    })

    return () => mm.revert()
  }, [locale])

  return (
    <section
      id="portfolio"
      className="home-cases py-section-sm lg:py-section"
      aria-label={cases.ariaLabel}
      data-header-theme="dark"
    >
      <div ref={listRef}>
        {cases.items.map((item) => (
          <CaseCard
            key={item.id}
            client={item.client}
            keywords={item.keywords}
            // Description, role and year come from the shared case data, so
            // they always match the case pages.
            description={caseDescriptions.get(item.id) ?? ''}
            meta={[
              { label: cases.metaLabels.role, value: getCaseRole(locale, item.id) },
              { label: cases.metaLabels.technologies, value: item.technologies },
              { label: cases.metaLabels.year, value: getCaseYear(item.id) },
            ]}
            imageSrc={item.imageSrc}
            imageAlt={item.imageAlt}
            href={item.href}
            linkLabel={cases.linkLabel}
          />
        ))}
      </div>
    </section>
  )
}
