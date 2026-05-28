## About neon truck SVG reveal polish

Adjusted `components/landing/neon-avto-assemble.tsx` after feedback that the particle-to-SVG conversion looked weak and dim.

### What changed
- Kept the independent particle flight motion.
- Improved final reveal timing:
  - `STABILITY_FRAMES_REQUIRED` -> 30
  - `HOLD_AFTER_SETTLE_MS` -> 520
  - slightly stricter converge threshold before reveal
- Added canvas glow during particle rendering (`shadowBlur`, cyan glow) for stronger continuity.
- Replaced final `<img>` reveal with a masked neon overlay using `mask-image` / `-webkit-mask-image` from `neon_avto_assemble.svg`.
- Final outline now uses a cyan radial gradient background, so the SVG reveal matches the particle color family instead of looking dull.
- Added smoother crossfade / scale / blur transition for the final outline.
- Final glow state boosts brightness/saturation and drop-shadow, keeping the reveal crisp.

### Validation
- `npx tsc --noEmit` passed.
- Cursor lint diagnostics clean for `components/landing/neon-avto-assemble.tsx`.