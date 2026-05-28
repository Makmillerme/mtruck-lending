Adjusted landing header behavior after sticky did not meet expected 'always on top while scrolling' behavior.

Implementation in `components/landing/header.tsx`:
- Restored header to `fixed top-0 left-0 right-0 z-50` so it is always pinned to viewport top during scroll.
- Added a layout spacer before the fixed header: `<div className="h-[72px]" aria-hidden="true" />`.
- Kept dynamic scroll visual states (`isScrolled`) for transparency/blur transition.

Result:
- Header now stays at top while scrolling.
- No initial overlap with Hero because spacer reserves header height in document flow.

Validation:
- `npx tsc --noEmit` passes.