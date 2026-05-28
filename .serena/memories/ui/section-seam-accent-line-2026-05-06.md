Added a subtle non-full-width gray seam accent line between landing sections.

Changes:
1) app/globals.css
- Added reusable class `.section-seam-accent` with `::before` pseudo-element.
- The line is centered and not full-width:
  - width: `min(72%, 980px)`
  - height: `1px`
  - soft gray gradient with transparent edges to keep premium look.

2) Applied class to landing sections:
- components/landing/about.tsx
- components/landing/services.tsx
- components/landing/catalog.tsx
- components/landing/why-us.tsx
- components/landing/faq.tsx
- components/landing/footer.tsx

Notes:
- Hero not changed with seam class (as intended), seam accents start from About.
- Keeps existing smooth background while adding visual section separators.
- Lint check passed with no new issues.