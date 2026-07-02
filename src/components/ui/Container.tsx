import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  /** Use full 12-column width instead of the default centered 8-column content area. */
  fullWidth?: boolean
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container(
  { children, className = '', fullWidth = false, ...props },
  ref,
) {
  return (
    <div ref={ref} className={`site-container site-grid ${className}`.trim()} {...props}>
      <div className={fullWidth ? 'site-grid-full' : 'site-grid-content'}>{children}</div>
    </div>
  )
})
