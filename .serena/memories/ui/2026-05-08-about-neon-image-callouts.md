## About section: neon callouts on vehicle image (2026-05-08)

- **components/landing/about.tsx**: Added `imageCallouts: string[3]` to `content` for `en`, `cs`, `uk`. New helper `AboutNeonLeader` renders uppercase label + SVG polyline (elbow: diagonal + horizontal); `flip` mirrors geometry for right-side callout. Three absolutely positioned callouts over `neon_avto.png` inside the existing `relative` image wrapper (`z-10`, `pointer-events-none` via CSS).
- **app/globals.css**: Classes `.about-neon-callout-root`, `.about-neon-callout-label`, `.about-neon-callout-svg`, `.about-neon-callout-line` — cyan/OKLCH stroke with layered `drop-shadow` for neon glow; label `text-shadow`; reduced glow under `prefers-reduced-motion: reduce`.

**Copy (EN)**: EU direct import; Full documentation pack; Verified quality. **UK**: Прямий імпорт з ЄС; Повний пакет документів; Перевірена якість. **CS**: Primy dovoz z EU; Kompletni dokumentace; Overena kvalita.