Updated admin dashboard behavior in components/admin/admin-dashboard.tsx.

Changes:
1) Removed 'Notes' card from DashboardHome.
- Deleted final notes block (`t.dashboard.notes`, `t.dashboard.notesText`) from analytics page.
- Removed unused `ChartBar` icon import.

2) Minimized main area rerender on locale switch.
- Replaced `renderContent()` function with memoized `mainContent` via `useMemo`.
- `mainContent` now depends only on `activeTab`, not locale.
- Result: switching language updates header/sidebar labels without re-rendering/re-mounting current main tab content.

Validation:
- Lint check for components/admin/admin-dashboard.tsx passed with no diagnostics.