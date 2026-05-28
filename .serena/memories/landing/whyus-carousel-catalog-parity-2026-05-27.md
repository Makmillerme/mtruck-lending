Why-us testimonial carousel aligned with catalog carousel (2026-05-27).

Issues: buttons in header used scrollIntoView inside nested overflow-hidden wrapper; no canScrollPrev/Next; showControls heuristic differed from catalog.

Fix in components/landing/why-us.tsx:
- wrapperRef wraps carousel viewport only (same as catalog)
- trackRef is direct scroll container (removed extra overflow-hidden wrapper)
- scrollTo({ left: card.offsetLeft }) instead of scrollIntoView
- ResizeObserver + scroll rAF updates showControls, canScrollPrev, canScrollNext
- Buttons moved below cards, centered, disabled at scroll edges
- Localized prev/next aria labels EN/UK