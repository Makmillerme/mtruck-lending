## Neon truck SVG — cinematic GSAP assemble

- **Runtime:** `components/landing/neon-avto-assemble.tsx` (client). Fetches `public/images/neon_avto_assemble.svg`, wraps each original `<path>` as `.neon-assemble-piece` (generated).
- **Motion:** GSAP timeline — strong random scatter per piece (`svgOrigin` = bbox center), ~11 overlapping turbulence waves (random targets + stagger), then **sorted by bbox area** → smallest pieces settle first, **largest path (main silhouette) last** (`power4.inOut`, stagger ~52ms).
- **Trigger:** `IntersectionObserver` (threshold ~0.18) plays once; SVG fades in as timeline starts.
- **A11y:** `prefers-reduced-motion: reduce` → static SVG, transforms cleared.
- **Build:** `node .cursor/scripts/build-neon-assemble-svg.mjs` regenerates asset from repo root `neon_avto.svg` (~45 pieces).
- **Dependency:** `gsap`.
- **Limitation:** File is fill-based; **one mega-path** = one moving/chunk; detail layers are separate paths and stagger individually.
