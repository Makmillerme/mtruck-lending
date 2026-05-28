Admin i18n aligned to cs model (2026-05-27):
- AdminLocale: en | cs | uk; public sk maps to cs via toAdminLocale/adminLocaleToPublic
- admin-validation: *Cs fields, contentEntrySchema locale [en,cs,uk]
- Fixed: advantages-manager (ui.cs key, normalizeContentLocale on load), content-manager (Lang cs, drafts.cs, save locale cs, load accepts sk/cs DB rows), content API route (Sk typo -> cs), builder-manager locale select, testimonials labels (CS)
- landing-content.ts reads sk or cs DB locale as cs content locale
- Remaining: mojibake in some admin UI strings (content-manager cs/uk blocks), home-client LandingData types still say quoteSk, seed scripts use locale sk