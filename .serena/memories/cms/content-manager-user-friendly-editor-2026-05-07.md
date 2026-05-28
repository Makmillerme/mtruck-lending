Перероблено `components/admin/content-manager.tsx` з JSON-редактора у практичний візуальний редактор для звичайних користувачів.

Що змінилось:
- Прибрано ручне редагування JSON у textarea.
- Додано form-based редактор:
  - string -> Input/Textarea
  - number -> numeric Input
  - boolean -> Switch
  - object -> група полів
  - array -> список елементів із кнопками Add/Remove
- Додано шаблони секцій (`sectionTemplates`) для швидкого старту структури.
- Додано `Reset to template`.
- Додано стани `loading/saving/saved/error`.
- Збереження працює через існуючий `PUT /api/admin/content` (upsert).

Результат:
- Користувач може нормально створювати елементи в масивах, редагувати контент без JSON.
- lint/typecheck: OK.