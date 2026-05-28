Виконано план WhyUs/FAQ/Footer/buttons + testimonials CRUD.

Зроблено:
1) БД
- `prisma/schema.prisma`: додано модель `Testimonial`.
- Через `prisma db push` не пішли (ризик data-loss для site-builder таблиць), тому безпечно створено `public.testimonials` SQL-скриптом:
  - `scripts/sql/create_testimonials.sql`
  - застосовано `prisma db execute --file scripts/sql/create_testimonials.sql`
- `npx prisma generate` виконано.

2) API
- Додано:
  - `app/api/admin/testimonials/route.ts` (GET/POST)
  - `app/api/admin/testimonials/[id]/route.ts` (PUT/DELETE)

3) Адмінка
- Додано новий менеджер:
  - `components/admin/testimonials-manager.tsx`
  - CRUD + модалки create/edit + повні технічні поля + локалізовані UI-лейбли.
- Оновлено sidebar:
  - `components/admin/admin-dashboard.tsx`
  - нова вкладка `testimonials`.
- Оновлено переклади навігації:
  - `lib/admin-locale.ts` (EN/CS/UK: testimonials).

4) Landing WhyUs
- `components/landing/why-us.tsx`:
  - прибрано stats-grid;
  - центрування заголовкового блоку;
  - відгуки розміщено під основним контентом;
  - додано карусель з ручним гортанням (prev/next).

5) Підключення testimonials до landing data flow
- `lib/landing-content.ts`:
  - додано завантаження `prisma.testimonial.findMany({ where: { isActive: true } ... })`;
  - додано `testimonials` у `LandingBundle`;
  - додано cache tag `landing-testimonials`.
- `components/landing/home-client.tsx`:
  - додано тип `testimonials` в `initialData`;
  - прокинуто пропс у `WhyUs`.

6) FAQ підрізання
- `components/landing/faq.tsx`:
  - item: `overflow-visible`;
  - trigger: `min-h-14 leading-relaxed`.

7) Footer cleanup
- `components/landing/footer.tsx`:
  - видалено блок розсилки;
  - видалено блок соціконок бренду;
  - сітка зменшена до `lg:grid-cols-4`.

8) Уніфікація висоти кнопок на landing
- `app/globals.css`: новий клас `.landing-btn { height: 3rem; }`.
- застосовано в `header/hero/catalog/footer` (CTA), та в кнопках каруселі WhyUs/модалки vehicle.

Валідація:
- `ReadLints` по змінених файлах: без помилок.
- `npm run lint`: є pre-existing помилка в `components/admin/content-manager.tsx` (не з цих змін).
- `npx tsc --noEmit`: є pre-existing помилки по `site*` Prisma-моделях в builder-модулях (не з цих змін).
- API smoke (`/api/admin/testimonials`) у running dev дав помилку `prisma.testimonial undefined` до restart dev-процесу (клієнт у пам’яті старий). Потрібен restart `next dev` для підхоплення нового Prisma client у runtime.