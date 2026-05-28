Reduced seam accent center thickness per user feedback.

File: app/globals.css

Adjustments:
- Main seam (`::before`):
  - height reduced 4px -> 3px
  - center alpha softened
  - clip-path narrowed in middle (less bulky center)
- Bloom seam (`::after`):
  - height reduced 6px -> 4px
  - glow alpha lowered significantly
  - clip-path tightened for subtler center spread
- Animation slightly slowed 4.6s -> 4.8s for calmer premium feel.

Result: center is visibly thinner and cleaner while preserving thin edges + shimmer.

Validation: lints clean.