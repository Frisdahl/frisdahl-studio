/**
 * A short, calm confetti burst for "your message was sent" (the contact form).
 *
 * Original code, no dependency. One full-screen canvas that lets clicks through (pointer-events: none),
 * drawn with requestAnimationFrame and removed when the last piece has faded out, so nothing is left in
 * the page afterwards. The pieces leave the send button in an upward fan, slow down in the air (drag),
 * fall with a little sway and tumble (a flipping width), and fade out over the last 0.8 s. No bounce, no
 * spring: it follows the site's motion language (docs/MOTION.md), only the palette is the brand's.
 *
 * Reduced motion: nothing is drawn (the toast already says the message was sent).
 */

interface Piece {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  /** 'bar' is a thin rectangle, 'dot' a small circle. */
  shape: 'bar' | 'dot'
  color: string
  /** Rotation (rad) and its speed (rad/s). */
  angle: number
  spin: number
  /** The flip of a tumbling piece: phase (rad) and speed (rad/s). */
  flip: number
  flipSpeed: number
  /** Sideways sway while falling: phase, speed (rad/s), strength (px/s). */
  sway: number
  swaySpeed: number
  swayAmp: number
  /** Seconds the piece lives. */
  life: number
}

export interface ConfettiOptions {
  /** Where the burst starts, in viewport pixels. Default: the bottom centre of the screen. */
  origin?: { x: number; y: number }
}

/** The brand: the accent red leads, the ink and two soft tints keep it quiet. */
const COLORS: readonly string[] = [
  '#ff4f56', '#ff4f56', '#ff4f56', '#ff4f56', '#ff4f56', '#ff4f56',
  '#131313', '#131313',
  '#ffb3b6', '#ffb3b6',
  '#c9c8c8',
]

const GRAVITY = 1500 // px/s²
const DRAG = 2.1 // 1/s: the air slows the burst down within about half a second
const FADE = 0.8 // s: the last stretch of a piece's life, fading out

let active = false

const rand = (min: number, max: number) => min + Math.random() * (max - min)

/** Fires one burst. Does nothing under reduced motion, on the server, or while a burst is still playing. */
export function launchConfetti({ origin }: ConfettiOptions = {}): void {
  if (typeof window === 'undefined' || active) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const width = window.innerWidth
  const height = window.innerHeight
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const small = width < 640
  const count = small ? 60 : 100
  // Scale the burst with the screen, so it reaches about the same part of the page on a phone.
  const reach = Math.min(1, Math.max(0.6, width / 1280))
  const from = origin ?? { x: width / 2, y: height * 0.85 }

  const canvas = document.createElement('canvas')
  canvas.width = Math.round(width * dpr)
  canvas.height = Math.round(height * dpr)
  canvas.setAttribute('aria-hidden', 'true')
  canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:10000'
  const context = canvas.getContext('2d')
  if (!context) return
  document.body.append(canvas)
  context.scale(dpr, dpr)
  active = true

  const pieces: Piece[] = Array.from({ length: count }, (): Piece => {
    // An upward fan, 62 degrees to either side of straight up.
    const direction = -Math.PI / 2 + rand(-1.08, 1.08)
    const speed = rand(850, 1750) * reach
    const shape = Math.random() < 0.28 ? 'dot' : 'bar'
    return {
      x: from.x + rand(-8, 8),
      y: from.y + rand(-4, 4),
      vx: Math.cos(direction) * speed,
      vy: Math.sin(direction) * speed,
      size: shape === 'dot' ? rand(3, 5) : rand(5, 9),
      shape,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      angle: rand(0, Math.PI * 2),
      spin: rand(-6, 6),
      flip: rand(0, Math.PI * 2),
      flipSpeed: rand(5, 11),
      sway: rand(0, Math.PI * 2),
      swaySpeed: rand(2, 4),
      swayAmp: rand(30, 90),
      life: rand(2.1, 2.9),
    }
  })

  let last = performance.now()
  let elapsed = 0
  let frame = 0

  const finish = () => {
    cancelAnimationFrame(frame)
    window.removeEventListener('pagehide', finish)
    canvas.remove()
    active = false
  }
  window.addEventListener('pagehide', finish)

  const tick = (now: number) => {
    // Never step more than 50 ms, so a stalled tab does not teleport the pieces.
    const dt = Math.min((now - last) / 1000, 0.05)
    last = now
    elapsed += dt
    context.clearRect(0, 0, width, height)

    let alive = 0
    for (const piece of pieces) {
      if (elapsed >= piece.life) continue
      alive++
      const drag = Math.exp(-DRAG * dt)
      piece.vx *= drag
      piece.vy = piece.vy * drag + GRAVITY * dt
      piece.sway += piece.swaySpeed * dt
      piece.x += (piece.vx + Math.sin(piece.sway) * piece.swayAmp) * dt
      piece.y += piece.vy * dt
      piece.angle += piece.spin * dt
      piece.flip += piece.flipSpeed * dt

      const remaining = piece.life - elapsed
      context.globalAlpha = remaining < FADE ? remaining / FADE : 1
      context.fillStyle = piece.color
      context.save()
      context.translate(piece.x, piece.y)
      context.rotate(piece.angle)
      if (piece.shape === 'dot') {
        context.beginPath()
        context.arc(0, 0, piece.size, 0, Math.PI * 2)
        context.fill()
      } else {
        // A thin bar turning over in the air: its short side shrinks and grows with the flip.
        const flip = Math.cos(piece.flip)
        context.scale(1, 0.25 + 0.75 * Math.abs(flip))
        context.fillRect(-piece.size / 2, -piece.size * 0.9, piece.size, piece.size * 1.8)
      }
      context.restore()
    }

    if (alive === 0) {
      finish()
      return
    }
    frame = requestAnimationFrame(tick)
  }
  frame = requestAnimationFrame(tick)
}
