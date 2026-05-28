Implemented full remediation pass for plan: frontend+backend+db+security+perf.

P0 security:
- lib/auth-token.ts: removed fallback JWT secret; hard fail if AUTH_SECRET missing/short.
- app/api/admin/login/route.ts: added zod payload validation + IP/identity rate limiting (lib/rate-limit.ts) + Retry-After header.
- components/admin/admin-login.tsx: removed visible test credentials from login screen.

P1 API validation/errors/id guards:
- Added shared helpers: lib/admin-api.ts (parseIdParam, standardized unauthorized/400/500 handling).
- Added shared schemas: lib/admin-validation.ts for vehicles/services/faqs/testimonials/content/settings + builder payloads.
- Refactored admin CRUD routes to use safeParse + whitelisted data + parseId + standardized error handling:
  - app/api/admin/{vehicles,services,faqs,testimonials}/route.ts
  - app/api/admin/{vehicles,services,faqs,testimonials}/[id]/route.ts
  - app/api/admin/settings/route.ts
  - app/api/admin/content/route.ts
  - app/api/admin/builder/{pages,sections,blocks,elements,content}/route.ts
  - app/api/admin/builder/{pages,sections,blocks,elements}/[id]/route.ts

P1 DB/Prisma consistency:
- prisma/schema.prisma: added SitePage/SiteSection/SiteBlock/SiteElement/SiteContentEntry models and Vehicle uk fields (nameUk/descriptionUk/tagUk).
- app/api/admin/content/route.ts: wrapped batch upserts in BEGIN/COMMIT/ROLLBACK transaction.
- Added SQL alignment script: scripts/sql/align_builder_and_vehicle_uk.sql.
- Regenerated Prisma client.

P2 frontend a11y/i18n:
- components/landing/vehicle-modal.tsx: replaced custom overlay modal with Shadcn Dialog for focus trap, Esc close, body lock behavior.
- lib/locale-context.tsx: sync document.documentElement.lang with active locale.
- components/admin/admin-dashboard.tsx: switched container heights to dvh strategy and locale-aware date formatting.
- Extended vehicle UK content wiring:
  - lib/landing-content.ts + components/landing/catalog.tsx + components/landing/home-client.tsx
  - components/admin/vehicles-manager.tsx adds nameUk/descriptionUk/tagUk inputs and payload mapping.
- lib/db-types.ts updated for vehicle uk fields.

P2 performance/stability:
- app/admin/page.tsx: AbortController for /api/admin/me bootstrap fetch.
- components/admin/admin-dashboard.tsx: AbortController for analytics fetch.
- components/landing/home-client.tsx: replaced fixed interval polling with adaptive timeout scheduler + backoff + visibility-triggered refresh.

P3 cleanup/tests:
- app/api/content/landing/route.ts now 308 redirects to canonical /api/landing.
- app/api/landing/route.ts no longer leaks internal error message.
- Removed unused components/landing/language-switcher.tsx.
- scripts/seed-landing-content.ts updated to SQL upsert into landing_content_entries (no stale Prisma delegate).

Validation:
- npx tsc --noEmit passes.
- npm run lint passes with existing non-blocking warnings about ui.loadError deps in admin managers (pre-existing design tradeoff to avoid refetch flicker on locale changes).