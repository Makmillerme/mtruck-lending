Implemented two requested fixes/features.

1) Fixed runtime crash in catalog
- File: components/landing/catalog.tsx
- Root cause: `activeCategory` was referenced in `featuredVehicles` useMemo dependency before state initialization.
- Fix: introduced explicit `CategoryKey` type and moved `activeCategory` state initialization to top of component before useMemo usage.

2) Added admin CRUD for WhyUs advantages (add/remove/edit like FAQ)
- New file: components/admin/advantages-manager.tsx
  - Loads section `why-us` content from `/api/admin/content`.
  - Extracts and validates `reasons` array for active locale.
  - Supports create/edit/delete with Dialog + AlertDialog confirmation.
  - Saves locale-specific `why-us` content back via `/api/admin/content` PUT.
- File: components/admin/admin-dashboard.tsx
  - Added new tab `advantages` with icon `CheckCircle2`.
  - Added lazy-loaded `AdvantagesManager` panel and keep-alive integration.
- File: lib/admin-locale.ts
  - Added localized nav labels for `advantages` in EN/CS/UK.

3) Wired landing WhyUs section to DB-managed reasons
- File: components/landing/why-us.tsx
  - Added `metaContent` prop and parser for `reasons` from landing content.
  - Falls back to default hardcoded reasons if DB reasons missing/invalid.
- File: components/landing/home-client.tsx
  - Extended content type with `why-us`.
  - Passed `initialData.content["why-us"][locale]` into `WhyUs` as metaContent.

Validation
- ReadLints on all changed files returned no diagnostics.