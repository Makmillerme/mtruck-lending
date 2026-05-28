## About vehicle visual — floating badges + scaled image (2026-05-08 update)

Replaced neon **polyline** callouts with **glass pill badges** and soft drift animation.

- **components/landing/about.tsx**: `AboutFloatingBadge` — border + backdrop blur + uppercase labels; three instances with `about-float-a|b|c` for staggered `aboutFloatDrift` motion. Image sits in inner `absolute inset-0 overflow-hidden` wrapper; **`scale-[1.28]` / `sm:scale-[1.22]`** with **`object-[50%_46%]`** so the truck reads larger.
- **app/globals.css**: Removed `.about-neon-callout-*`. Added `@keyframes aboutFloatDrift`, `.about-float-a/b/c`, `.about-floating-badge` text-shadow; `prefers-reduced-motion: reduce` disables float animation.

Previous memory `ui/2026-05-08-about-neon-image-callouts` superseded for lines/SVG behavior.