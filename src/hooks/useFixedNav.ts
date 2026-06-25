import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from 'react'
import {
  applyNavScrollAnimation,
  getNavScrollAnimation,
  initialNavScrollAnimation,
} from './useNavScrollAnimation'

const SCROLL_THRESHOLD = 8
const SCROLL_ANIMATION_START = 250

interface NavSize {
  width: number
  height: number
}

interface UseFixedNavOptions {
  navRef: RefObject<HTMLElement | null>
  clusterRef: RefObject<HTMLElement | null>
  placeholderRef: RefObject<HTMLElement | null>
}

export function useFixedNav({
  navRef,
  clusterRef,
  placeholderRef,
}: UseFixedNavOptions) {
  const pinnedTopRef = useRef(0)
  const wasScrolledRef = useRef(false)
  const [isReady, setIsReady] = useState(false)
  const [pinnedTop, setPinnedTop] = useState(0)
  const [navSize, setNavSize] = useState<NavSize>({ width: 0, height: 0 })
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const syncPlaceholderSize = useCallback(() => {
    const nav = navRef.current
    const placeholder = placeholderRef.current

    if (!nav || !placeholder) return

    placeholder.style.width = `${nav.offsetWidth}px`
    placeholder.style.height = `${nav.offsetHeight}px`
  }, [navRef, placeholderRef])

  const measurePosition = useCallback(() => {
    const nav = navRef.current
    const cluster = clusterRef.current
    if (!nav || !cluster) return

    const rect = cluster.getBoundingClientRect()

    pinnedTopRef.current = rect.top
    setPinnedTop(rect.top)
    setNavSize({
      width: nav.offsetWidth,
      height: nav.offsetHeight,
    })
    syncPlaceholderSize()
  }, [navRef, clusterRef, syncPlaceholderSize])

  const updateScrollState = useCallback(
    (scrollY: number) => {
      const scrolled = scrollY > SCROLL_THRESHOLD
      const animating = scrollY >= SCROLL_ANIMATION_START
      const animation = animating
        ? getNavScrollAnimation(scrollY)
        : initialNavScrollAnimation

      applyNavScrollAnimation(clusterRef.current, animation)

      if (scrolled) {
        syncPlaceholderSize()
      } else if (wasScrolledRef.current) {
        measurePosition()
      }

      wasScrolledRef.current = scrolled

      setIsScrolled((current) => (current === scrolled ? current : scrolled))
      setIsAnimating((current) => (current === animating ? current : animating))
    },
    [clusterRef, measurePosition, syncPlaceholderSize],
  )

  useLayoutEffect(() => {
    measurePosition()
    applyNavScrollAnimation(clusterRef.current, initialNavScrollAnimation)
    setIsReady(true)
  }, [clusterRef, measurePosition])

  useEffect(() => {
    let frameId = 0

    const onScroll = () => {
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(() => {
        updateScrollState(window.scrollY)
      })
    }

    const onResize = () => {
      if (window.scrollY <= SCROLL_THRESHOLD) {
        measurePosition()
      }

      updateScrollState(window.scrollY)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [measurePosition, updateScrollState])

  return { isReady, pinnedTop, navSize, isScrolled, isAnimating }
}
