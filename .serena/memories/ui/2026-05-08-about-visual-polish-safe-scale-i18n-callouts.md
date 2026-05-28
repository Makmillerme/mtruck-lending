Implemented About visual polish plan.

Files changed:
- components/landing/about.tsx
- app/globals.css

Key updates:
1) Safe image scaling/centering:
- Replaced oversized scale wrapper with safe container: `absolute inset-0 grid place-items-center p-2 sm:p-3` and inner `h-[95%] w-[95%] max-h/full max-w/full`.
- Kept `object-contain object-center` and reduced transform to `scale(1.04)` to make truck visually larger while avoiding contour overflow.

2) Callout layout architecture:
- Added typed `CalloutLayout` and centralized `calloutLayout` array with 3 positional presets (top-left, mid-right, bottom-left).
- Render callouts via mapping: `calloutLayout.map(... t.imageCallouts[index])`.

3) Business-style floating chips:
- Tuned animation to subtle movement: amplitude 2px, duration 7.2s, staggered delays.
- Refined frame style: thinner border, softer gradient background, reduced blur/shadow.
- Typography made less neon and more readable: lower chroma color, `text-transform:none`, tighter letter spacing.
- Added `overflow-wrap:anywhere` + balanced wrapping for multilingual strings.

Validation:
- `npx tsc --noEmit` passes.
- ReadLints for touched files reports no issues.