import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from 'react'

const SCROLL_THRESHOLD = 8

interface NavSize {
  width: number
  height: number
}

export function useFixedNav(navRef: RefObject<HTMLElement | null>) {
  const pinnedTopRef = useRef(0)
  const [isReady, setIsReady] = useState(false)
  const [pinnedTop, setPinnedTop] = useState(0)
  const [navSize, setNavSize] = useState<NavSize>({ width: 0, height: 0 })
  const [isScrolled, setIsScrolled] = useState(false)

  const measurePosition = useCallback(() => {
    const nav = navRef.current
    if (!nav) return

    const rect = nav.getBoundingClientRect()

    pinnedTopRef.current = rect.top
    setPinnedTop(rect.top)
    setNavSize({
      width: nav.offsetWidth,
      height: nav.offsetHeight,
    })
  }, [navRef])

  useLayoutEffect(() => {
    measurePosition()
    setIsReady(true)
  }, [measurePosition])

  useEffect(() => {
    let frameId = 0

    const onScroll = () => {
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > SCROLL_THRESHOLD)
      })
    }

    const onResize = () => {
      if (window.scrollY <= SCROLL_THRESHOLD) {
        measurePosition()
      } else {
        const nav = navRef.current
        if (nav) {
          setNavSize({
            width: nav.offsetWidth,
            height: nav.offsetHeight,
          })
        }
      }
      onScroll()
    }

    onScroll()

    const nav = navRef.current
    const resizeObserver =
      nav && typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(onResize)
        : null

    resizeObserver?.observe(nav as Element)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frameId)
      resizeObserver?.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [measurePosition, navRef])

  return { isReady, pinnedTop, navSize, isScrolled }
}
