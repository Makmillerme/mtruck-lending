Integrated separate truck asset into Hero scene as a foreground layer on the road.

Changes made:
- Copied user-provided truck image to `public/images/hero-truck.png`.
- Updated `components/landing/hero.tsx` by adding an absolute foreground truck layer positioned near the bottom road line:
  - Container: `absolute inset-x-0 bottom-[2.5%] z-[2] hidden lg:block`
  - Responsive size/position with `clamp(...)` and slight right shift (`translate-x-[12%]`) to align with road perspective.
  - Rendered with `next/image` fill + `object-contain object-right` and shadow for integration.
- Kept content block at higher z-index (`z-10`) so text remains readable and above truck.

Validation:
- `npx tsc --noEmit` passes.

Note:
- Truck layer currently enabled on `lg+` screens to avoid mobile crowding; can be enabled/tuned for smaller breakpoints if needed.