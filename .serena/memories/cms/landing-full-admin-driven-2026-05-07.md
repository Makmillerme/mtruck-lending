Реалізовано перехід лендінга на admin-driven CMS + cache-first hybrid.

Що зроблено:
1) Prisma
- Додано модель `LandingContentEntry` (section, locale, value JSON, unique(section,locale)).
- `prisma db push` + `prisma generate` виконано.

2) Data layer + API
- Додано `lib/landing-content.ts`:
  - агрегує контент секцій + vehicles/services/faqs/contact/stats.
  - `unstable_cache` з `revalidate:60` + tags.
- Додано публічний endpoint: `app/api/content/landing/route.ts`.
- Додано адмін endpoint для CMS-блоків: `app/api/admin/content/route.ts` (GET/PUT upsert).

3) Admin CMS UI
- Додано `components/admin/content-manager.tsx` (секція/локаль/JSON editor, loading/saving/error).
- Підключено новий таб `content` у `components/admin/admin-dashboard.tsx`.
- Додано `nav.content` у `lib/admin-locale.ts`.

4) Landing refactor (remove hardcoded)
- Перепідключено `app/page.tsx` на серверний fetch `getLandingBundleCached()`.
- `components/landing/home-client.tsx` тепер приймає `initialData` і передає в секції.
- Переписані секції на дані з API/БД:
  - header, hero, about, services, catalog, why-us, faq, footer, vehicle-modal.
- Локальні hardcoded `content/navigation/ctaText` прибрані з landing компонентів.

5) Cache invalidation
- У write route-ах admin (`vehicles/services/faqs/settings/content`) додано `revalidateTag("landing-content", "max")`.

6) Loading states
- Додано `app/loading.tsx` skeleton.
- Для адмінських менеджерів залишені/додані loading/saving/error стани.

7) Seed
- Додано `scripts/seed-landing-content.ts` і виконано (24 default entries).

Перевірки:
- ESLint: OK
- TypeScript: OK

Важливо для runtime:
- Поточний `next dev` процес піднятий до змін Prisma-моделі, тому в live runtime може тримати старий prisma client (помилки на `landingContentEntry` у dev до рестарту).
- Потрібен restart dev server, після чого нові API/рендер працюють коректно.