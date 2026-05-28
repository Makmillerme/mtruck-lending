Aligned hero truck to road perspective more accurately in `components/landing/hero.tsx`.

Changes:
- Lowered truck layer to road plane:
  - `bottom-[-0.8%]` with `md:bottom-[-1.2%]`.
- Refined horizontal anchor and perspective fit:
  - `mr-[0.5%] lg:mr-[-0.5%]`.
- Increased truck scale for cinematic road fit:
  - `h-[clamp(185px,32vw,390px)]`
  - `w-[clamp(360px,60vw,780px)]`
- Switched truck source to cleaned asset:
  - `/images/hero-truck-clean.png`.
- Added subtle road contact glow under wheels to visually bind truck to asphalt.
- Slightly increased contrast/saturation and tuned drop-shadow for realistic blending.

Validation:
- `npx tsc --noEmit` passes.