Added user-provided truck image to hero scene as a separate overlay layer.

Changes:
- Copied `vantashivka.png` into `public/images/hero-truck.png`.
- Updated `components/landing/hero.tsx` with an absolute positioned truck layer near the road:
  - `pointer-events-none absolute inset-x-0 bottom-[4.5%] z-[6]`
  - Responsive truck box: `h-[clamp(130px,24vw,280px)]`, `w-[clamp(230px,44vw,560px)]`
  - Positioned toward right lane: `ml-auto mr-[4%]`
  - `Image` uses `object-contain` with road-like shadow for blend.
- Layer order keeps content text above truck (`text z-10`), truck above base background overlays.

Validation:
- `npx tsc --noEmit` passes.
- Setup now ready for next step: scroll-driven car movement animation.