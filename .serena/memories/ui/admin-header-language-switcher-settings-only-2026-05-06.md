Added language switcher to admin header (right side) in components/admin/admin-dashboard.tsx.
- Switcher has EN/CS options.
- It is interactive only when activeTab === 'settings'; disabled for all other tabs.
- Selected locale state (settingsLocale) is passed to SettingsManager.

Updated components/admin/settings-manager.tsx:
- Added prop locale: 'en' | 'cs'.
- Localized fields (address, working_hours) now render one active language input at a time based on header switcher.
- Non-localized records (email/phone/social links) remain unchanged.

Validation: tsc and eslint pass clean.