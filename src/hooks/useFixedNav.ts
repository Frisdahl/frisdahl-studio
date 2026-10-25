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
  applyNavSurfaceScroll,
  resetNavSurfaceScroll,
} from '../lib/navSurfaceScroll'
import {
  resetHeaderSlide,
  resetNavClusterSlide,
} from '../lib/navSlideAnimation'
import { ROUTE_SCROLL_RESET_EVENT } from '../lib/scroll'
import { getScrollY, getSmoothScroll } from '../lib/smoothScroll'

const DESKTOP_NAV_MIN_WIDTH = 1024

function isDesktopNav() {
  return window.matchMedia(`(min-width: ${DESKTOP_NAV_MIN_WIDTH}px)`).matches
}

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
  const isReadyRef = useRef(false)
  const [isReady, setIsReady] = useState(false)
  const [navSize, setNavSize] = useState<NavSize>({ width: 0, height: 0 })
  const [isPinned, setIsPinned] = useState(false)

  const syncSiteHeaderHeight = useCallback(() => {
    const header = headerRef.current
    if (!header) return

    document.documentElement.style.setProperty(
      '--site-header-height',
      `${header.offsetHeight}px`,
    )
  }, [headerRef])

  const syncPlaceholderSize = useCallback(() => {
    const cluster = clusterRef.current
    const placeholder = placeholderRef.current
    const header = headerRef.current

    if (!cluster || !placeholder) return

    placeholder.style.width = `${cluster.offsetWidth}px`
    placeholder.style.height = `${cluster.offsetHeight}px`

    if (header) {
      header.style.setProperty('--site-header-nav-height', `${cluster.offsetHeight}px`)
    }

    syncSiteHeaderHeight()
  }, [clusterRef, headerRef, placeholderRef, syncSiteHeaderHeight])

  const measurePosition = useCallback(() => {
    const cluster = clusterRef.current
    const nav = navRef.current
    const header = headerRef.current
    const headerBar = header?.querySelector<HTMLElement>('.site-header-bar')

    if (!nav || !cluster || !headerBar) return

    const clusterHeight = cluster.offsetHeight

    if (getScrollY() <= 0) {
      const barRect = headerBar.getBoundingClientRect()
      pinnedTopRef.current = barRect.top + (barRect.height - clusterHeight) / 2
    } else {
      pinnedTopRef.current = cluster.getBoundingClientRect().top
    }
    setNavSize({
      width: cluster.offsetWidth,
      height: cluster.offsetHeight,
    })
    syncPlaceholderSize()
  }, [navRef, clusterRef, headerRef, syncPlaceholderSize])

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
        resetNavClusterSlide(cluster)
        return
      }

      cluster.style.removeProperty('top')
      cluster.style.removeProperty('--nav-cluster-pinned-top')
      cluster.style.removeProperty('transform')
      cluster.style.removeProperty('transition')
    },
    [clusterRef],
  )

  // `flush` forces the pinned class to render before the inline styles are
  // applied. It must be false when called during React's layout phase, where
  // flushSync is not allowed and the update is committed before paint anyway.
  const setPinned = useCallback(
    (pinned: boolean, flush: boolean) => {
      if (flush) {
        flushSync(() => {
          setIsPinned(pinned)
        })
      } else {
        setIsPinned(pinned)
      }
      applyPinnedStyles(pinned)
    },
    [applyPinnedStyles],
  )

  const pinDesktopNav = useCallback(
    (flush = true) => {
      if (!isDesktopNav()) return

      measurePosition()
      setPinned(true, flush)
    },
    [measurePosition, setPinned],
  )

  const resetScrollStyles = useCallback(() => {
    resetNavSurfaceScroll(clusterRef.current)
    resetHeaderSlide(headerRef.current)
    resetNavClusterSlide(clusterRef.current)
  }, [clusterRef, headerRef])

  const updateScrollState = useCallback(
    (scrollY: number) => {
      if (!isDesktopNav()) return

      if (scrollY <= 0) {
        resetNavSurfaceScroll(clusterRef.current)
      } else {
        applyNavSurfaceScroll(clusterRef.current, scrollY)
      }

      syncPlaceholderSize()
    },
    [clusterRef, syncPlaceholderSize],
  )

  useLayoutEffect(() => {
    syncSiteHeaderHeight()
    measurePosition()
    resetScrollStyles()
    isReadyRef.current = true
    setIsReady(true)
    pinDesktopNav(false)
  }, [clusterRef, measurePosition, pinDesktopNav, resetScrollStyles, syncSiteHeaderHeight])

  useEffect(() => {
    const header = headerRef.current
    if (!header || typeof ResizeObserver === 'undefined') return

    const observer = new ResizeObserver(() => {
      syncSiteHeaderHeight()
    })

    observer.observe(header)
    return () => observer.disconnect()
  }, [headerRef, syncSiteHeaderHeight])

  useEffect(() => {
    const onScroll = () => {
      updateScrollState(getScrollY())
    }

    const onResize = () => {
      syncSiteHeaderHeight()

      if (isDesktopNav()) {
        pinDesktopNav()
      }

      updateScrollState(getScrollY())
    }

    // Dispatched synchronously from ScrollToTop's layout effect.
    const onRouteScrollReset = () => {
      syncSiteHeaderHeight()
      resetScrollStyles()
      pinDesktopNav(false)
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
  }, [pinDesktopNav, resetScrollStyles, syncSiteHeaderHeight, updateScrollState])

  return {
    isReady,
    navSize,
    isPinned,
  }
}
