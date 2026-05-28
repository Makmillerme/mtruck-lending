Adjusted hero/header junction to remove visual strip and top gap.

Changes:
- `components/landing/hero.tsx`:
  - Removed top padding from hero section (`pt-28 md:pt-32` -> none).
  - Set hero image container height to viewport minus header: `min-h-[calc(100dvh-72px)]`.
  - Synced content wrapper to same height: `min-h-[calc(100dvh-72px)]`.
  - Result: hero section height now corresponds to photo area excluding header.
- `components/landing/header.tsx`:
  - Removed bottom border from fixed header to eliminate 1px stripe between header and hero image.

Validation:
- `npx tsc --noEmit` passes.