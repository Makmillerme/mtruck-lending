Implemented stage 1 plan (DB fix + Header/Hero redesign).

DB fix:
- Added reusable SQL executor script scripts/apply-sql-file.ts.
- Applied scripts/sql/align_builder_and_vehicle_uk.sql to DB.
- Regenerated Prisma client.
- Added and executed scripts/check-vehicles-uk-columns.ts confirming columns: name_uk, description_uk, tag_uk.

Header redesign:
- Rebuilt components/landing/header.tsx in dark-tech style:
  - glass/blur shell with border glow
  - compact desktop nav pills
  - updated CTA style
  - improved mobile menu panel
  - kept locale switcher + onNavigate behavior.

Hero redesign:
- Rebuilt components/landing/hero.tsx to reference style direction adapted for trucks:
  - cinematic background image card with layered overlays
  - neon orbit visuals
  - strong uppercase headline + subtitle + dual CTA
  - bottom stats strip with icons
  - responsive layout for desktop/tablet/mobile.

i18n polish:
- Updated header/hero dictionaries for en/cs/uk with corrected Czech diacritics and localized CTA/labels.

Validation:
- npx tsc --noEmit passed.
- npm run lint passed with existing non-blocking admin warnings (ui.loadError deps) outside stage-1 scope.
- DB smoke check script confirms vehicles uk columns exist.