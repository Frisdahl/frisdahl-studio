interface DecorativeRingsProps {
  topRingClassName?: string
  bottomRingClassName?: string
}

const defaultTopRingClassName =
  'pointer-events-none absolute -top-2 right-14 z-[1] h-5 w-5 text-accent sm:-top-3 sm:right-20 sm:h-6 sm:w-6'

const defaultBottomRingClassName =
  'pointer-events-none absolute -bottom-10 -left-2 z-[1] h-4 w-4 text-accent-yellow sm:-bottom-5 sm:left-3 sm:h-5 sm:w-5'

export function DecorativeRings({
  topRingClassName = defaultTopRingClassName,
  bottomRingClassName = defaultBottomRingClassName,
}: DecorativeRingsProps) {
  return (
    <>
      <svg
        className={topRingClassName}
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="4" fill="none" />
      </svg>

      <svg
        className={bottomRingClassName}
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="4" fill="none" />
      </svg>
    </>
  )
}

export const partnershipRingClasses = {
  topRingClassName:
    'pointer-events-none absolute -top-2 right-2 z-[1] h-5 w-5 text-accent sm:-top-3 sm:right-3 sm:h-6 sm:w-6',
  bottomRingClassName:
    'pointer-events-none absolute -bottom-8 -left-3 z-[1] h-4 w-4 text-accent-yellow sm:-bottom-5 sm:-left-1 sm:h-5 sm:w-5',
} as const
