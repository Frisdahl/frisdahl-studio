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
      <svg
        className="contact-decoration-lines contact-decoration-lines-left"
        viewBox="0 0 3066 964.24"
        fill="none"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(420 80) scale(0.92)">
          <path
            d="M-1234.934,470.344S-417.694,862.1-36,673.477C486.858,404.691,1234.5,1235.59,1958.05,863.631s860.108-261.125,860.108-261.125"
            stroke="currentColor"
            strokeWidth="0.75"
          />
          <path
            d="M2490.15,18.3C1696.23-159.366,1182.04,833.087,608.333,704.7"
            stroke="currentColor"
            strokeWidth="0.75"
          />
        </g>
      </svg>

      <svg
        className="contact-decoration-lines contact-decoration-lines-right"
        viewBox="0 0 3066 964.24"
        fill="none"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(720 40) scale(0.78)">
          <path
            d="M-980.5,390.2S-320.4,780.5,12.5,610.8C420.6,360.4,1020.8,1080.2,1620.3,720.5s710.2-215.8,710.2-215.8"
            stroke="currentColor"
            strokeWidth="0.7"
          />
          <path
            d="M2100.4,42.6C1420.8,-120.3,990.5,690.4,510.2,585.1"
            stroke="currentColor"
            strokeWidth="0.7"
          />
        </g>
      </svg>

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
