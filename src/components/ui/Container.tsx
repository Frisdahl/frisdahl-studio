import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  /**
   * Always span all 12 columns. The default content area currently spans the
   * same width (see --site-grid-content-start/-span in index.css); this flag
   * keeps a section full width even if that content area is narrowed later.
   */
  fullWidth?: boolean
  /**
   * Lay the content out on the 12 columns: its children can then use
   * col-span-* / col-start-* (and lg: variants) directly. Without it the
   * children flow as before and the content spans the whole container.
   */
  columns?: boolean
  /** Extra classes for the content area (the subgrid when `columns` is set). */
  contentClassName?: string
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container(
  { children, className = '', contentClassName = '', fullWidth = false, columns = false, ...props },
  ref,
) {
  return (
    <div ref={ref} className={`site-container site-grid ${className}`.trim()} {...props}>
      <div
        className={`${fullWidth ? 'site-grid-full' : 'site-grid-content'}${columns ? ' site-grid-subgrid' : ''} ${contentClassName}`.trim()}
      >
        {children}
      </div>
    </div>
  )
})
