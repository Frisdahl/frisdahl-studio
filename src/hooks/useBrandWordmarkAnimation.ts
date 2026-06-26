import { useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { BrandPhase } from '../lib/brand'

const fadeStepMs = 300
const collapseStepMs = 360

export function useBrandWordmarkAnimation() {
  const [phase, setPhase] = useState<BrandPhase>(0)
  const phaseRef = useRef<BrandPhase>(0)
  const stepTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const shouldReduceMotion = useReducedMotion()

  phaseRef.current = phase

  const clearStepTimeout = () => {
    if (stepTimeoutRef.current) {
      clearTimeout(stepTimeoutRef.current)
      stepTimeoutRef.current = null
    }
  }

  useEffect(() => clearStepTimeout, [])

  const handleEnter = () => {
    clearStepTimeout()
    setPhase(1)

    if (shouldReduceMotion) {
      setPhase(2)
      return
    }

    stepTimeoutRef.current = setTimeout(() => {
      setPhase(2)
      stepTimeoutRef.current = null
    }, fadeStepMs)
  }

  const handleLeave = () => {
    clearStepTimeout()

    if (shouldReduceMotion) {
      setPhase(0)
      return
    }

    if (phaseRef.current === 2) {
      setPhase(1)
      stepTimeoutRef.current = setTimeout(() => {
        setPhase(0)
        stepTimeoutRef.current = null
      }, collapseStepMs)
      return
    }

    setPhase(0)
  }

  return {
    phase,
    wordmarkHandlers: {
      onMouseEnter: handleEnter,
      onMouseLeave: handleLeave,
      onFocus: handleEnter,
      onBlur: handleLeave,
    },
  }
}
