import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from 'react'
import { flushSync } from 'react-dom'
import {
  applyNavScrollAnimation,
  getNavScrollAnimation,
  initialNavScrollAnimation,
} from './useNavScrollAnimation'
import { ROUTE_SCROLL_RESET_EVENT } from '../lib/scroll'

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
  const isReadyRef = useRef(false)
  const [isReady, setIsReady] = useState(false)
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
    setNavSize({
      width: nav.offsetWidth,
      height: nav.offsetHeight,
    })
    syncPlaceholderSize()
  }, [navRef, clusterRef, syncPlaceholderSize])

  const applyPinnedStyles = useCallback(
    (scrolled: boolean) => {
      const cluster = clusterRef.current
      if (!cluster || !isReadyRef.current) return

      if (scrolled) {
        cluster.classList.add(
          'site-header-nav-cluster-fixed',
          'site-header-nav-surfaced',
        )
        cluster.style.top = `${pinnedTopRef.current}px`
        return
      }

      cluster.classList.remove(
        'site-header-nav-cluster-fixed',
        'site-header-nav-surfaced',
      )
      cluster.style.removeProperty('top')
    },
    [clusterRef],
  )

  const updateScrollState = useCallback(
    (scrollY: number) => {
      const scrolled = scrollY > 0
      const animating = scrollY >= SCROLL_ANIMATION_START
      const animation = animating
        ? getNavScrollAnimation(scrollY)
        : initialNavScrollAnimation

      applyNavScrollAnimation(clusterRef.current, animation)

      if (scrolled !== wasScrolledRef.current) {
        applyPinnedStyles(scrolled)

        flushSync(() => {
          setIsScrolled(scrolled)
        })

        if (!scrolled) {
          measurePosition()
        }
      }

      if (scrolled) {
        syncPlaceholderSize()
      }

      wasScrolledRef.current = scrolled
      setIsAnimating((current) => (current === animating ? current : animating))
    },
    [
      applyPinnedStyles,
      clusterRef,
      measurePosition,
      syncPlaceholderSize,
    ],
  )

  useLayoutEffect(() => {
    measurePosition()
    applyNavScrollAnimation(clusterRef.current, initialNavScrollAnimation)
    isReadyRef.current = true
    setIsReady(true)
  }, [clusterRef, measurePosition])

  useEffect(() => {
    const onScroll = () => {
      updateScrollState(window.scrollY)
    }

    const onResize = () => {
      if (window.scrollY <= 0) {
        measurePosition()
      }

      updateScrollState(window.scrollY)
    }

    const onRouteScrollReset = () => {
      updateScrollState(0)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    window.addEventListener(ROUTE_SCROLL_RESET_EVENT, onRouteScrollReset)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.removeEventListener(ROUTE_SCROLL_RESET_EVENT, onRouteScrollReset)
    }
  }, [measurePosition, updateScrollState])

  return { isReady, navSize, isScrolled, isAnimating }
}
