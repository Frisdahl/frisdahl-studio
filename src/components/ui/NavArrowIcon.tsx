export function NavArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="11"
      viewBox="0 0 14 11"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="m9.84 1.08 3.977 3.978a.625.625 0 0 1 0 .884L9.839 9.919a.625.625 0 0 1-.883-.884l2.91-2.91H1.375a.625.625 0 0 1 0-1.25h10.491l-2.91-2.91a.625.625 0 1 1 .883-.884"
      />
    </svg>
  )
}
