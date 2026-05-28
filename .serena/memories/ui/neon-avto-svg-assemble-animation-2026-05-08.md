## Neon car SVG assemble animation

- **Asset:** `public/images/neon_avto_animated.svg` — generated from repo root `neon_avto.svg` via `.cursor/scripts/build-neon-animated-svg.mjs`.
- **Effect:** (~6s) chaotic jittering neon `<line>`s → fade out → stroke-dash draw on duplicate of main silhouette (`#neon-car-outline`, `pathLength="100"`) → outline fades → filled SVG fades in with slight blur.
- **Accessibility:** `@media (prefers-reduced-motion: reduce)` skips animations; shows static fill only.
- **Landing:** `components/landing/about.tsx` uses `<img src="/images/neon_avto_animated.svg">` (replaced `next/image` PNG) so in-SVG CSS animations play reliably.
- **Regenerate:** `node .cursor/scripts/build-neon-animated-svg.mjs` (chaos line positions random each run).
