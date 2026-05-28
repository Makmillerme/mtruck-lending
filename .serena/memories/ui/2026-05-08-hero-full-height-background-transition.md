Updated `components/landing/hero.tsx` to make hero image feel like full-section background continuation with softer transitions and less cropping.

Changes:
- Hero container height changed from fixed `min-h-[520px]` to responsive `min-h-[clamp(560px,78dvh,860px)]`.
- Background image rendering changed from `object-cover` to `object-contain object-right` to avoid aggressive image crop.
- Added second vertical gradient overlay on top of image for smooth fade into lower section background.
- Kept horizontal cinematic gradient but tuned opacity stops for smoother blending with text area.
- Synced inner content wrapper min-height with section min-height for consistent vertical composition.

Validation:
- `npx tsc --noEmit` passes.