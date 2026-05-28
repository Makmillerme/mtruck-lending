Adjusted hero truck overlay to better match user reference composition.

In `components/landing/hero.tsx`:
- Enlarged truck significantly for cinematic scale:
  - height `clamp(170px,30vw,360px)`
  - width `clamp(320px,58vw,760px)`
- Repositioned to align with road perspective and trailer extension:
  - `bottom-[0.3%]`, `mr-[-1%]`
- Added subtle image tuning for integration with bright scene:
  - `brightness-110 contrast-105`
  - refined shadow `drop-shadow-[0_16px_22px_rgba(0,0,0,0.3)]`

Validation:
- `npx tsc --noEmit` passes.