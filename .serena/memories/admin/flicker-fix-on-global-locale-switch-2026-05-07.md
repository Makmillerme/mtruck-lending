Виправлено миготіння (blink) main при перемиканні глобальної мови в адмінці.

Причина:
- У `vehicles-manager` і `content-manager` функції завантаження даних були залежні від локалізованих `ui.*` рядків.
- Зміна глобальної мови -> змінюється `ui` -> перевизначається callback -> повторний `useEffect` -> `loading=true` + refetch -> візуальний blink.

Фікс:
- `components/admin/vehicles-manager.tsx`: `loadVehicles` зроблено стабільним (`useCallback(..., [])`), error message не зав'язаний на locale.
- `components/admin/content-manager.tsx`: `loadEntries` зроблено стабільним (`useCallback(..., [])`), error message не зав'язаний на locale.

Результат:
- перемикання глобальної мови змінює лише тексти UI без повторного fetch/loading;
- main більше не має постійного blinking через refetch.

Перевірка:
- lint: OK
- tsc: OK