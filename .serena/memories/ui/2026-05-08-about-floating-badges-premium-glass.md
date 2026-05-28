## About floating badges — premium glass polish (2026-05-08)

- **Structure**: `AboutFloatingBadge` now uses three layers: `about-floating-badge-motion` (animation + `will-change`), `about-floating-badge-frame` (1px gradient stroke + outer cyan glow + depth shadow), `about-floating-badge-panel` (dark glass gradient, blur 20px, saturate 1.22, inset highlights). Diagonal sheen via `::after` on panel.
- **Motion**: `aboutFloatBob` — vertical only `translate3d`, 5px amplitude, staggered durations/delays on a/b/c; reduced motion disables animation and `will-change`.
- **Type**: `.about-floating-badge-text` — clamp font size, 0.12em tracking, layered cyan text-shadow.
- **Chrome**: Image card gets subtle inset cyan hairline + soft outer cyan bloom (`oklch` shadows). Badge container `z-20`; positioning widths bumped for longer UA copy.

Files: `components/landing/about.tsx`, `app/globals.css`.