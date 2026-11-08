import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import { useLocale } from '../../context/LocaleContext'
import { whenPageRevealed } from '../../lib/pageReveal'
import { CASES_PATH } from '../../lib/routes'
import { responsiveImageProps } from '../../lib/responsiveImage'
import { ArrowChipButton, Container, MaskedLineReveal } from '../ui'
import styles from './Hero.module.css'

const heroContent = {
  da: {
    // Two lines in the dark ink; "design" in the accent red, a red dot to end on.
    headingLead: 'Digitale løsninger',
    headingBefore: 'med ',
    headingAccent: 'design',
    headingAfter: ' i fokus',
    intro: 'Webudvikling, design og digitale oplevelser, der kombinerer æstetik, funktion og performance.',
    cta: 'Udforsk projekter',
    carouselLabel: 'Udvalgte projekter',
  },
} as const

interface HeroSlide {
  /** Portrait (4:5) image; a slide can instead be a muted looping video. */
  imageSrc: string
  videoSrc?: string
  alt: { da: string }
}

const heroSlides: HeroSlide[] = [
  { imageSrc: '/images/hero/hero-3-rethink-furniture-macbook.webp', alt: { da: 'Landingsside-koncept for Rethink Furniture på en MacBook på en polstret stol',  } },
  { imageSrc: '/images/hero/hero-2-montra-iphone.webp', alt: { da: 'Landingsside-koncept for Montra på en iPhone op ad en riflet væg',  } },
  { imageSrc: '/images/hero/hero-1-noma-living-macbook.webp', alt: { da: 'Landingsside-koncept for Noma Living på en MacBook på en sofa',  } },
  { imageSrc: '/images/hero/hero-4-auren-iphone.webp', alt: { da: 'Landingsside-koncept for Auren på en iPhone på en grå puf',  } },
  { imageSrc: '/images/hero/hero-5-elina-vestergaard-macbook.webp', alt: { da: 'Landingsside-koncept for Elina Vestergaard på en MacBook på en stenblok',  } },
  { imageSrc: '/images/hero/hero-6-noma-living-iphone.webp', alt: { da: 'Landingsside-koncept for Noma Living på en iPhone i et hjørne',  } },
]

/** Carousel drift in px per second (right to left). */
const AUTO_SPEED = 38
/** How fast a released drag eases back into the drift (per second). */
const RETURN_RATE = 2.2
/** Speed (px/s) at which the slides reach their smallest size, and that size's shrink. */
const SHRINK_SPEED = 2600
const MAX_SHRINK = 0.1
/** How quickly the slide size follows the speed (per second). */
const SCALE_RATE = 7

/** Rendered slide width (see .slide in Hero.module.css). */
const SLIDE_SIZES = '(min-width: 1024px) 29vw, (min-width: 640px) 44vw, 72vw'

export function Hero() {
  const { locale } = useLocale()
  const content = heroContent[locale]
  const carouselRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  // Resolves when the page is uncovered (right away unless a transition is running), so the
  // entrance below plays where it can be seen, not behind the menu panel or the wipe.
  const revealed = useMemo(() => whenPageRevealed(), [])

  // Entrance: the heading and paragraph rise out of their line masks (MaskedLineReveal,
  // below), the button fades in, and the slides open from nothing at their vertical centre
  // to their full height, the left one first. Reduced motion shows everything at once.
  useLayoutEffect(() => {
    const track = trackRef.current
    const cta = ctaRef.current
    const slides = track?.firstElementChild ? Array.from(track.firstElementChild.children) : []
    if (!track || slides.length === 0) return

    const mm = gsap.matchMedia()
    let cancelled = false
    mm.add('(prefers-reduced-motion: no-preference)', (context) => {
      gsap.set(slides, { clipPath: 'inset(50% 0% 50% 0%)' })
      if (cta) gsap.set(cta, { autoAlpha: 0 })
      void revealed.then(() => {
        if (cancelled) return
        context.add?.(() => {
          // fromTo, with both clips written out in full: the browser reports the hidden clip
          // as 'inset(50% 0%)', and a `to` from that shorthand would only move the top edge.
          gsap.fromTo(
            slides,
            { clipPath: 'inset(50% 0% 50% 0%)' },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 1.2,
              delay: 0.15,
              ease: 'expo.out',
              stagger: 0.1,
              clearProps: 'clipPath',
            },
          )
          if (cta) {
            gsap.to(cta, {
              autoAlpha: 1,
              duration: 0.9,
              delay: 0.75,
              ease: 'power2.out',
              clearProps: 'opacity,visibility',
            })
          }
        })
      })
    })
    return () => {
      cancelled = true
      mm.revert()
    }
  }, [revealed])

  // Carousel: drifts slowly right to left on its own and can be dragged with
  // mouse or touch. A drag keeps its speed when released and eases back into
  // the drift; the faster it moves, the smaller the slides get, so gaps open
  // up between them, and they grow back as it settles.
  //
  // The drift is a Web Animation on the track (one group's width, -50% of the
  // track, per loop), so at rest the browser moves it on the compositor and
  // main-thread work (scroll effects, image decoding, React) can't make it
  // stutter. JavaScript only steps in while the user interacts: a drag, and the
  // second or so after a release while it eases back to the drift, move the
  // paused animation by setting its time each frame (changing the playback rate
  // every frame would keep the animation waiting on the compositor). The
  // animation resumes at the drift rate once it has settled. Rate 1 drifts left, rate -1 drifts right (the
  // direction of the last drag, see `direction`), rate 0 stands still (reduced
  // motion).
  useEffect(() => {
    const carousel = carouselRef.current
    const track = trackRef.current
    const group = track?.firstElementChild as HTMLElement | null
    if (!carousel || !track || !group) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // 1 drifts left (the default), -1 drifts right; a drag sets it to the way it went.
    let direction = 1
    const driftFor = (dir: number) => (reduceMotion ? 0 : -dir * AUTO_SPEED)
    let drift = driftFor(direction)
    // Playback rate for a velocity in px/s: the leftward drift speed is rate 1.
    const rateFor = (v: number) => -v / AUTO_SPEED
    // Milliseconds of animation time per pixel of travel.
    const MS_PER_PX = 1000 / AUTO_SPEED
    // Time is kept far from 0 so a backwards fling never reaches the start.
    const LOOPS_OF_HEADROOM = 10000

    let groupWidth = group.offsetWidth
    const animation = track.animate(
      [{ transform: 'translate3d(0, 0, 0)' }, { transform: 'translate3d(-50%, 0, 0)' }],
      { duration: (groupWidth || 1) * MS_PER_PX, iterations: Infinity, easing: 'linear', fill: 'both' },
    )
    animation.playbackRate = rateFor(drift)

    const loopMs = () => (groupWidth || 1) * MS_PER_PX
    /** Wraps the animation time back into one loop, far from the start. */
    const normalise = () => {
      const loop = loopMs()
      const time = Number(animation.currentTime ?? 0)
      animation.currentTime = loop * LOOPS_OF_HEADROOM + (((time % loop) + loop) % loop)
    }
    normalise()

    let velocity = drift
    let scale = 1
    let dragging = false
    // True from a release until the speed has eased back to the drift.
    let settling = false
    let visible = true
    let dragVelocity = 0
    let dragDistance = 0
    let lastX = 0
    let lastTime = 0
    let frame = 0
    let previous = 0

    const sync = () => {
      if (visible && !dragging && !settling) animation.play()
      else animation.pause()
    }

    const resize = new ResizeObserver(() => {
      const next = group.offsetWidth
      if (!next || next === groupWidth) return
      // Keep the visible position: the same fraction of a loop at the new length.
      const loop = loopMs()
      const phase = (((Number(animation.currentTime ?? 0) % loop) + loop) % loop) / loop
      groupWidth = next
      animation.effect?.updateTiming({ duration: loopMs() })
      animation.currentTime = loopMs() * LOOPS_OF_HEADROOM + phase * loopMs()
    })
    resize.observe(group)

    // Runs only while a drag or its release is settling; at rest nothing runs.
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - previous) / 1000)
      previous = now
      if (dragging) {
        // A pointer held still stops the slides; no stale speed lingers.
        dragVelocity *= Math.exp(-dt * 10)
      } else {
        velocity += (drift - velocity) * (1 - Math.exp(-dt * RETURN_RATE))
        // Same motion as playing at rateFor(velocity), stepped by hand.
        animation.currentTime = Number(animation.currentTime ?? 0) + rateFor(velocity) * dt * 1000
      }

      const speed = Math.abs(dragging ? dragVelocity : velocity - drift)
      const target = reduceMotion ? 1 : 1 - Math.min(speed / SHRINK_SPEED, 1) * MAX_SHRINK
      scale += (target - scale) * (1 - Math.exp(-dt * SCALE_RATE))
      track.style.setProperty('--hero-slide-scale', scale.toFixed(4))

      const settled = !dragging && settling && Math.abs(velocity - drift) < 0.5 && Math.abs(scale - 1) < 0.0005
      if (settled) {
        velocity = drift
        scale = 1
        settling = false
        animation.playbackRate = rateFor(drift)
        normalise()
        sync()
        track.style.setProperty('--hero-slide-scale', '1')
        frame = 0
        return
      }
      frame = requestAnimationFrame(tick)
    }
    const kick = () => {
      if (frame) return
      previous = performance.now()
      frame = requestAnimationFrame(tick)
    }

    const onDown = (event: PointerEvent) => {
      if (event.button !== 0) return
      dragging = true
      settling = false
      dragVelocity = 0
      dragDistance = 0
      lastX = event.clientX
      lastTime = event.timeStamp
      carousel.setPointerCapture(event.pointerId)
      carousel.classList.add(styles.dragging)
      sync()
      normalise()
      kick()
    }
    const onMove = (event: PointerEvent) => {
      if (!dragging) return
      const dx = event.clientX - lastX
      const elapsed = Math.max(1, event.timeStamp - lastTime)
      // Dragging right moves the track right, i.e. back in the animation.
      animation.currentTime = Number(animation.currentTime ?? 0) - dx * MS_PER_PX
      dragDistance += dx
      dragVelocity += ((dx / elapsed) * 1000 - dragVelocity) * 0.35
      lastX = event.clientX
      lastTime = event.timeStamp
    }
    const onUp = (event: PointerEvent) => {
      if (!dragging) return
      dragging = false
      velocity = dragVelocity
      // Keep drifting the way it was last dragged: by the release speed if it
      // was moving, otherwise by the way it was pulled.
      const way = Math.abs(dragVelocity) > 15 ? dragVelocity : dragDistance
      if (Math.abs(way) > 4) {
        direction = way > 0 ? -1 : 1
        drift = driftFor(direction)
      }
      settling = true
      normalise()
      sync()
      kick()
      if (carousel.hasPointerCapture(event.pointerId)) carousel.releasePointerCapture(event.pointerId)
      carousel.classList.remove(styles.dragging)
    }

    // Nothing to animate while the carousel is off screen.
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      sync()
    })
    visibility.observe(carousel)

    carousel.addEventListener('pointerdown', onDown)
    carousel.addEventListener('pointermove', onMove)
    carousel.addEventListener('pointerup', onUp)
    carousel.addEventListener('pointercancel', onUp)

    return () => {
      cancelAnimationFrame(frame)
      animation.cancel()
      resize.disconnect()
      visibility.disconnect()
      carousel.removeEventListener('pointerdown', onDown)
      carousel.removeEventListener('pointermove', onMove)
      carousel.removeEventListener('pointerup', onUp)
      carousel.removeEventListener('pointercancel', onUp)
    }
  }, [])

  // Video slides: each slide exists twice (the carousel's seamless copy) and
  // the carousel swaps one copy for the other when it wraps, which a drag does
  // often. One hidden <video> per source is drawn onto a canvas in every copy,
  // so both copies always show the same frame: nothing to sync, no seeking,
  // and a canvas keeps its last frame, so it never flashes. The poster image
  // underneath shows until the first frame is drawn (and with reduced motion).
  useEffect(() => {
    const track = trackRef.current
    const carousel = carouselRef.current
    if (!track || !carousel) return
    const canvases = [...track.querySelectorAll<HTMLCanvasElement>('canvas[data-video]')]
    if (!canvases.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const players = new Map<string, { video: HTMLVideoElement; targets: HTMLCanvasElement[] }>()
    for (const canvas of canvases) {
      const src = canvas.dataset.video!
      if (!players.has(src)) {
        const video = document.createElement('video')
        video.muted = true
        video.loop = true
        video.playsInline = true
        video.preload = 'auto'
        video.setAttribute('muted', '')
        video.setAttribute('playsinline', '')
        video.src = src
        players.set(src, { video, targets: [] })
      }
      players.get(src)!.targets.push(canvas)
    }

    // Backing store at the canvas's rendered size (capped at 2x for retina).
    const fit = (canvas: HTMLCanvasElement) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.round(canvas.clientWidth * dpr)
      const h = Math.round(canvas.clientHeight * dpr)
      if (w && h && (canvas.width !== w || canvas.height !== h)) {
        canvas.width = w
        canvas.height = h
      }
    }
    const resize = new ResizeObserver((entries) => entries.forEach((e) => fit(e.target as HTMLCanvasElement)))
    canvases.forEach((canvas) => resize.observe(canvas))

    const draw = (video: HTMLVideoElement, targets: HTMLCanvasElement[]) => {
      const vw = video.videoWidth
      const vh = video.videoHeight
      if (!vw || !vh) return
      for (const canvas of targets) {
        const ctx = canvas.getContext('2d')
        if (!ctx || !canvas.width) continue
        // object-fit: cover
        const s = Math.max(canvas.width / vw, canvas.height / vh)
        const dw = vw * s
        const dh = vh * s
        ctx.drawImage(video, (canvas.width - dw) / 2, (canvas.height - dh) / 2, dw, dh)
        canvas.dataset.ready = ''
      }
    }

    let stopped = false
    const loops: (() => void)[] = []
    players.forEach(({ video, targets }) => {
      if ('requestVideoFrameCallback' in video) {
        let id = 0
        const onFrame = () => {
          if (stopped) return
          draw(video, targets)
          id = video.requestVideoFrameCallback(onFrame)
        }
        id = video.requestVideoFrameCallback(onFrame)
        loops.push(() => video.cancelVideoFrameCallback(id))
      } else {
        let id = 0
        const onFrame = () => {
          if (stopped) return
          draw(video, targets)
          id = requestAnimationFrame(onFrame)
        }
        id = requestAnimationFrame(onFrame)
        loops.push(() => cancelAnimationFrame(id))
      }
    })

    // Only decode while the carousel is on screen.
    const visibility = new IntersectionObserver(([entry]) => {
      players.forEach(({ video }) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      })
    })
    visibility.observe(carousel)

    return () => {
      stopped = true
      loops.forEach((cancel) => cancel())
      visibility.disconnect()
      resize.disconnect()
      players.forEach(({ video }) => {
        video.pause()
        video.removeAttribute('src')
        video.load()
      })
    }
  }, [])

  return (
    <section className={styles.hero} aria-labelledby="home-hero-title" data-page-entrance="own">
      <div className={styles.content}>
        <Container columns contentClassName={styles.inner}>
          <h1 id="home-hero-title" className={styles.title}>
            <MaskedLineReveal as="span" className={styles.titleLines} trigger="mount" startAfter={revealed}>
              {content.headingLead}
              <br />
              {content.headingBefore}
              <span className={styles.titleAccent}>{content.headingAccent}</span>
              {content.headingAfter}
              <span className={styles.titleDot} aria-hidden="true" />
            </MaskedLineReveal>
          </h1>

          <div className={styles.aside}>
            <MaskedLineReveal as="p" className={styles.intro} trigger="mount" delay={0.3} startAfter={revealed}>
              {content.intro}
            </MaskedLineReveal>
            <div ref={ctaRef}>
              <ArrowChipButton
                direction="right"
                variant="diagonal"
                label={content.cta}
                text={content.cta}
                href={CASES_PATH}
              />
            </div>
          </div>
        </Container>

        {/* Portrait slides drift from right to left and can be dragged; the
            second group is a copy so the loop is seamless (see the effect above). */}
        <div ref={carouselRef} className={styles.carousel} role="region" aria-label={content.carouselLabel}>
          <div ref={trackRef} className={styles.track}>
            {[0, 1].map((group) => (
              <div key={group} className={styles.group} aria-hidden={group === 1}>
                {heroSlides.map((slide) => (
                  <figure key={`${group}-${slide.imageSrc}`} className={styles.slide}>
                    <img
                      {...responsiveImageProps(slide.imageSrc, SLIDE_SIZES)}
                      alt={group === 0 ? slide.alt[locale] : ''}
                      loading="eager"
                      decoding="async"
                      draggable={false}
                    />
                    {/* Video slides: frames drawn here from one shared video (see the effect above). */}
                    {slide.videoSrc && <canvas className={styles.videoCanvas} data-video={slide.videoSrc} aria-hidden="true" />}
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
