На запит UX зроблено чітке розбиття контент-налаштувань на таби елементів у межах секції.

Зміни:
1) `components/admin/content-manager.tsx`
- Залишено таби верхнього рівня по секціях (`header`, `hero`, ...).
- Додано 2-й рівень табів по елементах поточної секції (перший рівень ключів об'єкта):
  - приклад для header: `logo`, `navigation`, `languageSwitcher`, `cta`.
- Рендериться лише активний елемент табу (чистіше й зрозуміліше).
- Технічні поля лишаються shared між мовами (одне поле), контентні — 3 колонки EN/CS/UK.

2) `components/landing/header.tsx`
- Підтримано нову структуру CMS для header:
  - `logo` (src/alt/width/height)
  - `navigation`
  - `languageSwitcher.enabled`
  - `cta.text` + `cta.targetId`
- Збережена backward compatibility (`ctaText` fallback).

Перевірка:
- lint: OK
- tsc: OK