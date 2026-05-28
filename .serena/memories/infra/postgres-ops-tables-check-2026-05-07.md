Перевірено через user-postgres-ops за PostgresOps workflow.

Inspect:
- healthcheck_stack: postgres/pgbouncer running/healthy
- SQL connection: OK
- list_databases: знайдено тільки БД `postgres`

Read-only verify:
- run_sql у db `postgres` з information_schema.tables для non-system schemas
- Результат: 0 таблиць

Висновок: у поточному PostgresOps середовищі таблиць немає (принаймні не в user schemas).