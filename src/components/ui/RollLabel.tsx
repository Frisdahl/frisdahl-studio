/**
 * A link's label in a one-line mask over two stacked copies: when the link is
 * hovered or focused, the track lifts a full line so the copy below slides up
 * into place, and it plays backwards on the way out (a CSS transition, see
 * .roll-label in index.css). Put it directly inside the <a> or <button>.
 */
export function RollLabel({ children }: { children: string }) {
  return (
    <span className="roll-label">
      <span className="roll-label-track">
        <span>{children}</span>
        <span className="roll-label-next" aria-hidden="true">
          {children}
        </span>
      </span>
    </span>
  )
}
