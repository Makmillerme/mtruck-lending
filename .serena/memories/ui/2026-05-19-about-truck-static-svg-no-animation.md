# About truck visual — static SVG only (2026-05-19)

User request: remove particle/canvas animation entirely; show only the import SVG (performance + visual preference).

## Changes
- `components/landing/neon-avto-assemble.tsx`: simplified to static `<img src="/images/neon_avto_assemble.svg">` with neon filter; no canvas, no worker, no rAF. `play` gates opacity fade-in.
- `components/landing/about.tsx`: callouts reveal together with `visualReady` (no morphComplete wait); removed `handleMorphComplete`.
- Deleted `public/neon-avto-worker.js` (unused).

## Previous worker approach superseded for About block — kept in memory `ui/2026-05-19-neon-avto-offscreen-worker` for reference only.