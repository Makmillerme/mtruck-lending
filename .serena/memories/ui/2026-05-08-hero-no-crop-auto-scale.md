Updated hero background behavior per user request (no cropping, scale only, adaptive non-full-height):
- In `components/landing/hero.tsx` switched image fit from `object-cover` to `object-contain object-center` to prevent cropping.
- Replaced full-viewport hero height with adaptive bounded height: `h-[clamp(460px,60vw,700px)] max-h-[calc(100dvh-88px)] w-full`.
- Set inner content wrapper to `h-full` so content aligns with the adaptive image section height.
- Result: hero section (excluding header) scales with image proportion intent, but stays below full-height behavior.
- Validation: `npx tsc --noEmit` passed.