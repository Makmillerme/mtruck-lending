Updated catalog carousel controls placement in components/landing/catalog.tsx per UX request.

Changes:
- Removed side absolute arrows and the container horizontal padding (`px-12`) that could affect visual card sizing.
- Kept card track width untouched.
- Added controls as a separate centered row below cards (`mt-4 flex justify-center gap-2`) shown only when `showCardControls` is true.
- Preserved unified arrow style and hover behavior.

Result: scrolling buttons no longer influence card dimensions/layout; controls are below the carousel.