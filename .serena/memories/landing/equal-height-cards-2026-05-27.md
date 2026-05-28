## Equal-height carousels (grid) + hero copy-width scrim

**Equal height:** Flex scroll tracks failed to equalize card heights. Switched `.testimonials-cards-track` and `.catalog-cards-track` to CSS Grid (`grid-auto-flow: column`, `align-items: stretch`). Cards use `height:100%`. Works all breakpoints.

**Hero scrim:** Removed `.hero-copy-panel::before` box. `.hero-bg-scrim` is horizontal gradient only — dark left, fades transparent right, stop positions match copy panel width (~23.5–38rem + fade tail).
