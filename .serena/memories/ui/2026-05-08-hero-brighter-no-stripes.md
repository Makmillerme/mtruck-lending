Adjusted Hero visual tuning in `components/landing/hero.tsx` per user feedback:
- Removed stripe/letterbox artifacts by switching image from `object-contain object-right` to `object-cover object-[70%_center]`.
- Brightened hero overall by reducing darkness of horizontal and vertical overlays.
- Added soft cyan radial light overlay to keep contrast but avoid muddy dark look.
- Verified build integrity with `npx tsc --noEmit` (pass).