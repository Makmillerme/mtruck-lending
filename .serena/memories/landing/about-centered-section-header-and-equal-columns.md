Adjusted About section layout in components/landing/about.tsx after user clarification.

Changes:
- Moved About header block (`badge + title`) out of left column into a standalone centered section header:
  - wrapper: `mx-auto max-w-3xl text-center section-head-balanced space-y-4`
  - now centered relative to whole section (same pattern as other sections).
- Kept main content in a 2-column grid below header.
- Enforced equal column geometry:
  - left column: `h-full min-h-[560px] lg:min-h-[640px] flex flex-col justify-between`
  - right visual already has same min-height values.
- Preserved left text/right visual ordering on desktop (`lg:order-1`, `lg:order-2`).

Validation:
- Lint for components/landing/about.tsx passed.