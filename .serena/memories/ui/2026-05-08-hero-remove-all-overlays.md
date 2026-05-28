Removed all visual filter overlays from Hero background in `components/landing/hero.tsx`.

Removed elements:
- Global hero top overlay wrapper (`pointer-events-none absolute inset-0`) containing radial + vertical gradients.
- Image-level overlays inside hero background container:
  - horizontal dark gradient
  - vertical dark gradient
  - radial cyan glow

Result:
- Hero background now renders as clean, unfiltered image (`/images/hero-road-bg.png`) with no additional tinting/filters.

Validation:
- `npx tsc --noEmit` passes.