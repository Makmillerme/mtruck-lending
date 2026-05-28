## Catalog 2-tab refactor + DB reset (2026-05-19)

Merged trailer/van into single tab "Причепи / Напівпричепи" (EN: Trailers / Semi-trailers, CS: Přívěsy / Návěsy). Filter matches category trailer OR legacy van.

Removed tab counters. Adaptive carousel like WhyUs: resize observer logic, fixed card widths when scrolling, flex-1 when all fit.

DB: scripts/reset-catalog-vehicles.ts deletes all vehicles, seeds 6 (3 truck + 3 trailer) with EN/CS/UK copy.

Admin vehicles-manager: 2 categories only (truck, trailer). db-types updated.

globals.css: 2-column category tabs, tab layout without count.