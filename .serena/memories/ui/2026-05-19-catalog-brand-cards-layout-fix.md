## Catalog brand cards layout fix (2026-05-19)

Fixed broken merged-card layout: same hero-truck Image fill on flex-1 stretched cards looked like one continuous photo strip.

**Fix:** Removed Image from brand cards; gradient media panel + brand name. Grid (1/2/3 cols) when cards fit; flex carousel with fixed widths when not. Card: flex column, isolation isolate, opaque body background. Overlay hover-only with pointer-events none.