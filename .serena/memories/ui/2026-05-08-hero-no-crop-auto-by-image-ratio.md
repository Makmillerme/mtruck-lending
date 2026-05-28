Updated hero to avoid background cropping and make section height auto-follow image ratio:
- In `components/landing/hero.tsx` changed hero media container from fixed viewport min-height to ratio-based sizing: `relative w-full aspect-[4/3]`.
- Background image changed to scale-only behavior: `object-contain object-center` (no cropping).
- Content layer switched from viewport min-height to `h-full` so it tracks image height exactly.
- Result: hero section height now follows background photo proportion automatically (header remains separate).
- Validation: `npx tsc --noEmit` passes.