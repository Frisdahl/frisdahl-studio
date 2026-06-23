import type { HTMLAttributes, ReactNode } from 'react'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function Container({ children, className = '', ...props }: ContainerProps) {
  return (
    <div className={`container max-w-[1280px] ${className}`.trim()} {...props}>
      {children}
    </div>
  )
}
