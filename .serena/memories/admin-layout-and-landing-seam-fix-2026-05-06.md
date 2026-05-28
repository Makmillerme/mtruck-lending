Implemented two UI fixes.

1) Admin panel scroll behavior (`components/admin/admin-dashboard.tsx`):
- Root container changed from `min-h-screen` to `h-screen overflow-hidden`.
- Main content area changed to isolated scroll container:
  - `main`: `h-screen overflow-hidden pt-[73px] lg:pl-64 min-w-0`
  - inner wrapper: `h-full overflow-y-auto p-6`
Result: page-level scrolling is blocked for admin shell; only main content scrolls between fixed header and sidebar.

2) Landing Hero -> About seam smoothing (`components/landing/hero.tsx`):
- Reworked decorative blobs to avoid bottom-edge overlap causing visible seam.
- Removed bottom-left blob anchored below hero.
- Added softer left blob in upper area:
  - old: `-bottom-24 -left-24 ... bg-accent/8`
  - new: `top-[12%] -left-20 ... bg-accent/6`
- Kept explicit z-layering (`decorative z-0`, `content z-10`).

Validation:
- ReadLints on edited files reports no lint errors.
- Visual snapshot confirms updated hero decorative distribution and preserved content layering.