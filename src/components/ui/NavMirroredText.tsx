import type { CSSProperties } from 'react'

interface NavMirroredTextProps {
  text: string
}

function getCenterOutDelay(index: number, total: number, stepMs: number) {
  const center = (total - 1) / 2
  const distance = Math.abs(index - center)

  return `${distance * stepMs}ms`
}

function renderLine(
  text: string,
  lineClassName: string,
  hidden = false,
) {
  const letters = [...text]

  return (
    <span className={lineClassName} aria-hidden={hidden}>
      {letters.map((char, index) => (
        <span
          key={`${lineClassName}-${char}-${index}`}
          className="nav-mirrored-text-char"
          style={
            {
              '--char-delay': getCenterOutDelay(index, letters.length, 28),
            } as CSSProperties
          }
        >
          {char === ' ' ? '\u00a0' : char}
        </span>
      ))}
    </span>
  )
}

export function NavMirroredText({ text }: NavMirroredTextProps) {
  return (
    <span className="nav-mirrored-text-viewport">
      {renderLine(text, 'nav-mirrored-text-line nav-mirrored-text-line-primary')}
      {renderLine(text, 'nav-mirrored-text-line nav-mirrored-text-line-mirror', true)}
    </span>
  )
}
