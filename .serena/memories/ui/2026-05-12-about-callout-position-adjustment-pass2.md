## About callout position adjustment pass 2

Further refined two callout positions in `components/landing/about.tsx` based on direct user feedback.

### Updated positions
- `Повна документація` / second callout:
  - moved further down so it sits over the trailer area
  - from `top-[31%] right-2 sm:top-[33%] sm:right-4`
  - to `top-[40%] right-2 sm:top-[42%] sm:right-4`

- `Готово до експорту` / fifth callout:
  - moved slightly to the right and lower
  - from `top-[9%] left-[34%] sm:top-[11%] sm:left-[37%]`
  - to `top-[13%] left-[39%] sm:top-[15%] sm:left-[41%]`

### Notes
- Only `calloutLayout` positions changed.
- Animation and morph behavior remain untouched.
- This pass follows the user’s explicit spatial direction after the first annotation-based adjustment.