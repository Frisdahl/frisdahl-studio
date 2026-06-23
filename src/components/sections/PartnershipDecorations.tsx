export function PartnershipImageDecorations() {
  return (
    <>
      <svg
        className="pointer-events-none absolute -right-2 top-[10%] z-[1] h-5 w-5 text-accent sm:-right-3 sm:h-6 sm:w-6"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="4" fill="none" />
      </svg>

      <span
        className="pointer-events-none absolute -left-2 top-[32%] z-[1] h-2.5 w-2.5 rounded-full bg-accent-yellow"
        aria-hidden="true"
      />

      <span
        className="pointer-events-none absolute -right-1 bottom-[18%] z-[1] h-2 w-2 rounded-full bg-accent"
        aria-hidden="true"
      />
    </>
  )
}
