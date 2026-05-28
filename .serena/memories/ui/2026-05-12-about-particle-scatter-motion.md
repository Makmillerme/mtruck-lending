## About neon truck particle motion refresh

Reworked `components/landing/neon-avto-assemble.tsx` after feedback that ribbon lanes looked cheap and too geometric.

### What changed
- Removed ribbon lane / grouped stream motion entirely.
- Each particle now has its own:
  - `startX`, `startY`
  - `flightDelay`
  - `arcHeight`
  - `driftAmp`, `driftFreq`, `driftPhase`
  - `spinOffset`
- Particles are seeded around a soft ellipse outside the truck area instead of along square/ribbon paths.
- Touring phase now interpolates each particle independently toward its target with:
  - unique staggered delay
  - curved arc offset perpendicular to travel direction
  - decaying drift and slip noise
  - smooth angle blend into final outline orientation
- Preserved existing final converge -> assembled -> glow reveal flow.
- `components/landing/about.tsx` left unchanged in this pass; trigger logic remains the same.

### Validation
- `npx tsc --noEmit` passed.
- Cursor lints on changed files passed.