Користувач запитав про ізоляцію БД.
Перевірено `prisma/schema.prisma`, `prisma.config.ts`, пам'ять `infra/database/postgres-connection`.
Поточний стан: проєкт використовує БД `NextERP`, `schema=public` через `DATABASE_URL` (PgBouncer 6432).
Окрема фізична БД або окрема schema для mtrucklending не створювалась.
Ризик: інші додатки в тій самій БД + public schema можуть мати конфлікти імен таблиць/міграцій.
Рекомендація для ізоляції: створити окрему schema (напр. `mtruck_lending`) або окрему БД, перевести `DATABASE_URL`/`DIRECT_URL` на нову schema, виконати prisma migrate/db push тільки в неї.