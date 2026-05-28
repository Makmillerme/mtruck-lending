Перероблено CMS контент-редактор під запит UX:

1) `components/admin/content-manager.tsx`
- Прибрано локальний перемикач мови EN/CS/UK всередині контент-сторінки.
- Додано трьохколонковий ввід (EN / CS / UK) для кожного поля.
- Секції згруповано як окремі блоки налаштувань (Header, Hero, About, Why Us, Services, Catalog, FAQ, Footer).
- Додано фіксовану сітку кнопок секцій без "стрибків" (однакова висота/падінги/бордери).
- Для масивів реалізовано Add/Remove елементів синхронно для всіх мов.
- Збереження одразу всіх 3 локалей одним запитом (`entries` масив у `/api/admin/content`).
- Додано Reset to template + loading/saving/saved/error.

2) `components/landing/home-client.tsx`
- Сумісність з `sectionOrder` (щоб не ламати існуючий page builder flow у `app/page.tsx`).

3) Валідація
- lint: OK
- tsc: OK

Результат: редактор став візуально чистішим і практичним для non-technical користувачів, без JSON-режиму і без дублюючого мовного перемикача.