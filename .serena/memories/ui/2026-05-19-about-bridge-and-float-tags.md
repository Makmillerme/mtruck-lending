## About: import chain bridge + floating tags restored

**1) Void above stats (desktop):** Added `.about-visual-bridge` between square truck and stats strip — flex:1 fills gap. Content: localized `bridgeTitle` + `importChain` (4 steps) with vertical timeline (cyan line + dots). Hidden on mobile (max-width 1023px).

**2) Truck tags float:** Restored `about-float-callout-inner` with `about-float-y` animation; phase lags; runs when `#about[data-about-active]` and `.about-float-callout--in-view`. Pills use `.landing-pipeline-pill`.

**Files:** `components/landing/about.tsx`, `app/globals.css`