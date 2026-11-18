import { useEffect, useImperativeHandle, useLayoutEffect, useRef, useState, type Ref } from 'react'
import { responsiveSrcFor } from '../../lib/responsiveImage'

interface LoopVideoProps {
  src: string
  /** Shown until the clip plays, and instead of it when the visitor prefers reduced motion. */
  poster?: string
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
  /**
   * A clip with preload 'none' starts loading when it comes within this distance of the screen (an IntersectionObserver
   * rootMargin), so it is ready by the time it is seen instead of showing its poster while it buffers. Default: 300px
   * for a clip the parent plays, 800px for one that plays itself. Not for shared (grid) clips, which are scheduled.
   */
  warmMargin?: string
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
export function LoopVideo({ src, poster, label, className, mode, preload = 'none', shared = false, warmMargin, ref }: LoopVideoProps) {
  const element = useRef<HTMLVideoElement>(null)
  useImperativeHandle(ref, () => element.current as HTMLVideoElement)

  // The poster is chosen once the clip's width is known (before the first paint), at the same sizes as the page's
  // pictures: a 2304 px file is no use on a phone, and the hero's poster is then the very file its <img> already loaded.
  // A clip that does not load at once (preload 'none') fetches its poster only when it comes near the screen, like
  // its clip does, so a page of clips does not load every poster at the top. Until then there is no poster attribute.
  const lazyPoster = preload === 'none' && !(shared && mode === 'visible')
  const [posterSrc, setPosterSrc] = useState<string | undefined>(undefined)
  useLayoutEffect(() => {
    const video = element.current
    if (!video) return
    // No poster given (the still under the clip is the same picture): nothing to choose or fetch.
    const choose = () => setPosterSrc(poster ? responsiveSrcFor(poster, video.clientWidth || window.innerWidth) : undefined)
    if (!lazyPoster) {
      choose()
      return
    }
    const near = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        choose()
        near.disconnect()
      },
      { rootMargin: warmMargin ?? (mode === 'manual' ? '300px 0px' : '800px 0px') },
    )
    near.observe(video)
    return () => near.disconnect()
  }, [poster, lazyPoster, mode, warmMargin])

  useEffect(() => {
    const video = element.current
    if (!video) return
    const reduced = prefersReducedMotion()

    // Play (visible mode) and, above all, pause with the screen. A shared clip is played by the
    // scheduler above instead, which keeps the number of playing clips down.
    const useScheduler = shared && mode === 'visible' && !reduced
    let onScreen = false
    const visibility = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting
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

    // A clip is fetched shortly before it scrolls in: one that plays on hover starts at once when hovered, one that plays
    // itself does not sit on its poster while it buffers.
    let warm: IntersectionObserver | null = null
    if (preload === 'none' && !reduced && !(shared && mode === 'visible')) {
      warm = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return
          video.preload = 'auto'
          video.load()
          // Starting a clip for the first time stalls for a moment (the decoder starts up: `playing`, then `waiting`, and a
          // dropped frame), and that happened just as it scrolled into view. So the decoder is started here, while the clip
          // is still off screen: it plays for an instant, is paused again and goes back to its first frame (the poster's).
          video.addEventListener(
            'canplay',
            () => {
              if (onScreen) return
              void video
                .play()
                .then(() => {
                  if (onScreen) return
                  video.pause()
                  video.currentTime = 0
                })
                .catch(() => {})
            },
            { once: true },
          )
          warm?.disconnect()
        },
        { rootMargin: warmMargin ?? (mode === 'manual' ? '300px 0px' : '800px 0px') },
      )
      warm.observe(video)
    }

    return () => {
      visibility.disconnect()
      warm?.disconnect()
      if (sharedVisible.delete(video)) scheduleShared()
      video.pause()
    }
  }, [mode, preload, shared, warmMargin])

  return (
    <video
      ref={element}
      className={className}
      src={src}
      poster={posterSrc}
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
