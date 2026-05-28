Updated landing UX for testimonials, catalog cards, and services cards responsiveness.

Files updated:
1) components/landing/why-us.tsx
- Reworked testimonials from single-slide card to horizontal row carousel with all cards present in track.
- Added scroll track with `overflow-x-auto`, snap behavior, and smooth scrolling.
- Added previous/next controls that scroll by one card width using `trackRef` and `scrollBy`.
- Cards responsive widths:
  - mobile ~88%
  - small tablets ~65%
  - desktop ~42%

2) components/landing/catalog.tsx
- Added adaptive card grid sizing based on card count (`featuredVehicles.length`):
  - 1 card -> centered single-column max width
  - 2 cards -> centered 2-column on md+
  - 3+ cards -> responsive 1/2/3 grid
- Kept tab-carousel category controls and filtering logic.

3) components/landing/services.tsx
- Added adaptive services grid sizing based on service count:
  - 1 card -> centered single-column max width
  - 2 cards -> centered 2-column on md+
  - 3+ cards -> responsive 1/2/3 grid

Validation:
- Lint checks for all three components passed without diagnostics.