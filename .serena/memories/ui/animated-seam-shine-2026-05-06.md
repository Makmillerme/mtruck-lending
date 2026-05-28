Enhanced landing section seam accent with premium animated sheen effect.

File updated:
- app/globals.css

What changed:
- Upgraded `.section-seam-accent::before` from static line to dual-layer gradient:
  1) base subtle gray separator gradient
  2) moving highlight streak gradient (sheen)
- Added animation:
  - `@keyframes seamShine`
  - moves sheen from left to right and back (`alternate`)
  - timing: `4.8s ease-in-out infinite alternate` for smooth, non-harsh motion
- Kept separator non-full-width (`min(72%, 980px)`) and premium-soft opacity.

Quality checks:
- Lints: no new errors.