## Landing sitewide CSS performance pass (2026-05-19)

**Problem:** Site-wide CSS jank — scroll lag, GPU compositor overload from stacked effects.

**Root causes addressed:**
1. `seamIridescent` infinite animation on every `.section-seam-accent` (::before + ::after per section) — **disabled by default**; static `background-position: 50%`; optional restore via `.landing-bg.landing-motion-enhanced` + `prefers-reduced-motion: no-preference`.
2. `backdrop-filter` on `.landing-glass-card`, `.services-stage`, `.services-pipeline-step` — **removed**; opaque oklch backgrounds instead.
3. `.landing-glass-card:hover` `translateY(-2px)` — **removed** (box-shadow/border only).
4. About callout idle float (`about-float-y`) — **disabled** site-wide.
5. Header `backdrop-blur-xl/lg` — **removed**; more opaque gradients; scroll handler **rAF-throttled** with state dedup in `header.tsx`.
6. Catalog/WhyUs carousel nav buttons — removed `backdrop-blur`.
7. Neon truck SVG — lighter filter (no drop-shadow).
8. `content-visibility: auto` on `.landing-bg > div:nth-child(n+3)` for below-fold sections.
9. `#about` duplicate perf overrides consolidated (kept `about-truck-stage` contain).

**Files:** `app/globals.css`, `components/landing/header.tsx`, `catalog.tsx`, `why-us.tsx`, `neon-avto-assemble.tsx`.

**Note:** Dev mode (`npm run dev`) still heavier than production build.