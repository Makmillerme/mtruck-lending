## Catalog header brand marquee (2026-05-19)

Replaced category summary pills in catalog header (ВАНТАЖІВКИ · 5 etc.) with auto-scrolling infinite marquee of commercial vehicle/trailer/van brands.

**catalog.tsx:** `commercialBrands` array (MAN, Scania, Volvo, DAF, Renault, Mercedes-Benz, Iveco, Schmitz, Krone, Kögel, Wielton, Lamberet, Chereau, Sprinter, Transit, Crafter, Ducato, Master, Setra, Solaris); `CatalogBrandMarquee` component duplicates list for seamless loop; uses `landing-pipeline-pill--compact`.

**globals.css:** `.catalog-brand-marquee`, track animation `catalog-brand-marquee-scroll` 38s linear infinite, edge fade mask, reduced-motion slower.

Category tabs inside catalog-stage unchanged.