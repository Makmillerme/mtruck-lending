Reduced log/request spam in dev environment.

1) Landing polling throttled/disabled in dev
- File: components/landing/home-client.tsx
- Previous behavior: `/api/landing` polling every 5s in all environments.
- New behavior:
  - Polling is disabled in development (`NODE_ENV !== production`).
  - In production, polling interval increased to 30s.
  - Added visibility guard (`document.visibilityState === 'visible'`) to skip background tab polling.

2) DB query console logging made opt-in
- File: lib/db.ts
- Previous behavior: every query logged to console always.
- New behavior: query logs are printed only when `DB_QUERY_LOG=true`.

Result:
- Eliminates massive request/console spam during local development while preserving optional diagnostics.