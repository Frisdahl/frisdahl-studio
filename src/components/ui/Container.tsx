import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container(
  { children, className = '', ...props },
  ref,
) {
  return (
    <div ref={ref} className={`site-container ${className}`.trim()} {...props}>
      {children}
    </div>
  )
})
