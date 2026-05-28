## About equal columns without squashing

**Problem:** `flex:1` on `.about-truck-stage` stretched/squashed truck to fill shell height.

**Fix:** Truck/bridge/stats keep natural sizes (`flex-shrink:0`, aspect-ratio from width). Wrapped bridge+stats in `.about-visual-lower` with `margin-top:auto` on lg — extra vertical space becomes gap between truck and lower block, not compressed content. Body uses `min-height:min-content`. Grid stretch still equalizes column heights.

**Files:** `app/globals.css`, `components/landing/about.tsx`