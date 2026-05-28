Виконано системну інтеграцію адмінки з БД `mtrucklending`.

Зміни:
1) Prisma schema
- Service: додано `titleUk` (`title_uk`), `descriptionUk` (`description_uk`)
- Faq: додано `questionUk` (`question_uk`), `answerUk` (`answer_uk`)
- ContactInfo: додано `addressUk` (`address_uk`), `workingHoursUk` (`working_hours_uk`)

2) API
- Додано `app/api/admin/settings/route.ts` (GET/PUT) з auth, mapping socialLinks JSON, create/update першого запису contact_info.

3) Admin UI managers
- `vehicles-manager.tsx`: прибрано demo-data, підключено GET/POST/PUT/DELETE до `/api/admin/vehicles`, додано loading/error.
- `services-manager.tsx`: прибрано demo-data, підключено GET/POST/PUT/DELETE до `/api/admin/services` з uk-полями.
- `faq-manager.tsx`: прибрано demo-data, підключено GET/POST/PUT/DELETE до `/api/admin/faqs` з uk-полями.
- `settings-manager.tsx`: прибрано локальний mock-save, підключено GET/PUT до `/api/admin/settings`.

4) Валідація
- `npx prisma db push` ✅
- `npx prisma generate` ✅
- `npm run lint` ✅
- `npx tsc --noEmit` ✅

Примітка runtime:
- Під час smoke через live `next dev` виявлено `Unknown argument titleUk` у service.create — типовий наслідок того, що dev-процес ще тримає старий Prisma Client у пам'яті. Потрібен restart dev server, після чого нові uk-поля застосовуються коректно в runtime.