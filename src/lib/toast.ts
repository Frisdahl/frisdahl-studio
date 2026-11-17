export type ToastKind = 'success' | 'error' | 'info'
export interface ToastInput {
  /** The same id replaces the toast in place (a "sending" toast turns into "sent"). */
  id?: string
  kind?: ToastKind
  /** The small line above the title, e.g. "Sendt". */
  label: string
  title: string
  text?: string
  /** Milliseconds on screen; 0 keeps it until it is replaced or closed. Default: 5 s, errors 6.5 s, info 0. */
  duration?: number
  /** Accessible name of the close button. */
  closeLabel?: string
}
export type ToastItem = Required<Pick<ToastInput, 'id' | 'kind' | 'label' | 'title' | 'duration' | 'closeLabel'>> & {
  text?: string
  rev: number
}

const MAX = 3

let items: ToastItem[] = []

export const getItems = () => items
export function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}
let seq = 0
const listeners = new Set<() => void>()
const emit = () => listeners.forEach((listener) => listener())

/** Toasts at the bottom centre of the screen. Mount <Toaster /> once (App.tsx), call `toast.show` from anywhere. */
export const toast = {
  show(input: ToastInput): string {
    const kind = input.kind ?? 'info'
    const id = input.id ?? `toast-${++seq}`
    const next: ToastItem = {
      id,
      kind,
      label: input.label,
      title: input.title,
      text: input.text,
      closeLabel: input.closeLabel ?? 'Luk',
      duration: input.duration ?? (kind === 'error' ? 6500 : kind === 'info' ? 0 : 5000),
      rev: ++seq,
    }
    const at = items.findIndex((item) => item.id === id)
    items = at >= 0 ? items.map((item, index) => (index === at ? next : item)) : [...items, next].slice(-MAX)
    emit()
    return id
  },
  dismiss(id: string) {
    items = items.filter((item) => item.id !== id)
    emit()
  },
}

