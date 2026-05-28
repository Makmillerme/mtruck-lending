## About callout position adjustment from user annotation

Adjusted two floating tag positions in `components/landing/about.tsx` to match the user's annotated screenshot.

### Updated positions
- `Повна документація` / second callout:
  - moved lower on the right side
  - from `top-[23%] right-3 sm:top-[25%] sm:right-4`
  - to `top-[31%] right-2 sm:top-[33%] sm:right-4`

- `Готово до експорту` / fifth callout:
  - moved down from the top edge closer to the truck cabin roof area
  - from `top-3 left-[34%] sm:top-4 sm:left-[36%]`
  - to `top-[9%] left-[34%] sm:top-[11%] sm:left-[37%]`

### Constraints preserved
- No animation logic changed.
- No morph timing changed.
- Only absolute positions in `calloutLayout` were adjusted.
- Existing non-overlap intent preserved.