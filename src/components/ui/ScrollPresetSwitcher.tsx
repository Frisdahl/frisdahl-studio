import { useEffect, useRef, useState } from 'react'
import { SCROLL_PRESETS, setScrollPreset, type ScrollPresetName } from '../../lib/scroll'

const PRESET_KEYS: Record<string, ScrollPresetName> = { '1': 'A', '2': 'B', '3': 'C' }

/**
 * Development aid: press 1, 2 or 3 (outside form fields) to switch the wheel
 * feel between A (responsive), B (balanced) and C (cinematic) on the running
 * page, and a small label confirms it. The pick is remembered; ?scroll=A|B|C in
 * the URL overrides it. Not rendered in production builds.
 */
export function ScrollPresetSwitcher() {
  const [shown, setShown] = useState<ScrollPresetName | null>(null)
  const hideTimer = useRef<number | null>(null)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const name = PRESET_KEYS[event.key]
      if (!name || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return
      const target = event.target as HTMLElement | null
      if (target?.closest('input, textarea, select, [contenteditable="true"]')) return

      setScrollPreset(name)
      setShown(name)
      if (hideTimer.current !== null) window.clearTimeout(hideTimer.current)
      hideTimer.current = window.setTimeout(() => setShown(null), 2200)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      if (hideTimer.current !== null) window.clearTimeout(hideTimer.current)
    }
  }, [])

  if (!shown) return null
  const { label, lerp } = SCROLL_PRESETS[shown]

  return (
    <div
      className="pointer-events-none fixed bottom-4 left-4 z-[9999] rounded-lg bg-black/80 px-3 py-2 font-mono text-xs text-white"
      role="status"
    >
      Scroll {shown}: {label} (lerp {lerp})
    </div>
  )
}
