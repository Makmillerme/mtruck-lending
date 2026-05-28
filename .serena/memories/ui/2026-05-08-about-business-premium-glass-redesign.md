Implemented full redesign of landing About section per approved plan.

Files changed:
- `components/landing/about.tsx`
- `app/globals.css`

What was implemented:
1) Layout/type polish (business premium-glass)
- Reworked About section into cleaner business-oriented two-column composition.
- Improved typography rhythm and spacing for badge/title/body copy.
- Updated feature cards with refined glass-like card treatment and cleaner icon containers.

2) Visual block redesign (no static square feel)
- Replaced old abstract square look with `about-visual-shell` premium glass container.
- Added integrated KPI chips (15+, 500+) as top data chips.
- Added living visual center with orbit rings, pulse nodes, center core icon, and floating trust/network/support badges.

3) CSS system + animations
- Added reusable classes: `about-visual-shell`, `about-visual-glow`, `about-kpi-chip`, `about-orbit*`, `about-pulse-dot*`, `about-center-core`, `about-floating-badge*`.
- Added subtle keyframes: `floatSoft`, `pulseSoft`, `orbitDrift`.
- Added responsive adjustments for tablet/mobile to preserve clarity and prevent overflow.

Validation:
- `npx tsc --noEmit` passed.
- `npm run lint` passed with only pre-existing warnings in admin manager files (no new errors/warnings from changed files).
- `ReadLints` for changed files returned no linter errors.