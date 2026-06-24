import { useRef } from 'react'
import { useScrollTheme } from './useScrollTheme'

export function useFeatureScrollTheme() {
  const sectionRef = useRef<HTMLElement>(null)

  useScrollTheme({
    startRef: sectionRef,
    endId: 'partnership',
  })

  return sectionRef
}
