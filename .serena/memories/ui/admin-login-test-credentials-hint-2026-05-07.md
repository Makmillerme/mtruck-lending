Додано підказку тестового логіну в `components/admin/admin-login.tsx` внизу login-card дрібним шрифтом:
`Test access: admin@eurotruck.cz / Admin2026!`

Також виконано seed у нову БД `mtrucklending` командою:
`npx tsx scripts/seed-admin.ts`
Результат: створено admin-користувача `admin@eurotruck.cz` з паролем `Admin2026!`.

Lint перевірка для `admin-login.tsx` — без помилок.