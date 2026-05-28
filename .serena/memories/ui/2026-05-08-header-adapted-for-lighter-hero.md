Adapted landing header visuals to work with brighter hero background.

Updated `components/landing/header.tsx`:
- Refined two header states (top vs scrolled) with darker glass gradients for stronger contrast on bright image.
- Added/kept subtle cyan bottom border and stronger shadow in scrolled state.
- Increased nav text contrast (`text-cyan-50/90`, hover to white).
- Updated locale switcher button to darker translucent base with cyan text for readability.
- Updated CTA button to brighter cyan glow style while preserving existing shape and behavior.
- Updated mobile menu trigger icon color and mobile menu panel background/border for consistency.

Validation:
- `npx tsc --noEmit` passes.
- `npm run lint` passes with only pre-existing admin warnings.