import { useCallback, useRef } from 'react'

const ENTER_DURATION = 300
const EXIT_DURATION = 300

type Phase = 'idle' | 'entering' | 'visible' | 'exiting'

export function useUnderlineHover() {
  const ref = useRef<HTMLAnchorElement>(null)
  const phaseRef = useRef<Phase>('idle')
  const timerRef = useRef<number | null>(null)
  const enterStartedAtRef = useRef<number | null>(null)

  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  const setUnderlineVisible = (el: HTMLAnchorElement) => {
    el.classList.remove('underline-exiting')
    el.classList.add('underline-visible')
  }

  const startExit = useCallback((el: HTMLAnchorElement) => {
    phaseRef.current = 'exiting'
    el.classList.remove('underline-visible')
    el.classList.add('underline-exiting')

    timerRef.current = window.setTimeout(() => {
      el.classList.remove('underline-visible', 'underline-exiting')
      phaseRef.current = 'idle'
      enterStartedAtRef.current = null
      timerRef.current = null
    }, EXIT_DURATION)
  }, [])

  const onEnter = useCallback(() => {
    const el = ref.current
    if (!el) return

    clearTimer()
    enterStartedAtRef.current = Date.now()
    phaseRef.current = 'entering'
    setUnderlineVisible(el)

    timerRef.current = window.setTimeout(() => {
      if (phaseRef.current === 'entering' || phaseRef.current === 'visible') {
        phaseRef.current = 'visible'
      }
      timerRef.current = null
    }, ENTER_DURATION)
  }, [])

  const onLeave = useCallback(() => {
    const el = ref.current
    if (!el) return

    clearTimer()

    if (phaseRef.current === 'entering' && enterStartedAtRef.current !== null) {
      const elapsed = Date.now() - enterStartedAtRef.current
      const remaining = Math.max(0, ENTER_DURATION - elapsed)

      timerRef.current = window.setTimeout(() => {
        startExit(el)
      }, remaining)
      return
    }

    startExit(el)
  }, [startExit])

  return {
    ref,
    underlineProps: {
      onMouseEnter: onEnter,
      onMouseLeave: onLeave,
      onFocus: onEnter,
      onBlur: onLeave,
    },
  }
}
