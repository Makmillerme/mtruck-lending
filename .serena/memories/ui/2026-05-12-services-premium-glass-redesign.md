# Services Section — Premium Glass Redesign (2026-05-12)

## Design standard (from Hero + About)
- Cyan accent system: `border-cyan-200/30`, `bg-background/35`, `text-cyan-50/90` badges
- `chrome-gradient` on title highlight
- Body copy: `text-[15px] leading-relaxed text-muted-foreground`
- Glass cards: `rounded-2xl border border-cyan-200/18 bg-background/30 backdrop-blur-sm` + cyan hover
- Icon boxes: `h-9/10 w-9/10 rounded-lg border-cyan-200/30 bg-cyan-200/10`, icons `text-cyan-100`
- Section shell: dedicated bg class + `section-y-balanced` + `section-seam-accent`

## Changes
### `components/landing/services.tsx`
- Header: left-aligned (like About), cyan badge pill, chrome-gradient highlight
- Cards: same glass treatment as About feature cards
- Subtle index watermark `01/02` in `text-cyan-200/12` (replaces loud `text-secondary/50`)
- Grid gap `gap-4`, responsive 1/2/3 cols
- Section classes: `section-services-bg section-seam-accent` (was `section-blend`)

### `app/globals.css`
- Added `.section-services-bg` with dedicated oklch radial gradients (mirrors About pattern, hue ~248)

## Validation
- `npx tsc --noEmit` passed