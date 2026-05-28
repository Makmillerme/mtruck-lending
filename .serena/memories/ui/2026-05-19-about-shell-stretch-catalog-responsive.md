## About visual shell height (2026-05-19)
- Removed fixed `--about-visual-shell-h` pinning on lg; shell stretches to `about-layout-grid` row height.
- Removed `justify-content: flex-end` on `.about-visual-column` (was top gap).
- `about-visual-column` + `about-visual-shell`: flex column, `flex-1`, `height/min-height: 100%`.
- Markup: `flex min-h-0 flex-col` on column, `min-h-0 flex-1` on shell.

## Catalog carousel responsive (2026-05-19)
- CSS: `.catalog-brand-card--fit` (flex row) vs `--scroll` with `clamp()` widths per breakpoint (88vw mobile → 28vw desktop).
- JS: carousel if overflow OR per-card width < 220px when sharing row; reads real `gap` from computed style.
- ResizeObserver on wrapper + track; re-measure when `showCardControls` toggles.
- Mobile wrapper `-mx-1 px-1`, `gap-3`, scroll-padding on track.