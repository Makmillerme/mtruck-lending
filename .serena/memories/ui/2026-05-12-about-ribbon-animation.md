## About Ribbon Animation (2026-05-12)

### Changes made

**components/landing/neon-avto-assemble.tsx** — full rewrite:
- Replaced single TOUR_WAYPOINTS model with 3 RIBBON_LANES (quadratic Bezier curves).
- Lane 0: diagonal top-left to center-right.
- Lane 1: enters from right, curves center-low.
- Lane 2: bottom arc, left to right.
- Each particle gets laneId, laneOffset (perpendicular spread), lanePhase (drift timing), laneT (staggered start along lane).
- TOUR_TOTAL_FRAMES=240 (~4 s at 60 fps).
- BLEND_START_FRAME=160: from frame 160 onward, positions smoothly interpolate lane->targetX/Y using smoothstep.
- After tour, state transitions to running (spring convergence) then assembled/done.
- play prop still controls when animation starts.

**components/landing/about.tsx** — IntersectionObserver threshold updated:
- Threshold changed from 0.62 to 0.45 (fires when 45% of section is visible).
- Added 800 ms fallback timer for short/mobile viewports where 45% threshold may never fire.

### Validation
- tsc --noEmit: 0 errors.
- eslint: 0 errors on changed files.