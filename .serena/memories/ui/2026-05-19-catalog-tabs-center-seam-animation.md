## Catalog tabs centered + seam animation restored (2026-05-19)

**globals.css:** `.catalog-category-tab` — `justify-content: center`, `text-align: center`.

**Seam:** Re-enabled `seamIridescent` on `.landing-bg .section-seam-accent::before/::after` (removed opt-in `.landing-motion-enhanced` gate). Still respects `prefers-reduced-motion`.