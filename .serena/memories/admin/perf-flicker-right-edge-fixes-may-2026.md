Implemented admin UX/performance fix bundle based on user report.

1) Lazy loading for admin sections
- File: components/admin/admin-dashboard.tsx
- Replaced static manager imports with `next/dynamic` imports for:
  - VehiclesManager
  - ServicesManager
  - FAQManager
  - SettingsManager
  - TestimonialsManager
- Added lightweight `AdminSectionLoading` fallback component.
- Result: section code is split and loaded on demand.

2) Prevent blinking/refetch on locale switch
- Root issue: admin manager loaders had callback/effect dependencies tied to locale-derived UI strings, triggering data reload whenever language changed.
- Files updated:
  - components/admin/vehicles-manager.tsx
  - components/admin/services-manager.tsx
  - components/admin/faq-manager.tsx
  - components/admin/testimonials-manager.tsx
  - components/admin/settings-manager.tsx
- Changed load callback dependency from `[ui.loadError]` to `[]`, so language switch no longer triggers network refetch and loading flicker.

3) Right-edge/gutter bug mitigation
- File: app/globals.css
- Changed global scrollbar gutter from always reserved to conditional:
  - `html { scrollbar-gutter: auto; }`
  - `html:has(body[data-scroll-locked]) { scrollbar-gutter: stable; }`
- This removes persistent right-edge reserve strip in normal admin view while keeping modal-lock layout stability.

Validation
- ReadLints for all edited files: no diagnostics.