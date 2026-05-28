Виправлено runtime падіння `Cannot read properties of undefined (reading 'findMany')` на `prisma.landingContentEntry`.

Причина:
- dev runtime використовував Prisma client без delegate `landingContentEntry` (типово після гарячих змін/кешу процесу).

Що змінено:
1) `lib/landing-content.ts`
- Прибрано залежність від `prisma.landingContentEntry.findMany`.
- Для CMS секцій використано SQL через `lib/db.ts` (`query`) з таблиці `landing_content_entries`.
- Решта даних (vehicles/services/faqs/contact/stats) залишились через Prisma.

2) `app/api/admin/content/route.ts`
- Прибрано `prisma.landingContentEntry.findMany/upsert`.
- Реалізовано `GET`/`PUT` через SQL (`SELECT`, `INSERT ... ON CONFLICT DO UPDATE`).
- Збережено `revalidateTag("landing-content", "max")`.

Валідація:
- lint: OK
- tsc: OK
- smoke:
  - `GET /api/content/landing` => 200
  - `POST /api/admin/login` => 200
  - `GET /api/admin/content` => 200

Результат:
- runtime помилка усунена без обов'язкового рестарту dev-сервера.