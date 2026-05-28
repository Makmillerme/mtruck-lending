## DB and assets cleanup (2026-05-19)

**DB:** Purged all vehicles (6 records) via scripts/purge-vehicles.ts. Table empty; landing no longer fetches vehicles (LandingBundle v2, removed getVehiclesSafe).

**Deleted scripts:** reset-catalog-vehicles.ts, smoke-vehicle-query.ts, check-vehicles-uk-columns.ts.

**Updated seeds:** seed-full-site.ts only deleteMany vehicles; append-extra-content.ts no extraVehicles.

**Deleted media:** neon_avto_animated.svg, neon_avto.svg (root), neon_avto.png, hero-truck*.jpg/png, fleet.jpg, trailer.jpg, placeholder*.jpg/png/svg in public.

**Kept:** hero-road-bg.png, neon_avto_assemble.svg, m-truck-logo.png, icons.

**Removed:** playground/neon-truck-finale dev demo.

**CSS:** Removed dead catalog-vehicle-card and tab-count styles.

**catalog-brands:** Removed image field; modal uses gradient header only.

Admin vehicles API/manager remain for optional future CMS; catalog is static brands.