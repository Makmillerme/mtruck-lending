Adjusted section seam iridescent effect after user reported no visible change.

File updated: app/globals.css

What was changed:
- Reworked seam accent from single 1px layer into two-layer structure:
  - `::before`: 2px metallic core line with stronger mid highlight
  - `::after`: 4px soft bloom layer (blurred glow) underneath
- Increased animation visibility:
  - Kept iridescent background-position motion but made contrast stronger
  - Duration changed to `4.6s` for clearer perceptible shimmer
  - Opacity envelope changed to `0.62 -> 1 -> 0.62`
- Kept non-full-width constraint (`min(72%, 980px)`) and centered placement.

Result: shimmer/pereliv should now be clearly visible while still premium and subtle.

Validation: lints clean.