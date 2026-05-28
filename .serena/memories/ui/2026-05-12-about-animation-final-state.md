## About animation final state (2026-05-12)

This memory captures the final accepted state of the About truck visual after multiple iterations.

### Current behavior
- `components/landing/neon-avto-assemble.tsx`
  - Truck animation uses independent particle motion, not ribbon lanes.
  - Each particle has its own `startX/startY`, `flightDelay`, `arcHeight`, `driftAmp`, `driftFreq`, `driftPhase`, and `spinOffset`.
  - Particles travel in scattered individual arcs toward the final truck outline.
  - Final canvas -> SVG handoff is polished with a short overlap (`FINAL_BLEND_OVERLAP_MS`) so the transition reads as a morph, not a hard swap.
  - Final SVG glow/brightness was increased to stay close to the particle-line color and avoid looking dim.
  - Added `onMorphComplete` callback; it fires once when the SVG morph has actually completed (after overlap), with a fallback fire on asset-load failure.

- `components/landing/about.tsx`
  - Section starts animation when About is sufficiently visible via `IntersectionObserver` (`intersectionRatio >= 0.45`) with an 800ms fallback timer.
  - Floating callouts are no longer revealed together with animation start.
  - Callouts now reveal only after `NeonAvtoAssemble` reports morph completion via `onMorphComplete`.
  - Callout copy expanded from 3 to 5 labels for `en/cs/uk`.
  - Added two new tags in safe perimeter positions:
    - bottom-right region
    - upper-center-left region
  - Existing tags remain at top-left, upper-right, and bottom-left.

### Current tag copy
- en: `EU direct import`, `Full documentation`, `Verified quality`, `Service record`, `Export ready`
- cs: `Přímý dovoz z EU`, `Kompletní dokumentace`, `Ověřená kvalita`, `Servisní historie`, `Připraveno k exportu`
- uk: `Прямий імпорт з ЄС`, `Повна документація`, `Перевірена якість`, `Сервісна історія`, `Готово до експорту`

### Validation
- `npx tsc --noEmit` passes.
- Cursor lints for changed files pass.

### Important constraint for future edits
- Do not revert to grouped/ribbon/square particle motion. User explicitly preferred the scattered independent-particle look.
- Keep callout reveal tied to morph completion, not initial scroll entry.