// Header logo: "F" with a lower "S". Purely visual; the link around it carries
// the accessible name.
export function BrandMonogram() {
  return (
    <span className="brand-monogram" aria-hidden="true">
      <span>F</span>
      <span className="brand-monogram-low">S</span>
    </span>
  )
}
