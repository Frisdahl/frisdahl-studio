interface ArrowIconProps {
  className?: string
  /** Degrees to rotate the right-pointing arrow (e.g. -45 for an up-right arrow). */
  rotate?: number
  width?: number | string
  height?: number | string
}

/**
 * The site's single arrow glyph. Every arrow in the UI is this path, rotated
 * into the direction it needs, so the shape stays consistent everywhere.
 */
export function ArrowIcon({
  className = '',
  rotate,
  width = '1em',
  height = '1em',
}: ArrowIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      fill="currentColor"
      className={className}
      style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M10.685 3.42h3.776l7.862 8.583-7.862 8.583h-3.776l7.083-7.193h-16.1v-2.748H17.8L10.685 3.42Z" />
    </svg>
  )
}
