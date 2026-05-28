## Catalog section premium glass redesign (2026-05-19)

Aligned Catalog with Services/About visual system while preserving all functionality (category tabs, carousel, modal, scroll controls, responsive card basis).

**globals.css:** `section-catalog-bg`, ambient glow, `catalog-stage` + shine, glass category tabs, vehicle cards, spec pills, carousel btn styles.

**catalog.tsx:** Cyan badge + chrome title; header row with pipeline pills summary; stage wrapper; glass vehicle cards; removed shadcn Badge; lighter hover scale 1.03; cn() for classes.

Logic unchanged: activeCategory, categoryVehicles, showCardControls, scrollCards, VehicleModal.