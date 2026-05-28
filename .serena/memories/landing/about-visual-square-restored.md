Restored About right visual block to square ratio after user reported rectangular appearance.

File: components/landing/about.tsx
- Right visual container changed back from fixed-height rectangle to `aspect-square`.
- Left column reverted from forced min-height/flex stretching to regular `space-y-6` flow.

Reason:
- Previous equal-height enforcement made right block rectangular (`min-h-[640px]`).
- User requested original normal shape appearance.

Validation:
- Lint check passed.