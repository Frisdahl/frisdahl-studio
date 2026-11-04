// Header logo: "Frisdahl" with "Studio" on the line below, both left-aligned.
// Purely visual; the link around it carries the accessible name.
export function BrandMonogram() {
  return (
    <span className="brand-monogram" aria-hidden="true">
      <span>Frisdahl</span>
      <span className="brand-monogram-low">Studio</span>
    </span>
  )
}
