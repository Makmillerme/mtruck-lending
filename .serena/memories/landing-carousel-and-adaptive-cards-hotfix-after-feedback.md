Applied corrective UX update after user feedback about overchanged testimonial carousel.

Files:
- components/landing/why-us.tsx
- components/landing/catalog.tsx
- components/landing/services.tsx

What was adjusted:
1) Testimonials carousel (WhyUs)
- Kept requested functional behavior: all testimonials in a single horizontal row with button-based scrolling.
- Reduced visual disruption vs previous version:
  - switched to stable card min-width pattern (`min-w-[320/360/420px]`) for consistent row behavior.
  - hid native horizontal scrollbar (`[scrollbar-width:none]` and `::-webkit-scrollbar hidden`).
  - retained previous card visual style and content hierarchy.

2) Catalog cards adaptivity
- Added count-aware grid class logic:
  - 1 card -> centered single-column `max-w-xl`
  - 2 cards -> centered 2-column `max-w-5xl`
  - 3+ cards -> responsive 1/2/3 columns

3) Services cards adaptivity
- Added same count-aware adaptive grid strategy as catalog.

Validation:
- ReadLints for updated files: no diagnostics.