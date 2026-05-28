About visual block final redesign (2026-05-08).

Key changes:
1. Image: object-cover + object-center directly in absolute inset-0 wrapper. No nested scale containers. Truck fills the square naturally.
2. Callouts: dot-chip design with cyan dot, dark glass background, no uppercase, balanced text wrap. Component simplified: no align prop, dot always left.
3. CSS: .about-float-callout-dot (5px cyan dot), .about-float-callout-frame (inline-flex, gap, backdrop-blur), .about-float-callout-label (normal casing, 0.6-0.7rem clamp).
4. Animation: 4px amplitude, 6.5s period, natural stagger.
5. i18n: Short callout strings for uk/en/cs. UK: Прямий імпорт з ЄС / Повна документація / Перевірена якість. EN: EU direct import / Full documentation / Verified quality. CS: Přímý dovoz z EU / Kompletní dokumentace / Ověřená kvalita.
6. tsc passes, no lint errors.