Unified carousel arrow buttons in both testimonials and catalog to use the same gray visual style.

Files:
- components/landing/why-us.tsx
- components/landing/catalog.tsx

Applied class style:
- border-border/70
- bg-muted/70 + backdrop blur
- supports-[backdrop-filter]:bg-muted/55
- hover:bg-muted, active:bg-muted/90

Purpose: ensure both sections use identical gray controls (not white), visible and consistent with user requirement. Lint clean.