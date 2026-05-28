Master project context snapshot (consolidated) for mtrucklending on 2026-05-06.

1) Project identity and stack
- Project: mtrucklending
- Path: D:\Project\mtruck\mtrucklending
- Core stack: Next.js 16.2.4, React 19, TypeScript 5.7.3, Tailwind CSS v4, shadcn/ui, Radix UI, Zod, React Hook Form, pg driver
- Styling/theme: dark chrome/navy design tokens in app/globals.css

2) Architecture overview
- App Router structure with landing and admin route
- Landing: app/page.tsx + components/landing/*, locale state in page (en/cs/uk)
- Admin: app/admin/page.tsx + components/admin/*
- API: app/api/admin/login/route.ts
- DB helper: lib/db.ts
- DB entities/types: lib/db-types.ts
- SQL schema and seed: scripts/schema.sql, scripts/seed.sql

3) Critical findings from deep Serena audit
- Auth is mock: app/api/admin/login/route.ts uses DEMO_USERS with plain-text password checks
- Admin auth state is only in-memory on client (no secure persistent session)
- Admin managers use in-memory demo arrays (vehicles/services/faqs/settings), no backend CRUD wiring
- Runtime does not currently consume lib/db.ts for actual content CRUD
- i18n inconsistency: app/page supports en/cs/uk, lib/locale-context.tsx only en/cs and appears mostly unused in main flow
- Build safety risk: next.config.mjs has typescript.ignoreBuildErrors=true

4) Readiness assessment
- UI shell quality is high and coherent
- Backend/domain model exists in SQL, but integration layer is missing
- Current maturity: high-fidelity prototype, not yet production CMS

5) Priority implementation sequence
1. Replace demo login with DB-backed auth + hashed password validation + secure session cookie
2. Add protected admin API CRUD routes (vehicles/services/faqs/settings)
3. Connect admin managers to APIs (load/mutate/refresh flow)
4. Unify i18n strategy for en/cs/uk
5. Re-enable TypeScript build strictness for CI confidence

6) Cursor folder adaptation completed
- Removed stale references to old project names/paths in .cursor docs/rules/commands
- Serena activation references now point to D:\Project\mtruck\mtrucklending
- Added docs/backlog/ideas.md and aligned backlog rule reference
- Updated command docs for docs/ui-add/uk-layout/trello context under this repo

7) Database connection context (user-provided)
DATABASE_URL="postgresql://Makmiller:Rty45678%2B@91.239.232.91:6432/NextERP?schema=public&pgbouncer=true&connect_timeout=10"
DIRECT_URL="postgresql://Makmiller:Rty45678%2B@91.239.232.91:5432/NextERP?schema=public&connect_timeout=10"
Notes:
- DATABASE_URL via PgBouncer :6432
- DIRECT_URL direct Postgres :5432
- Keep values only in env, not git-tracked files

8) Existing related memories
- infra/database/postgres-connection
- project/current-state-2026-05-06
- audit/project-deep-study-2026-05-06

This master memory is intended as the single-entry summary for future tasks.