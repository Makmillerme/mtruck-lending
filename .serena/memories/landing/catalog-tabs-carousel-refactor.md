Refactored catalog categories block to compact tab-style carousel and removed full catalog button.

File: components/landing/catalog.tsx

Changes:
1) Removed bottom CTA button:
- Deleted `View Full Catalog` button block from catalog section.
- Removed unused related variable usage.

2) Categories redesigned as intuitive tabs (not large cards):
- Replaced large 3-card category counters grid with compact tab pills.
- Each tab now includes category icon, localized name, and count.
- Active tab has highlighted styling; inactive tabs are subtle.

3) Added adaptive tab carousel (tabs only):
- Mobile: shows 1 tab.
- Tablet: shows 2 tabs.
- Desktop: shows 3 tabs.
- Added left/right controls (`ChevronLeft`, `ChevronRight`) to page through tab set.
- Supports catalog category set sizes from 1 to 3.

4) Connected tabs to vehicle listing behavior:
- `activeCategory` now filters displayed featured vehicles by selected category.
- If selected category has no data, gracefully falls back to all vehicles.

Validation:
- Lint diagnostics for updated file: none.