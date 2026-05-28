Виконано 2 задачі:

1) Landing читає дані з адмінки/БД
- `components/landing/home-client.tsx`: додані props `initialData` + `sectionOrder`, рендер секцій у заданому порядку з `app/page.tsx`.
- Передача даних з landing bundle у секції:
  - `services` ← `initialData.services` + `content['services-meta']`
  - `catalog` ← `initialData.vehicles` + `content['catalog-meta']`
  - `faq` ← `initialData.faqs` + `content['faq-meta']`
  - `footer` ← `initialData.contact` + `initialData.services`
- `components/landing/services.tsx`: прибрано hardcoded services list, тепер рендер із БД (EN/CS/UK fallback).
- `components/landing/catalog.tsx`: featured vehicles та counts з БД, модалка працює по даних БД.
- `components/landing/faq.tsx`: питання/відповіді з БД (EN/CS/UK fallback).
- `components/landing/footer.tsx`: contact/social links з БД, список сервісів з БД.

2) Синхронізація мови адмінки з сайтом + персист
- `components/admin/admin-dashboard.tsx`:
  - мова читається з `localStorage['locale']` (той самий ключ, що на сайті),
  - при зміні мови в адмінці зберігається в `localStorage['locale']`,
  - після reload лишається попередньо обрана мова.

Валідація:
- `npx tsc --noEmit` ✅
- `ReadLints` на змінених файлах ✅
- `npm run lint` має 1 pre-existing помилку в `components/admin/content-manager.tsx` (не пов'язана зі зміненими файлами).