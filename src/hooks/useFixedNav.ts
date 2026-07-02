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
  applyNavBrandScrollAnimation,
  resetNavBrandScrollAnimation,
} from '../lib/navBrandScroll'
import {
  applyNavSurfaceScroll,
  resetNavSurfaceScroll,
} from '../lib/navSurfaceScroll'
import {
  clearNavClusterSlide,
  hideHeaderSlide,
  hideNavClusterSlide,
  resetHeaderSlide,
  resetNavClusterSlide,
  revealHeaderSlide,
  revealNavClusterSlide,
} from '../lib/navSlideAnimation'
import { ROUTE_SCROLL_RESET_EVENT } from '../lib/scroll'
import { getScrollY, getSmoothScroll } from '../lib/smoothScroll'

const MIN_SCROLL_Y = 72
const SCROLL_DIRECTION_THRESHOLD = 4

interface NavSize {
  width: number
  height: number
}

interface UseFixedNavOptions {
  headerRef: RefObject<HTMLElement | null>
  navRef: RefObject<HTMLElement | null>
  clusterRef: RefObject<HTMLElement | null>
  placeholderRef: RefObject<HTMLElement | null>
}

export function useFixedNav({
  headerRef,
  navRef,
  clusterRef,
  placeholderRef,
}: UseFixedNavOptions) {
  const pinnedTopRef = useRef(0)
  const isFixedActiveRef = useRef(false)
  const isCollapsedRef = useRef(false)
  const lastScrollYRef = useRef(0)
  const isReadyRef = useRef(false)
  const [isReady, setIsReady] = useState(false)
  const [navSize, setNavSize] = useState<NavSize>({ width: 0, height: 0 })
  const [isPinned, setIsPinned] = useState(false)

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
    (pinned: boolean) => {
      const cluster = clusterRef.current
      if (!cluster || !isReadyRef.current) return

      if (pinned) {
        cluster.style.top = `${pinnedTopRef.current}px`
        cluster.style.setProperty(
          '--nav-cluster-pinned-top',
          `${pinnedTopRef.current}px`,
        )
        return
      }

      cluster.style.removeProperty('top')
      cluster.style.removeProperty('--nav-cluster-pinned-top')
    },
    [clusterRef],
  )

  const setPinned = useCallback(
    (pinned: boolean) => {
      flushSync(() => {
        setIsPinned(pinned)
      })
      applyPinnedStyles(pinned)
    },
    [applyPinnedStyles],
  )

  const collapseNav = useCallback(() => {
    isCollapsedRef.current = true
    hideNavClusterSlide(clusterRef.current, pinnedTopRef.current)
    hideHeaderSlide(headerRef.current)
  }, [clusterRef, headerRef])

  const revealNav = useCallback(() => {
    isCollapsedRef.current = false
    revealNavClusterSlide(clusterRef.current, pinnedTopRef.current)
    revealHeaderSlide(headerRef.current)
  }, [clusterRef, headerRef])

  const resetToFlow = useCallback(() => {
    const cluster = clusterRef.current

    if (cluster && isFixedActiveRef.current && !isCollapsedRef.current) {
      cluster.style.transition = 'none'
      cluster.style.transform = 'translate3d(-50%, 0, 0)'
      cluster.offsetHeight
    }

    isFixedActiveRef.current = false
    isCollapsedRef.current = false
    clearNavClusterSlide(cluster)
    resetHeaderSlide(headerRef.current)
    setPinned(false)
    resetNavSurfaceScroll(cluster)
    measurePosition()
  }, [clusterRef, headerRef, measurePosition, setPinned])

  const updateScrollState = useCallback(
    (scrollY: number) => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      const delta = scrollY - lastScrollYRef.current
      const atTop = scrollY <= 0
      const pastMinScroll = scrollY > MIN_SCROLL_Y
      const scrollingUp = delta < -SCROLL_DIRECTION_THRESHOLD
      const scrollingDown = delta > SCROLL_DIRECTION_THRESHOLD

      lastScrollYRef.current = scrollY

      applyNavBrandScrollAnimation(clusterRef.current, scrollY)

      if (atTop) {
        resetToFlow()
        return
      }

      if (prefersReducedMotion) {
        const fixed = pastMinScroll

        if (fixed !== isFixedActiveRef.current) {
          isFixedActiveRef.current = fixed
          setPinned(fixed)

          if (fixed) {
            resetNavClusterSlide(clusterRef.current)
            resetHeaderSlide(headerRef.current)
            applyNavSurfaceScroll(clusterRef.current, scrollY)
            syncPlaceholderSize()
          } else {
            resetToFlow()
          }
        } else if (fixed) {
          applyNavSurfaceScroll(clusterRef.current, scrollY)
          syncPlaceholderSize()
        }

        return
      }

      if (scrollingUp && pastMinScroll) {
        const wasCollapsed = isCollapsedRef.current
        const wasFixedActive = isFixedActiveRef.current
        const shouldReveal = wasCollapsed || !wasFixedActive

        isFixedActiveRef.current = true
        setPinned(true)
        applyNavSurfaceScroll(clusterRef.current, scrollY)
        syncPlaceholderSize()

        if (shouldReveal) {
          revealNav()
        } else {
          isCollapsedRef.current = false
          resetNavClusterSlide(clusterRef.current)
          resetHeaderSlide(headerRef.current)
        }

        return
      }

      if (scrollingDown && pastMinScroll && isFixedActiveRef.current) {
        setPinned(true)
        applyNavSurfaceScroll(clusterRef.current, scrollY)
        collapseNav()
        return
      }

      if (isFixedActiveRef.current && !isCollapsedRef.current) {
        setPinned(true)
        applyNavSurfaceScroll(clusterRef.current, scrollY)
        syncPlaceholderSize()
      }
    },
    [
      clusterRef,
      collapseNav,
      headerRef,
      revealNav,
      resetToFlow,
      setPinned,
      syncPlaceholderSize,
    ],
  )

  useLayoutEffect(() => {
    measurePosition()
    resetNavBrandScrollAnimation(clusterRef.current)
    resetNavSurfaceScroll(clusterRef.current)
    isReadyRef.current = true
    setIsReady(true)
  }, [clusterRef, measurePosition])

  useEffect(() => {
    const onScroll = () => {
      updateScrollState(getScrollY())
    }

    const onResize = () => {
      if (getScrollY() <= 0) {
        measurePosition()
      }

      updateScrollState(getScrollY())
    }

    const onRouteScrollReset = () => {
      resetNavBrandScrollAnimation(clusterRef.current)
      lastScrollYRef.current = 0
      resetToFlow()
      updateScrollState(0)
    }

    onScroll()

    const lenis = getSmoothScroll()
    if (lenis) {
      lenis.on('scroll', onScroll)
    } else {
      window.addEventListener('scroll', onScroll, { passive: true })
    }

    window.addEventListener('resize', onResize)
    window.addEventListener(ROUTE_SCROLL_RESET_EVENT, onRouteScrollReset)

    return () => {
      if (lenis) {
        lenis.off('scroll', onScroll)
      } else {
        window.removeEventListener('scroll', onScroll)
      }
      window.removeEventListener('resize', onResize)
      window.removeEventListener(ROUTE_SCROLL_RESET_EVENT, onRouteScrollReset)
    }
  }, [measurePosition, resetToFlow, updateScrollState])

  return {
    isReady,
    navSize,
    isPinned,
  }
}
