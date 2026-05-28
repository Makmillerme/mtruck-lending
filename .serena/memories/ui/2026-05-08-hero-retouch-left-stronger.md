Adjusted hero readability retouch to be stronger on text side and lighter on opposite side.

In `components/landing/hero.tsx`:
- Updated horizontal overlay gradient from mild to asymmetric stronger-left profile:
  `linear-gradient(90deg, rgba(6,16,34,0.56) 0%, rgba(6,16,34,0.34) 34%, rgba(6,16,34,0.16) 62%, rgba(6,16,34,0.07) 100%)`.

Effect:
- Left text zone now has noticeably better contrast.
- Right side remains much cleaner/less tinted.

Validation:
- `npx tsc --noEmit` passes.