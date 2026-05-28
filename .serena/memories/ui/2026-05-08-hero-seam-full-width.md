Updated seam accent line width to full viewport width.
- In `app/globals.css`, changed `.section-seam-accent::before, ::after` shared width from `min(72%, 980px)` to `100%`.
- Result: the animated strip under hero now spans full width instead of centered limited width.
- Validation: `npx tsc --noEmit` passes.