import type { ReactNode, RefObject } from 'react'
import { Container } from '../ui'

export interface SplitIntroSectionProps {
  eyebrow: string
  title: string
  description: string
  eyebrowTheme?: boolean
  id?: string
  titleRef?: RefObject<HTMLHeadingElement | null>
  children?: ReactNode
}

export function SplitIntroSection({
  eyebrow,
  title,
  description,
  eyebrowTheme = false,
  id,
  titleRef,
  children,
}: SplitIntroSectionProps) {
  return (
    <section id={id} className="py-section-sm lg:py-section">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div className="min-w-0">
            <p className={eyebrowTheme ? 'eyebrow eyebrow-theme' : 'eyebrow'}>{eyebrow}</p>
            <h3 ref={titleRef} className="mt-md">
              {title}
            </h3>
          </div>

          <div className="min-w-0">
            <p className="text-body">{description}</p>
          </div>
        </div>

        {children}
      </Container>
    </section>
  )
}
