## Hero 80vh edge-to-edge mobile fix

**Frame borders:** Caused by `transform: scale(0.9)` on hero image leaving landing-bg visible around edges. Removed scale; photo uses object-cover fill only.

**Height:** `calc((100dvh - 72px) * 0.8)` via `--hero-height` on `.hero-shell` (not 100%, not tiny 56dvh clamp).

**Edge-to-edge:** `#home` background transparent; `.hero-bg-layer` dark fallback, overflow hidden.
