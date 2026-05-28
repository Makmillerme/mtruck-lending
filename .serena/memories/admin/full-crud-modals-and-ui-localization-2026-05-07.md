Виконано запит на поглиблену доробку адмінки.

Що зроблено:
1) Прибрано залишки hardcoded-створення для керованих сутностей
- `vehicles/services/faq` більше не створюються шаблонними `New ... ${Date.now()}` даними.
- Створення/редагування йде через повну форму в модалці з усіма технічними полями.

2) Модалки створення/редагування (Shadcn Dialog)
- `components/admin/vehicles-manager.tsx`
  - Додано `Dialog` для create/edit.
  - Повний набір полів: name EN/CS, description EN/CS, year, price, currency, category, brand, specs[], images[], featured, tag EN/CS.
  - CSV парсер для specs/images.
- `components/admin/services-manager.tsx`
  - Додано `Dialog` для create/edit.
  - Повні поля: title EN/CS/UK, description EN/CS/UK, icon, orderIndex.
- `components/admin/faq-manager.tsx`
  - Додано `Dialog` для create/edit.
  - Повні поля: question EN/CS/UK, answer EN/CS/UK, orderIndex.

3) Покращено відображення та локалізацію технічного UI
- Для `vehicles/services/faq/settings` локалізовано:
  - заголовки, підзаголовки,
  - лейбли полів,
  - кнопки,
  - повідомлення loading/error,
  - назви дій, confirm-тексти.
- `components/admin/settings-manager.tsx` розширено:
  - локалізовані технічні стани (`loading/saving/saved/errors`) і всі секційні заголовки.

4) Сайт бере дані з адмінки/БД для запитаних сутностей
- Уже підключено раніше й збережено:
  - `services` <- DB,
  - `catalog/vehicles` <- DB,
  - `faq` <- DB,
  - `footer settings` <- DB contact/social.

Перевірки:
- `npx tsc --noEmit` ✅
- `ReadLints` на змінених файлах ✅
- `npm run lint` має 1 pre-existing помилку в `components/admin/content-manager.tsx` (не пов'язана з цими змінами).
- Runtime smoke: POST `/api/admin/services` з `titleUk/descriptionUk` => 201 ✅ (успішно, з rollback delete).