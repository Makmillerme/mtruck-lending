## Catalog brand visiting cards (2026-05-19)

Landing catalog refactored from e-commerce vehicle cards to brand showcase cards.

**lib/catalog-brands.ts:** 6 brands (3 truck: MAN/Scania/Volvo, 3 trailer: Schmitz/Krone/Kögel) with EN/CS/UK tagline, highlights, overview, bodyTypes, configurations, typicalSpecs.

**catalog.tsx:** Brand cards (name on media, tagline + highlight pills, no price/year). Landing copy "Brands We Work With". Uses static catalogBrands, not DB vehicles.

**catalog-brand-modal.tsx:** Descriptive modal sections only + soft note. Removed sales CTA buttons.

**Deleted:** vehicle-modal.tsx. home-client no longer passes vehiclesData to Catalog.

**globals.css:** `.catalog-brand-card*` styles.