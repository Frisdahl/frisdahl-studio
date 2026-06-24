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
      const partnershipSection = document.getElementById('partnership')
      const featureTop = getSectionTop(section)
      const partnershipTop = partnershipSection
        ? getSectionTop(partnershipSection)
        : Number.POSITIVE_INFINITY
      const isDark = window.scrollY >= featureTop && window.scrollY < partnershipTop

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
