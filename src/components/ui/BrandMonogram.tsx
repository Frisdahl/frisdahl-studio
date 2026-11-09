// Header logo: "Frisdahl" with "Studio" on the line below, both left-aligned.
// Not aria-hidden: the link around it is named "Frisdahl Studio", and an accessible name
// has to contain the text that is visible (WCAG 2.5.3, Label in Name).
export function BrandMonogram() {
  return (
    <span className="brand-monogram">
      <span>Frisdahl</span>
      {/* A space between the words for the accessible name; a flex container does not render it. */}
      {' '}
      <span className="brand-monogram-low">Studio</span>
    </span>
  )
}
