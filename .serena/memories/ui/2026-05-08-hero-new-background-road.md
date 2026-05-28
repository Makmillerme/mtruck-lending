Integrated new user-provided hero background image:
- Copied provided asset into project public folder as `public/images/hero-road-bg.png`.
- Updated `components/landing/hero.tsx` image source from `/images/hero-orbital-clean.png` to `/images/hero-road-bg.png`.
- Kept existing overlay and layout system unchanged so visual tuning remains consistent.
- Verified with `npx tsc --noEmit` (pass).
- Next planned step (user-requested): integrate separate car asset and scroll-based car movement animation in hero.