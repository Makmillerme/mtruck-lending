Updated admin layout per UX request:
- Added sidebar bottom CTA button 'Go to Site' (localized EN/CS/UK) in components/admin/admin-dashboard.tsx.
- Moved account display (name/email) and logout action from sidebar to top header right section.
- Header right now contains: language switcher, account info, logout button.
- Removed old sidebar user block completely.
- Added `goToSite` label to nav translations in lib/admin-locale.ts.
- Replaced anchor with Next.js Link to satisfy lint.
- Validation: tsc + eslint clean.