import { useEffect, useRef } from 'react'

const SCROLL_THRESHOLD = 0.3

export function useFeatureScrollTheme() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let frameId = 0

    const updateTheme = () => {
      const rect = section.getBoundingClientRect()
      const sectionTop = window.scrollY + rect.top
      const sectionHeight = section.offsetHeight
      const progress = (window.scrollY - sectionTop) / sectionHeight
      const isDark = progress >= SCROLL_THRESHOLD

      document.body.classList.toggle('theme-dark', isDark)
    }

    const onScroll = () => {
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(updateTheme)
    }

    updateTheme()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      document.body.classList.remove('theme-dark')
    }
  }, [])

  return sectionRef
}
