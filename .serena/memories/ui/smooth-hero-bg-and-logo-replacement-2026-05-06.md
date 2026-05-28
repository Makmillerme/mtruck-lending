Applied two user-requested fixes:

1) Smoother landing hero background transitions
- Updated app/globals.css .landing-bg gradient composition:
  - added soft vertical linear gradient base
  - adjusted all radial gradients to wider ellipses with fade stop percentages for smoother blending
- Updated components/landing/hero.tsx background overlays:
  - replaced hard half-screen gradient blocks with large blurred color blobs for seamless transitions

2) Replaced logo with newly provided file and removed old source
- Moved user-provided file from project root:
  - `M-TRUCK logo iron (1).png`
  - to `public/m-truck-logo.png` with overwrite (`-Force`), replacing previous logo file
- Root source file is removed after move (old source deleted).

Additional UX fix for header dropdown layout shift
- Set `modal={false}` on DropdownMenu in:
  - components/landing/header.tsx
  - components/admin/admin-dashboard.tsx
- This prevents body scroll-lock/padding compensation jump when menu opens.

Validation: TypeScript and ESLint clean.