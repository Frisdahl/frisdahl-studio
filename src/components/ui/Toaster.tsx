import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { toast, subscribe, getItems, type ToastItem as Item } from '../../lib/toast'

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function ToastItem({ item }: { item: Item }) {
  const root = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLSpanElement>(null)
  const timer = useRef<gsap.core.Tween | null>(null)
  const leaving = useRef(false)

  const close = () => {
    const el = root.current
    if (!el || leaving.current) return
    leaving.current = true
    timer.current?.kill()
    if (prefersReducedMotion()) return toast.dismiss(item.id)
    gsap.to(el, {
      autoAlpha: 0,
      y: 12,
      duration: 0.3,
      ease: 'power3.in',
      onComplete: () => toast.dismiss(item.id),
    })
  }

  // Enter: rise from below while fading in. Reduced motion: fade only.
  useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    if (prefersReducedMotion()) gsap.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 })
    else gsap.fromTo(el, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'expo.out' })
    return () => {
      gsap.killTweensOf(el)
    }
  }, [])

  // The timer line drains over the toast's lifetime and pauses while the toast is hovered or focused.
  useEffect(() => {
    const line = bar.current
    if (!line || !item.duration) return
    gsap.set(line, { scaleX: 1 })
    timer.current = gsap.to(line, { scaleX: 0, duration: item.duration / 1000, ease: 'none', onComplete: close })
    return () => {
      timer.current?.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.rev, item.duration])

  return (
    <div
      ref={root}
      className={`toast toast--${item.kind}`}
      role={item.kind === 'error' ? 'alert' : 'status'}
      onMouseEnter={() => timer.current?.pause()}
      onMouseLeave={() => timer.current?.play()}
      onFocus={() => timer.current?.pause()}
      onBlur={() => timer.current?.play()}
    >
      <span className="toast-mark" aria-hidden="true" />
      <div className="toast-body">
        <p className="toast-label">{item.label}</p>
        <p className="toast-title">{item.title}</p>
        {item.text ? <p className="toast-text">{item.text}</p> : null}
      </div>
      <button type="button" className="toast-close" onClick={close} aria-label={item.closeLabel}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      {item.duration ? <span ref={bar} className="toast-timer" aria-hidden="true" /> : null}
    </div>
  )
}

export function Toaster() {
  const [list, setList] = useState<Item[]>(getItems())
  useEffect(() => {
    const update = () => setList(getItems())
    update()
    return subscribe(update)
  }, [])
  return (
    <div className="toaster">
      {list.map((item) => (
        <ToastItem key={item.id} item={item} />
      ))}
    </div>
  )
}
