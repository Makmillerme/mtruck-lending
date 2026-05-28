Deep Serena-based project study completed for mtrucklending.

Scope reviewed:
- Root config: package.json, next.config.mjs, tsconfig.json, components.json, postcss.config.mjs, app/globals.css
- Routing: app/layout.tsx, app/page.tsx, app/admin/layout.tsx, app/admin/page.tsx, app/api/admin/login/route.ts
- Data layer: lib/db.ts, lib/db-types.ts, scripts/schema.sql, scripts/seed.sql
- Feature/UI: components/landing/*, components/admin/*, components/ui/* map, hooks/*, lib/locale-context.tsx
- Existing memories reviewed: project/current-state-2026-05-06, infra/database/postgres-connection

Current architecture summary:
- Next.js App Router single app with landing page and admin panel route.
- Landing and admin are predominantly client-side rendered.
- Admin auth is currently mock (state + demo API user), no persistent session/cookie/JWT.
- DB schema and seed are present for production-like content entities.
- Runtime code does not currently consume lib/db.ts in routes/components.
- Admin managers (vehicles/services/faq/settings) run fully on in-memory demo arrays.

Key technical findings:
1) Security/auth gap:
   - app/api/admin/login/route.ts matches plain-text demo credentials.
   - app/admin/page.tsx stores auth in local React state only.
2) Data integration gap:
   - scripts/schema.sql + seed.sql are mature enough for CMS-like CRUD.
   - components/admin/* managers do not call backend; data resets on refresh.
3) i18n inconsistency:
   - app/page.tsx + landing components support en/cs/uk.
   - lib/locale-context.tsx supports only en/cs and appears unused by current pages.
   - components/landing/language-switcher.tsx depends on locale-context and appears orphaned.
4) Build quality risk:
   - next.config.mjs has typescript.ignoreBuildErrors=true.
5) Minor config/quality observations:
   - tsconfig has allowJs=true with strict=true (acceptable but mixed policy).
   - lib/db.ts logs raw SQL text and timing to console.
   - duplicated utility patterns exist between hooks/* and components/ui/* wrappers (expected from shadcn setup but should stay canonical in hooks/* imports).

Readiness snapshot:
- UI/UX shell is well developed (many shadcn components, coherent dark theme tokens, responsive admin shell).
- Backend/domain model exists in SQL but not wired into routes and admin CRUD yet.
- Project is currently closer to a high-fidelity prototype than production CMS.

Suggested implementation order (high impact first):
1) Replace demo login with DB-backed auth (hashed password verify, secure session cookie).
2) Add protected admin API routes for CRUD over vehicles/services/faqs/settings.
3) Connect admin managers to real API (load + mutate + optimistic state).
4) Unify i18n strategy (either keep local per-component dictionaries for en/cs/uk or move to shared provider including uk).
5) Re-enable TypeScript build errors for CI confidence once auth/data wiring lands.