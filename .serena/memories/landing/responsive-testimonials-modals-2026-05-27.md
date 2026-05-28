## Landing responsive fix: testimonials + modals

**Testimonials:** Cards used `flex-1 min-w-0` when `showControls=false`, preventing overflow detection and squashing 8 cards into one row. Fixed like catalog: always use `.testimonial-card--scroll` with clamp() widths for multi-card; `.testimonial-card--fit` for single. Force carousel when `carousel.length > 1`.

**Modals:** Base DialogContent had `w-full max-w-[calc(100%-2rem)]` → edge-to-edge on tablet. Now `w-[calc(100%-2rem)] max-w-[calc(100vw-2rem)] sm:max-w-lg`. CTA: `sm:max-w-xl`. Catalog brand: `sm:max-w-2xl lg:max-w-3xl`.

**Files:** why-us.tsx, dialog.tsx, cta-form-modal.tsx, catalog-brand-modal.tsx, globals.css