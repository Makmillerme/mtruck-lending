Implemented cache-first tab behavior for AdminDashboard to stop repeated loading on tab switches.

File: components/admin/admin-dashboard.tsx

Changes:
- Added `loadedTabs` state initialized with `["dashboard"]`.
- Added effect that appends newly opened tab to `loadedTabs`.
- Replaced single `mainContent` switch render with keep-alive panel rendering:
  - Each tab component is mounted once when first opened.
  - Inactive tabs are hidden via `className` (`block`/`hidden`) instead of unmounted.
- Result: returning to a previously opened tab no longer remounts manager component or re-triggers its initial load effect (cache-first UX in admin).

Validation:
- Lint diagnostics for updated file: none.