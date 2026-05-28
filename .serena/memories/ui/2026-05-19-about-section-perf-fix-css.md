# About section perf fix (2026-05-19)

## Why it still lagged after removing canvas
Main thread GPU cost from stacked effects:
- mix-blend-screen + multi drop-shadow on truck SVG
- backdrop-filter on shell, 5 callouts, 4 feature cards, stats strip
- 5 infinite float animations + will-change layers
- section-seam-accent infinite seamIridescent on ::before/::after
- transform scale(1.18) on truck wrapper
- double React setState on scroll trigger

## Fixes
- neon-avto-assemble: removed mix-blend-screen, single lighter filter
- about.tsx: single sectionActive state + data-about-active; removed stats backdrop-blur; about-truck-stage class
- globals.css #about: no backdrop-filter on glass cards in about; pause callout float when off-screen; static seam on #about; removed backdrop-filter from shell/callout frames; removed will-change on callouts