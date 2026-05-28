Implemented user-requested visual behavior updates:

1) Scrollbar without right-side gutter effect
- In `app/globals.css`, switched to overlay-style vertical scrolling intent:
  - `html { overflow-y: overlay; }` with `@supports not (overflow-y: overlay)` fallback to `auto`.
- Hid visible native scrollbars to avoid right-side reserved stripe:
  - global `scrollbar-width: none;`
  - `::-webkit-scrollbar { width: 0; height: 0; background: transparent; }`

2) Hero section should end at image bottom edge
- In `components/landing/hero.tsx`, removed `section-y-balanced` from Hero section class so no extra external bottom section padding is applied.
- Hero now ends at the bottom boundary of its image container.

Validation:
- `npx tsc --noEmit` passes.