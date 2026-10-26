import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  /**
   * Always span all 12 columns. The default content area currently spans the
   * same width (see --site-grid-content-start/-span in index.css); this flag
   * keeps a section full width even if that content area is narrowed later.
   */
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
