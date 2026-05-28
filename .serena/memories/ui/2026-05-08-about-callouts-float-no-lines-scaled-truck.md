## About image callouts — lines removed, floating labels, scaled truck (2026-05-08)

- **Lines removed:** SVG polylines deleted; no leader/wedge graphics.
- **Floating animation:** `app/globals.css` — `@keyframes about-float-y`, `.about-float-callout`, stagger via `.about-float-callout--lag-1/2`; disabled when `prefers-reduced-motion: reduce`. Label class renamed to `.about-float-callout-label` (`text-wrap: balance`, clamp font-size).
- **Truck scale:** `about.tsx` — image in nested `absolute` wrapper `132%` × `132%`, centered at `top-[52%]`, `object-contain object-center` so the neon truck reads larger without cropping the asset.
- **I18n / overlap:** `AboutFloatingCallout` pins copy top-left, mid-right, bottom-left with `max-w-[min(70%,…)]` mobile and ~38–40% on `sm+`; z-index 10 over `z-0` image layer.

Prior `.about-neon-callout-*` (except replaced block) fully removed from globals.