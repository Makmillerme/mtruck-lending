## About neon truck final SVG transition polish

User feedback: particle motion is good, but the transform into final SVG looked weak and dim.

### Changes in `components/landing/neon-avto-assemble.tsx`
- Added `FINAL_BLEND_OVERLAP_MS = 260` so the canvas continues briefly while SVG fades in.
- Added `finishTimerRef` to stop the animation after a short overlap instead of ending immediately at reveal start.
- Canvas fade-out changed from a simple 700ms fade to a softer `duration-[920ms]` with a small `delay-75`.
- Final SVG styling upgraded:
  - added `mix-blend-screen`
  - boosted `brightness` / `saturate`
  - stronger cyan/teal drop shadows aligned closer to particle color
  - kept a stronger glow while `glowActive`, then a still-bright resting state afterward

### Effect
- Final morph reads more like a continuous transformation instead of a hard swap.
- SVG stays closer in perceived color/energy to the particle lines and no longer looks as dim.

### Validation
- `npx tsc --noEmit` passed.
- Cursor lints passed for the changed file.