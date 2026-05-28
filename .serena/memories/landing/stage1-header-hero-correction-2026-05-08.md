Applied user-requested correction to stage1 redesign:

- components/landing/header.tsx:
  - restored previous navigation structure/content (full section nav: home/about/services/catalog/why-us/faq/contact)
  - kept updated dark-tech visual styling only (glass container, refined CTA, mobile panel)
  - preserved locale switcher and navigation behavior.

- components/landing/hero.tsx:
  - removed bottom stats grid strip entirely as requested
  - restored hero text content semantics from pre-redesign version (badge/title/titleHighlight/subtitle/description/cta/secondary)
  - kept new stylistic treatment (cinematic background, neon/glass accents) adapted to project.

Validation: lint clean for header and hero.