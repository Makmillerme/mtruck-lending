Implemented 3-language admin UI switcher and manual multilingual content handling.

Changes:
- Added lib/admin-locale.ts with AdminLocale type ('en' | 'cs' | 'uk') and UI translations for nav/dashboard.
- Updated components/admin/admin-dashboard.tsx:
  - header language switcher now includes EN/CS/UK
  - switcher applies globally to admin UI texts (not only settings)
  - localized nav labels, header breadcrumb labels, logout button, dashboard analytics labels.
  - passed locale prop into VehiclesManager, ServicesManager, FAQManager, SettingsManager, DashboardHome.
- Updated components/admin/settings-manager.tsx:
  - accepts locale: AdminLocale
  - UI labels localized
  - added manual per-language fields for settings data: address_en/cs/uk and working_hours_en/cs/uk
  - locale switch changes which settings language field is being edited; no auto-translation.
- Updated components/admin/services-manager.tsx:
  - accepts locale prop and localizes page-level UI labels/buttons/messages
  - added manual ukrainian content fields title_uk/description_uk in demo model + edit form
- Updated components/admin/faq-manager.tsx:
  - accepts locale prop and localizes page-level UI labels/buttons/messages
  - added manual ukrainian content fields question_uk/answer_uk in demo model + edit form
- Updated components/admin/vehicles-manager.tsx:
  - accepts locale prop and localizes page-level UI labels/table headers/messages.

Validation:
- TypeScript and ESLint pass clean.

Behavioral outcome:
- Admin UI language can be switched EN/CS/UK from header on every admin page.
- Custom content is not machine-translated.
- Multilingual content remains manual input via dedicated language fields (including newly added UK fields in managers/settings demo state).