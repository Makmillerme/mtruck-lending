# About Layout Refactor + Scroll Fix (2026-05-12)

## Scroll fix: home-client.tsx
- Added useEffect guard at component mount
- Sets window.history.scrollRestoration = 'manual' temporarily
- Uses double rAF (requestAnimationFrame) to ensure browser has settled
- Calls window.scrollTo({ top: 0, left: 0 }) to force scroll to top
- Restores original scrollRestoration after
- Skips if window.location.hash is set (anchor navigation should still work)

## About section layout refactor: components/landing/about.tsx

### Left column (about-visual-shell)
- Truck visual card (unchanged, with callouts)
- NEW: description card directly below truck
  - Same glass style: rounded-[1.35rem] border border-white/[0.07] bg-background/30 backdrop-blur-sm shadow
  - max-w-md mx-auto to match truck card width
  - Contains t.description and t.description2 paragraphs

### Right column
- Badge + title (unchanged)
- Removed standalone description block
- Features grid: expanded from 4 to 6 cards (2x3)
  - New icons: ShieldCheck (Quality Warranty) + Headphones (After-sales Support)
  - Added to all 3 locales: en, cs, uk

## Validation
- TypeScript: 0 errors
- Linter: 0 errors
- Imports updated: added ShieldCheck, Headphones from lucide-react