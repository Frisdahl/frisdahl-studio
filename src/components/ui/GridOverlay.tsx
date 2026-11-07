import { useEffect, useState } from 'react'

/**
 * Development aid: press G (outside form fields) to show the 12-column grid
 * over the page, with the same container, gutter and margins as every section.
 * Not rendered in production builds.
 */
export function GridOverlay() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== 'g' || event.metaKey || event.ctrlKey || event.altKey) return
      const target = event.target as HTMLElement | null
      if (target?.closest('input, textarea, select, [contenteditable="true"]')) return
      setVisible((current) => !current)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  if (!visible) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
      <div className="site-container site-grid h-full">
        {Array.from({ length: 12 }, (_, index) => (
          <div key={index} className="h-full bg-[rgb(235_75_61/0.1)]" />
        ))}
      </div>
    </div>
  )
}
