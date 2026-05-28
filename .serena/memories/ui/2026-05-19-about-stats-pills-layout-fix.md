## About visual fix + unified pipeline pills

**User feedback:** Stats strip flex-grow created huge empty panel; truck must stay square; About callouts must match Services pipeline pills.

**Fixes:**
1. `.landing-pipeline-pill` shared with `.services-pipeline-step` (cyan dot pill, uppercase) — used on About callouts and Services header.
2. About callouts simplified: `AboutFloatingCallout` renders `<span class="landing-pipeline-pill">`.
3. Truck: `aspect-square w-full` restored on `.about-truck-stage`.
4. Stats strip: `flex: 0 0 auto` (compact), `margin-top: auto` on lg to pin bottom of shell without stretching height.
5. Removed stats `flex: 1` / `justify-content: center` hack.

**Files:** `app/globals.css`, `components/landing/about.tsx`, `services.tsx`