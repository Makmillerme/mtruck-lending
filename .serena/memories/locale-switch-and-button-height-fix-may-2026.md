Fixed locale switch reliability and oversized landing button heights.

Locale fixes:
1) components/landing/header.tsx
- Changed language menu handlers from `onClick` to `onSelect` on `DropdownMenuItem` for stable Radix selection behavior.

2) components/admin/admin-dashboard.tsx
- Removed standalone admin locale state/localStorage logic.
- Integrated admin locale with shared `LocaleProvider` (`useLocale` from lib/locale-context).
- Admin and landing now use one locale source of truth and stay synchronized.

Button height fixes:
1) app/globals.css
- Reduced `.landing-btn` height from `3rem` to `2.5rem`.

2) Removed explicit `h-12` overrides where `landing-btn` is used:
- components/landing/header.tsx
- components/landing/hero.tsx
- components/landing/catalog.tsx
- components/landing/footer.tsx
- components/landing/vehicle-modal.tsx

Validation:
- Lint diagnostics for all edited files: no errors.