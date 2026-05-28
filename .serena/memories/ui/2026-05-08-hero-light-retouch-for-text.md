Added subtle hero retouch overlays for text readability while keeping background mostly clean.

In `components/landing/hero.tsx` inside background image layer:
- Added light horizontal gradient overlay to gently darken left text zone:
  `linear-gradient(90deg, rgba(6,16,34,0.36) -> 0.16 -> 0.08)`.
- Added very soft bottom gradient overlay for readability near lower text/buttons:
  `linear-gradient(180deg, 0 -> 0.08 -> 0.2)`.

Goal achieved: improve hero text contrast without returning to heavy filter look.

Validation:
- `npx tsc --noEmit` passes.