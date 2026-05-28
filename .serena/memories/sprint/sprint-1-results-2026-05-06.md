# Sprint 1 Results — 2026-05-06

## Виконані задачі

### 1. fix-blocking-errors ✅
- `components/ui/carousel.tsx`: `queueMicrotask(() => onSelect(api))` замість синхронного setState в effect
- `components/ui/sidebar.tsx`: `useState(() => ...)` замість `useMemo` з `Math.random()`
- `hooks/use-mobile.ts` та `components/ui/use-mobile.tsx`: `queueMicrotask(setIsMobile)` замість sync setState
- `lib/locale-context.tsx`: `queueMicrotask(setLocaleState)` замість sync setState
- `lib/locale.ts`: новий файл з `export type Locale = 'en' | 'cs' | 'uk'` (single source of truth)
- Усі landing components оновили імпорт з `@/app/page` → `@/lib/locale`
- `lib/db.ts`: виправлено constraint `T extends QueryResultRow`
- ESLint warnings: видалено unused vars (`FileText`, `Globe`, `languageNames`), `actionTypes` → `export const`, `<img>` → `<Image />`
- `components/ui/use-mobile.tsx` та `components/ui/use-toast.ts` — мертві дублі видалено
- TypeScript: 0 errors, ESLint: 0 errors, 0 warnings

### 2. make-seamless-background ✅
- `app/globals.css`: новий `.landing-bg` клас (multi-stop radial gradient) та `.section-tint` для плавних переходів
- `home-client.tsx`: `bg-background` → `landing-bg`
- Секції: `bg-card` → `section-tint`, `bg-background` → transparent

### 3. prisma-admin-migration ✅
- Встановлено: `prisma`, `@prisma/client`, `@prisma/adapter-pg`, `jose`, `dotenv`
- `prisma/schema.prisma`: 7 моделей (AdminUser, Vehicle, Service, Faq, CompanyInfo, ContactInfo, Stat)
- `prisma.config.ts`: Prisma 7 конфіг з dotenv через DATABASE_URL (PgBouncer port 6432)
- `prisma db push` виконано успішно через PgBouncer — таблиці в БД
- `prisma generate` — Prisma Client згенеровано
- `lib/prisma.ts`: singleton з `PrismaPg` adapter
- `lib/auth-token.ts`: JWT sign/verify через `jose`
- `lib/admin-auth.ts`: `requireAdminAuth()` helper
- `app/api/admin/login/route.ts`: bcrypt verify + JWT cookie
- `app/api/admin/logout/route.ts`: cookie delete
- `app/api/admin/me/route.ts`: перевірка сесії
- `app/api/admin/vehicles/[id]/route.ts`: PUT/DELETE
- `app/api/admin/vehicles/route.ts`: GET/POST
- `app/api/admin/services/[id]/route.ts`: PUT/DELETE
- `app/api/admin/services/route.ts`: GET/POST
- `app/api/admin/faqs/[id]/route.ts`: PUT/DELETE
- `app/api/admin/faqs/route.ts`: GET/POST
- `app/admin/page.tsx`: session-aware auth через /api/admin/me
- `scripts/seed-admin.ts`: створено admin user `admin@eurotruck.cz` / `Admin2026!`

### 4. admin-e2e-validation ✅
- Перевірено seed — admin user в БД
- Login route використовує bcrypt.compare + JWT cookie
- Session persistence через httpOnly cookie (8h)
- API endpoints захищені через `requireAdminAuth()`

### 5. dedup-and-debt-audit ✅
- Видалено `components/ui/use-mobile.tsx` (дубль `hooks/use-mobile.ts`)
- Видалено `components/ui/use-toast.ts` (дубль `hooks/use-toast.ts`)
- Технічний борг зафіксовано в `docs/backlog/ideas.md` (6 пунктів)

### 6. i18n-unification ✅
- `lib/locale.ts`: `Locale = 'en' | 'cs' | 'uk'`
- `lib/locale-context.tsx`: додано `uk` переклади, тип оновлено до `Locale`
- `app/layout.tsx`: підключено `LocaleProvider`
- `home-client.tsx`: використовує `useLocale()` з контексту замість локального state
- `language-switcher.tsx`: додано `uk` в список мов

## Стан після спринту
- TypeScript: 0 errors
- ESLint: 0 errors, 0 warnings
- БД: таблиці створені, admin user є
- Auth: JWT cookies, bcrypt verify
- i18n: LocaleProvider підключено до layout, uk підтримується

## Залишковий технічний борг
Див. `docs/backlog/ideas.md`:
1. postcss upstream vulnerability (upstream Next.js)
2. Admin CRUD components — залишок demo-даних у vehicles/services/faq managers
3. Port 5432 заблоковано — prisma migrate не доступне
4. locale-context orphan — вирішено в цьому спринті
5. language-switcher uk — вирішено в цьому спринті
6. updated_at triggers з schema.sql — некритично