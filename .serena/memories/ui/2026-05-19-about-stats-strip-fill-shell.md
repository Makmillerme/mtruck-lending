## About visual shell — stats strip fills bottom

**Request:** Stats bar under truck should occupy remaining height in `about-visual-shell` with valid bottom padding (align with right column via grid stretch).

**Implementation:**
- `about-visual-shell`: `display:flex; flex-direction:column; height:100%`
- `about-visual-body`: inner flex column with `flex:1`, `gap:0.75rem`
- `about-truck-stage`: `flex:0 0 auto; aspect-ratio:1` (square truck on desktop)
- `about-stats-strip`: `flex:1 1 0; min-height:5.25rem; justify-content:center` — grows to fill remainder
- CSS classes: `.about-stats-strip`, `.about-stats-strip-grid` in globals.css
- Mobile (`max-width:1023px`): truck square + stats natural height (no flex grow)

**Files:** `components/landing/about.tsx`, `app/globals.css`