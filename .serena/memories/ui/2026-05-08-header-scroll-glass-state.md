Implemented dynamic header visual behavior on scroll in `components/landing/header.tsx`.

Changes:
- Added scroll state:
  - `isScrolled` state with `useEffect` + passive window scroll listener.
  - Threshold: `window.scrollY > 12`.
- Header remains pinned at top (`sticky top-0 z-50`) and now transitions between two visual states:
  - At page top: near-solid header (`bg-background/96`, light blur).
  - After scrolling: more transparent glass style (`bg-background/62`, stronger blur, subtle bottom border and shadow).
- Added smooth transition classes: `transition-all duration-300`.

Validation:
- `npx tsc --noEmit` passes.
- `npm run lint` reports only pre-existing admin hook dependency warnings (no new errors).