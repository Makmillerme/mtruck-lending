Updated landing header behavior so it does not overlap hero by default:
- In `components/landing/header.tsx`, changed header positioning from `fixed top-0 left-0 right-0` to `sticky top-0`.
- Kept `z-50` and blur/background styling intact.
- Result: header now occupies normal document flow space above hero instead of overlaying it.
- Validation: `npx tsc --noEmit` passes.