## Landing Section Spacing — Balanced (implemented 2026-05-07)

### CSS tokens added to app/globals.css
- `.section-y-balanced`: outer vertical padding — mobile 3.5rem (56px), desktop 5rem (80px)
- `.section-head-balanced`: margin-bottom under header block — mobile 2rem (32px), desktop 2.5rem (40px)
- `.section-grid-balanced`: grid gap for 2-column layouts — mobile 2.5rem (40px), desktop 3rem (48px)

### Applied in landing components
- about.tsx: section-y-balanced, section-grid-balanced, space-y-6 (was space-y-8)
- services.tsx: section-y-balanced, section-head-balanced (was mb-16)
- catalog.tsx: section-y-balanced, section-head-balanced, mb-10 for categories (was mb-16)
- why-us.tsx: section-y-balanced, section-grid-balanced, space-y-6 x2 (was space-y-8)
- faq.tsx: section-y-balanced
- footer.tsx: no changes (already compact: py-16/py-12)

### Hero tuning
- Content wrapper: py-10 lg:py-14 (was py-20)
- Space-y: space-y-6 (was space-y-8)
- Stats border-top pt: pt-6 (was pt-8)
- Section pt-20 preserved (fixed header compensation)

### Removed patterns
- py-24 (96px) from all landing sections
- mb-16 (64px) from all header blocks and category grids
- gap-16 (64px) from all content grids
- space-y-8 from all content stacks

### Principles
- 8-point rhythm, mobile-first compression
- Seam/background effects untouched
- No lint/ts errors introduced