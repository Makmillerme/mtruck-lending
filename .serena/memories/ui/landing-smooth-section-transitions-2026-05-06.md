Refined landing background transitions between sections.

Changes:
- app/globals.css:
  - Updated `.landing-bg` with softer multi-layer composition:
    - added vertical base linear gradient
    - widened radial gradients and added fade-stop percentages for seamless blending
  - Added new `.section-blend` utility class with subtle vertical gradient overlay.

- Applied `section-blend` to all landing blocks:
  - components/landing/hero.tsx
  - components/landing/about.tsx
  - components/landing/services.tsx
  - components/landing/catalog.tsx
  - components/landing/why-us.tsx
  - components/landing/faq.tsx
  - components/landing/footer.tsx

Outcome:
- color transitions between sections are smoother with reduced visible seams.

Validation:
- TypeScript and ESLint pass clean.