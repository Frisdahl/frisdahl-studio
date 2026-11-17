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
  /**
   * Shares the decoder with the other clips that set this: at most MAX_SHARED_PLAYING of them play at
   * once, the most visible ones; the rest wait on their current frame. For a grid of clips on one
   * screen (the home page's projects), where decoding all of them together stutters the scroll.
   */
  shared?: boolean
  ref?: Ref<HTMLVideoElement>
}

/** How many clips of a shared group play at once. */
const MAX_SHARED_PLAYING = 2
/** How much of a clip must be on screen before it counts (and plays). */
const SHARED_MIN_VISIBLE = 0.4
/** The clips of the shared group that are on screen now, with how much of each is visible (0 to 1). */
const sharedVisible = new Map<HTMLVideoElement, number>()

/** Plays the most visible shared clips (up to the limit) and pauses the others. */
function scheduleShared() {
  const ranked = [...sharedVisible.entries()].sort((a, b) => b[1] - a[1])
  ranked.forEach(([video], index) => {
    if (index < MAX_SHARED_PLAYING) void video.play().catch(() => {})
    else video.pause()
  })
}

/** True when the visitor has asked for less motion: clips then stay on their poster. */
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * A muted, looping clip that never plays out of sight: it pauses the moment it leaves the screen,
 * so nothing keeps decoding video behind the visitor's back. Never plays for reduced motion.
 */
export function LoopVideo({ src, poster, label, className, mode, preload = 'none', shared = false, ref }: LoopVideoProps) {
  const element = useRef<HTMLVideoElement>(null)
  useImperativeHandle(ref, () => element.current as HTMLVideoElement)

  useEffect(() => {
    const video = element.current
    if (!video) return
    const reduced = prefersReducedMotion()

    // Play (visible mode) and, above all, pause with the screen. A shared clip is played by the
    // scheduler above instead, which keeps the number of playing clips down.
    const useScheduler = shared && mode === 'visible' && !reduced
    const visibility = new IntersectionObserver(
      ([entry]) => {
        if (useScheduler) {
          if (entry.intersectionRatio >= SHARED_MIN_VISIBLE) sharedVisible.set(video, entry.intersectionRatio)
          else {
            sharedVisible.delete(video)
            video.pause()
          }
          scheduleShared()
          return
        }
        if (entry.isIntersecting) {
          if (mode === 'visible' && !reduced) void video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: useScheduler ? [0, 0.2, 0.4, 0.6, 0.8, 1] : mode === 'visible' ? 0.25 : 0 },
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
      if (sharedVisible.delete(video)) scheduleShared()
      video.pause()
    }
  }, [mode, preload, shared])

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
      disablePictureInPicture
      disableRemotePlayback
      preload={preload}
    />
  )
}
