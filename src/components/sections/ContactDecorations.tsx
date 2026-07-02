function DecorativeRing({
  className,
}: {
  className: string
}) {
  return (
    <svg className={className} viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="4" fill="none" />
    </svg>
  )
}

export function ContactDecorations() {
  return (
    <>
      <span className="pointer-events-none absolute left-[10%] top-[22%] z-0 h-2.5 w-2.5 rounded-full bg-accent-yellow/65 sm:left-[14%]" />
      <span className="pointer-events-none absolute right-[18%] top-[16%] z-0 hidden h-2 w-2 rounded-full bg-accent/50 sm:block lg:right-[22%]" />
      <span className="pointer-events-none absolute bottom-[38%] left-[7%] z-0 h-2 w-2 rounded-full bg-accent/35 lg:left-[11%]" />
      <span className="pointer-events-none absolute bottom-[26%] right-[9%] z-0 h-3 w-3 rounded-full bg-accent-yellow/45 sm:right-[13%]" />
      <span className="pointer-events-none absolute left-[42%] top-[12%] z-0 hidden h-1.5 w-1.5 rounded-full bg-accent/40 lg:block" />

      <DecorativeRing className="pointer-events-none absolute right-[11%] top-[28%] z-0 h-6 w-6 text-accent sm:right-[15%] sm:h-7 sm:w-7" />
      <DecorativeRing className="pointer-events-none absolute bottom-[22%] left-[9%] z-0 h-5 w-5 text-accent-yellow sm:left-[13%] sm:h-6 sm:w-6" />
      <DecorativeRing className="pointer-events-none absolute bottom-[14%] right-[28%] z-0 hidden h-4 w-4 text-accent/55 sm:block lg:h-5 lg:w-5" />
    </>
  )
}
