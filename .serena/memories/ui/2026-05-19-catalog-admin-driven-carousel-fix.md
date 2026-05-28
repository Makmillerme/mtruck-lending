## Catalog: admin-driven + adaptive carousel (2026-05-19)

### Landing
- `components/landing/catalog.tsx` loads brands from `vehiclesData` (DB), maps via `vehicleToCatalogBrandCard` in `lib/catalog-vehicle.ts`.
- Carousel: always `flex` track; nav buttons only when total card width + gaps > wrapper (`ResizeObserver`), not `length > 3`.
- When all cards fit: `flex-1 min-w-0` per card, `overflow-x-hidden`, no arrows.
- When overflow: fixed widths `w-[280px] sm:w-[300px] lg:w-[320px]`, snap scroll + arrows below track.
- Equal heights: `.catalog-cards-track { align-items: stretch }`, card `height: 100%`, body flex column, tagline `min-height`.
- `lib/landing-content.ts`: restored `vehicles` in bundle (`landing-bundle-v3`, tag `landing-vehicles`).
- `home-client.tsx` passes `data.vehicles` to `Catalog`.

### DB / seed
- Prisma `Vehicle`: `orderIndex`, `catalogMeta` (JSON: bodyTypes/configurations/typicalSpecs per en/cs/uk).
- `scripts/seed-catalog-brands.ts` seeds 6 brands from `lib/catalog-brands.ts` (run after columns exist).

### Admin
- `vehicles-manager.tsx`: catalog brand UX — tagline, overview, highlights (specs), orderIndex, catalogMeta lists per locale; legacy year/price/images in `<details>`.
- `vehiclePayloadSchema`: `orderIndex`, `catalogMeta`.
- API vehicles ordered by `orderIndex`.

### Files
- `catalog-brand-modal.tsx`: removed hardcoded `toCatalogBrandCard` / catalog-brands import.
- `lib/catalog-brands.ts` kept as seed source only.