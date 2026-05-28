Professional seamless-background fix using Serena:
- Root cause: per-section overlays (`section-tint`, `section-blend`) restarted gradients each section, creating visible horizontal seams.
- Update in app/globals.css:
  - `.section-tint` -> transparent
  - `.section-blend` -> transparent
- Left single global `.landing-bg` as the only background color system, which removes section boundaries.
- Validation: TypeScript + ESLint pass clean.