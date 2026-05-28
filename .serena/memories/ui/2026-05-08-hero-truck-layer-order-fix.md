Fixed Hero layer order so truck is explicitly above background photo.

In `components/landing/hero.tsx`:
- Set background image wrapper to `z-0`.
- Raised truck overlay layer from `z-[2]` to `z-20`.
- Set content grid wrapper to `z-30` to keep text above truck.

Result: truck remains over Hero background image, while textual content still has highest readability layer.
Validation: `npx tsc --noEmit` passes.