Repo cleanup 2026-05-27: static landing only.

Removed:
- scripts/ (all DB seeds/migrations)
- prisma/ + prisma.config.ts
- hooks/, styles/, tmp/
- lib/landing-content.ts shim
- components/theme-provider.tsx
- 49 unused shadcn UI components (kept: accordion, button, dialog, dropdown-menu, input, textarea)
- root orphans: neon_avto.png, vantashivka.png, pnpm-lock.yaml
- parseVehicleModalContent dead code

npm deps trimmed from ~70 to ~15 runtime packages (removed prisma, pg, bcryptjs, gsap, recharts, react-hook-form, etc.)

Live routes: /, /api/contact-request
Data: lib/landing-data.ts (static EN/UK)