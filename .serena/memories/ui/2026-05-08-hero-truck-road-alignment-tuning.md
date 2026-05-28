Refined hero truck overlay scale and road alignment in `components/landing/hero.tsx`.

Adjustments:
- Moved truck closer to road surface:
  - outer layer bottom from `4.5%` to `1.2%`.
- Reduced visual size to better fit perspective:
  - height from `clamp(130px,24vw,280px)` to `clamp(115px,20vw,250px)`.
  - width from `clamp(230px,44vw,560px)` to `clamp(220px,40vw,520px)`.
- Fine-positioned slightly more to the right (`mr-[2.5%]`) to align with lane direction.
- Set `object-bottom` and softer shadow to make truck contact with road more natural.

Validation:
- `npx tsc --noEmit` passes.