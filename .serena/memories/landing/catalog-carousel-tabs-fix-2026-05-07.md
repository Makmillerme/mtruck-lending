Updated components/landing/catalog.tsx per UX requirement: removed category tab scroll buttons entirely; tabs are now always static 3-category controls with counters.

Moved carousel navigation to vehicle cards area only. Added left/right controls on card carousel edges and show them only when selected category has more than 3 cards.

Fixed data mismatch bug: catalog now renders all vehicles of selected category (no featured-only fallback), so tab counter and visible data are consistent (e.g., count 5 -> 5 actual cards in carousel).

Implemented horizontal card carousel with responsive card basis (1/2/3 visible depending on breakpoint) and hidden native scrollbar.