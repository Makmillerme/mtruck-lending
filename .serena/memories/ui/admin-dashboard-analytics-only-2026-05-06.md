Updated admin dashboard to analytics-only mode (no duplicated sidebar actions).
- components/admin/admin-dashboard.tsx: DashboardHome no longer receives onNavigate and no longer renders action cards/buttons.
- Added analytics view with KPI cards: vehicles/services/faqs/admin accounts.
- Added admin activity and snapshot panels using data from API.
- New secured endpoint app/api/admin/analytics/route.ts returns counts + latest admin login + timestamp (requires admin auth).
- Validation: tsc and eslint pass with no errors/warnings.