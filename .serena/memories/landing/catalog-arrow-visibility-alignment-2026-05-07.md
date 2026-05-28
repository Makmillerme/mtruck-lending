Adjusted catalog carousel nav buttons in components/landing/catalog.tsx to match testimonials style and improve visibility.

Changes:
- Buttons now use same class style as testimonials: `landing-btn ... h-10 w-10 rounded-full` with ghost variant.
- Removed half-outside placement (`-left-4` / `-right-4`) that caused clipping/poor visibility.
- Added horizontal wrapper padding when controls are shown (`px-12`) and placed arrows fully inside at `left-1` / `right-1`.

Result: arrows are clearly visible and no longer split across card/container edge.