# Services Stage + Shared Glass Cards (2026-05-12)

## Shared component
`components/landing/landing-glass-card.tsx` — numbered premium glass card used by About features and Services grid.

## CSS (`app/globals.css`)
- `.landing-glass-card` + index/icon/title/desc sub-classes (hover lift, cyan watermark, gradient sheen)
- `.services-section-ambient` — section glow orbs
- `.services-header-row` — header + pipeline pills on lg
- `.services-pipeline` / `.services-pipeline-step` — flow chips (Підбір → Перевірка → Документи → Доставка)
- `.services-stage` + `.services-stage-shine` — glass panel wrapping service cards grid

## Services (`services.tsx`)
- Pipeline pills localized (en/cs/uk)
- Cards inside services-stage panel
- Uses LandingGlassCard

## About (`about.tsx`)
- Feature cards switched to LandingGlassCard (same style as Services)

## Validation: tsc --noEmit OK