Restored catalog tabs labels and 5 cards per category (2026-05-27 static landing).

- lib/landing-data.ts: catalog-meta en/uk now includes categories (Trucks/Trailers, Вантажівки/Причепи).
- lib/landing-section-parsers.ts: parseCatalogTabs applies locale defaults when tab name missing.
- lib/catalog-brands.ts: added DAF, Renault (truck) and Wielton, Lamberet (trailer) → 5 brands per tab.
- components/landing/catalog.tsx: defaultMarqueeBrands updated with new brands.
- vehicles in landing-data auto-generated from catalogBrands (10 total).