import { useEffect, useRef } from 'react'

function getSectionTop(element: HTMLElement) {
  return window.scrollY + element.getBoundingClientRect().top
}

export function useFeatureScrollTheme() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let frameId = 0

    const updateTheme = () => {
      const contactSection = document.getElementById('contact')
      const featureTop = getSectionTop(section)
      const contactTop = contactSection ? getSectionTop(contactSection) : Number.POSITIVE_INFINITY
      const isDark = window.scrollY >= featureTop && window.scrollY < contactTop

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
