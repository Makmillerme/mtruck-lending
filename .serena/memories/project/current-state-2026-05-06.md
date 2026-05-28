Project: mtrucklending (D:\Project\mtruck\mtrucklending). Stack confirmed from package.json: Next.js 16.2.4, React 19, TypeScript 5.7.3, Tailwind CSS v4, Shadcn/Radix UI components in components/ui, react-hook-form + zod, pg driver.

Architecture snapshot:
- app/page.tsx is client-rendered landing page with locale state (en/cs/uk) and section-based smooth scrolling.
- app/admin/page.tsx uses client-side auth state only.
- app/api/admin/login/route.ts still uses DEMO_USERS with plain-text password matching.
- lib/db.ts uses pg Pool via process.env.DATABASE_URL.
- scripts/schema.sql and scripts/seed.sql exist for DB setup.

Credentials/context saved per user:
DATABASE_URL=postgresql://Makmiller:Rty45678%2B@91.239.232.91:6432/NextERP?schema=public&pgbouncer=true&connect_timeout=10
DIRECT_URL=postgresql://Makmiller:Rty45678%2B@91.239.232.91:5432/NextERP?schema=public&connect_timeout=10

Cursor folder adaptation completed for this repo:
- Updated .cursor rules/commands to remove stale nextjs_vmd references and point to mtrucklending path.
- Updated Serena activation snippets to project path D:\Project\mtruck\mtrucklending.
- Updated docs/ui-add/uk-layout/backlog/trello related command references.
- Added docs/backlog/ideas.md as canonical backlog file referenced by rules.

Notes:
- No lint errors introduced in modified files.
- Serena project activated as mtrucklending in this session.