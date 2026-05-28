Applied batch fixes from user report.

1) Catalog heading removal
- File: components/landing/catalog.tsx
- Removed section heading `featuredTitle` (`<h3 className="text-xl ...">...`).

2) Advantages manager rerender/flicker mitigation
- File: components/admin/advantages-manager.tsx
- Changed load callback dependency from `[ui.loadError]` to `[]` to prevent refetch/loading flicker when admin locale switches.

3) Immediate data apply without page reload (landing side)
- Added public endpoint: app/api/landing/route.ts returning fresh landing bundle.
- File: components/landing/home-client.tsx
  - Added client-side polling every 5s to fetch `/api/landing` and update local `data` state.
  - Sections now render from live `data` state instead of static initialData only.
- Added/expanded cache revalidation on admin mutations:
  - app/api/admin/vehicles/route.ts and [id]/route.ts -> `landing-vehicles`
  - app/api/admin/services/route.ts and [id]/route.ts -> `landing-services`
  - app/api/admin/faqs/route.ts and [id]/route.ts -> `landing-faqs`
  - app/api/admin/testimonials/route.ts and [id]/route.ts -> `landing-testimonials`
  - app/api/admin/content/route.ts -> revalidate landing-content/services/vehicles/faqs/testimonials/settings tags
  - app/api/admin/settings/route.ts -> revalidate landing-content + landing-settings (removed duplicate landing-content call)

4) Right-side stripe when modal opens
- File: app/globals.css
- Updated modal lock behavior:
  - `html/body` set `overflow-x: clip`
  - removed `:has(...scroll-locked)` stable gutter reserve approach
  - `body[data-scroll-locked]` enforces `margin-right:0`, `padding-right:0`, `overflow:hidden`

5) FAQ expandable item bottom clipping
- File: components/landing/faq.tsx
- Added `overflow-visible` on accordion root.
- Trigger now uses `items-start` for stable multiline alignment.
- Content spacing adjusted to `pb-5 pt-1 leading-relaxed` to avoid bottom clipping perception.

Validation
- ReadLints on all changed files: no diagnostics.