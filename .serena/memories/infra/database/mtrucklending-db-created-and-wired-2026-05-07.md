Створено ізольовану БД для проєкту `mtrucklending` через MCP `user-postgres-ops`.

Що зроблено:
1) `create_database`:
- db_name: `mtrucklending`
- db_user: `mtrucklending`
- password: `Rty45678+`
- Автоматично додано mapping в PgBouncer + userlist, виконано reload.

2) Перевірка:
- `list_databases`: `mtrucklending` існує (owner `mtrucklending`)
- `list_roles`: роль `mtrucklending` існує (login=true, non-superuser)

3) Оновлено проєктний `.env`:
- DATABASE_URL -> postgresql://mtrucklending:Rty45678%2B@91.239.232.91:6432/mtrucklending?schema=public&pgbouncer=true&connect_timeout=10
- DIRECT_URL -> postgresql://mtrucklending:Rty45678%2B@91.239.232.91:5432/mtrucklending?schema=public&connect_timeout=10

4) Ініціалізовано схему Prisma:
- `npx prisma db push`
- `npx prisma generate`

5) Верифікація таблиць у новій БД (`run_sql`, db_name=`mtrucklending`):
- admin_users
- company_info
- contact_info
- faqs
- services
- stats
- vehicles

Результат: лендінг підключений до окремої БД `mtrucklending`.