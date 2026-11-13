import { useEffect, useImperativeHandle, useRef, type Ref } from 'react'

interface LoopVideoProps {
  src: string
  /** Shown until the clip plays, and instead of it when the visitor prefers reduced motion. */
  poster: string
  /** Accessible name; the clip is decoration of the image it replaces. */
  label: string
  className?: string
  /**
   * 'visible': plays by itself while at least a quarter of it is on screen.
   * 'manual': the parent decides when to play (hover); it still stops when it leaves the screen.
   */
  mode: 'visible' | 'manual'
  /** How much to load before it plays. 'manual' clips start loading when they come near the screen. */
  preload?: 'none' | 'metadata' | 'auto'
  ref?: Ref<HTMLVideoElement>
}

/** True when the visitor has asked for less motion: clips then stay on their poster. */
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * A muted, looping clip that never plays out of sight: it pauses the moment it leaves the screen,
 * so nothing keeps decoding video behind the visitor's back. Never plays for reduced motion.
 */
export function LoopVideo({ src, poster, label, className, mode, preload = 'none', ref }: LoopVideoProps) {
  const element = useRef<HTMLVideoElement>(null)
  useImperativeHandle(ref, () => element.current as HTMLVideoElement)

  useEffect(() => {
    const video = element.current
    if (!video) return
    const reduced = prefersReducedMotion()

    // Play (visible mode) and, above all, pause with the screen.
    const visibility = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (mode === 'visible' && !reduced) void video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: mode === 'visible' ? 0.25 : 0 },
    )
    visibility.observe(video)

    // A clip that plays on hover is fetched shortly before it scrolls in, so hovering starts it at once.
    let warm: IntersectionObserver | null = null
    if (mode === 'manual' && preload === 'none' && !reduced) {
      warm = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return
          video.preload = 'auto'
          video.load()
          warm?.disconnect()
        },
        { rootMargin: '300px 0px' },
      )
      warm.observe(video)
    }

    return () => {
      visibility.disconnect()
      warm?.disconnect()
      video.pause()
    }
  }, [mode, preload])

  return (
    <video
      ref={element}
      className={className}
      src={src}
      poster={poster}
      aria-label={label}
      muted
      loop
      playsInline
      preload={preload}
    />
  )
}
