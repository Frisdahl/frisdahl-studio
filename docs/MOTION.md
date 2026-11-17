# Motion language (Frisdahl Studio)

One set of rules for every animation on the site. The values live in `src/lib/motion.ts` (JS) and `--ease-smooth` / `--duration-*` in `src/index.css` (CSS). Refined 2026-11-17. Project facts about the stack are in `ANIMATION_GUIDELINES.md` in the vault; the general method is the `animation-craft` skill.

## Principles

1. **One family of easings.** Arrivals ease out hard (`expo.out` for text lines and images, `power3.out` for content rising), exits ease in (`power3.in`) and are about 60% as long, and large movements across the screen ease in and out (`power3.inOut`, `expo.inOut`). CSS hovers and state changes use `--ease-smooth` (a quint ease-out, `cubic-bezier(0.22, 1, 0.36, 1)`).
2. **Nothing bounces.** No overshoot, no springs (`back`, `elastic`). The site is calm.
3. **The same things arrive the same way.**
   - Text rises line by line out of its own mask (`MaskedLineReveal`, or `RevealText` for scroll reveals): 1 s, `power3.out`, 0.08 s between lines.
   - Images and panels open from their vertical centre (clip-path): 1.2 s, `expo.out`. On load by the page entrance (`lib/pageEntrance.ts`), further down by scrolling in (`hooks/useMediaReveal.ts`).
   - `( LABEL )` headings are one gesture (`LABEL` in `motion.ts`, used by `SectionLabel` and the home statement): the closing bracket glides right (0.8 s) and the text rises while it is still moving (0.6 s, 0.5 s early). About 1.1 s in all, starting when the label's top is 92% down the screen.
4. **Sequence, do not pile up.** Small staggers (0.035 s per letter, 0.08 s per line), a capped total, a second element starting while the first is still settling. The second picture of a pair opens 0.1 s after the first.
5. **Scroll reveals play once** and stay (scrolling back up does not close them). Only what starts below the first screen is hidden; the first screen belongs to the page's entrance. Scrubbed motion (the statement's text) follows the scroll with `SCRUB` smoothing and never ends with dead scrolling.
6. **Reduced motion:** the finished state at once, nothing hidden, nothing split. Hidden states are applied by the same code that reveals them, inside the `no-preference` query.

## Durations

| Role | Value |
|---|---|
| Press / focus feedback | 150 ms (`--duration-fast`) |
| Hover on small things (colour, underline) | 250 ms (`--duration-base`, the default) |
| Larger surfaces (fills, panels) | 400 ms to 500 ms (`--duration-slow`) |
| A line of text rising | 1 s (`DUR.line`) |
| A picture opening | 1.2 s (`DUR.imageOpen`) |
| Content rising after a route change | 0.9 s (`DUR.rise`) |
| Page exit | about 0.6 s, shorter than the entrance |

## Where things are

- Page entrance and exit: `lib/pageEntrance.ts`, `lib/pageExit.ts` (including the swapping heading line's letters, `.wave-char`).
- Card to project page: `lib/sharedCaseTransition.ts`.
- Home: `Hero`, `StudioStatement` (scrubbed), `CasesSection`, `AddedValueSection` (stacked cards and the three marks), `ReviewsSection` (pinned, the footer slides over it), `Footer`.
- Project pages and Mød mig: `RevealText` for text, `useMediaReveal` for pictures and panels, `SectionLabel` for headings.

## Rules for new animation

- Use the tokens; do not write new bare numbers or `power2` / `sine` / `back` for movement.
- Do not animate the same element with two engines.
- If something needs a new easing or duration, add a token with a role and a comment first.
