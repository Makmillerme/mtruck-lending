Applied second lightness tuning pass for landing header on bright hero background.

In `components/landing/header.tsx`:
- Lightened both top and scrolled header gradient states while preserving contrast.
- Increased border visibility with lighter cyan tones.
- Kept shadow but reduced darkness for cleaner premium look.
- Increased nav text and mobile menu icon brightness.
- Lightened locale switcher background/border hover states.
- Lightened CTA gradient/glow/border for better harmony with bright hero.
- Lightened mobile menu panel gradient and top border.

Validation:
- `npx tsc --noEmit` passes.