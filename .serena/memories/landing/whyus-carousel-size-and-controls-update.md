Updated testimonials carousel UI in components/landing/why-us.tsx per UX request.

Changes made:
- Reduced testimonial block visual width by changing wrapper from `max-w-3xl` to `max-w-2xl`.
- Reduced card footprint and text density:
  - Padding changed from `p-8` to `p-6 sm:p-7`.
  - Min height changed from `min-h-[240px]` to `min-h-[210px]`.
  - Quote text changed from `text-lg` to `text-base sm:text-lg`.
- Moved navigation controls to the left/right sides of the carousel card itself using a 3-column grid layout (`grid-cols-[auto_1fr_auto]`).
- Switched navigation buttons from outlined to borderless style (`variant="ghost"`) while keeping circular icon buttons.
- Added aria-labels for accessibility: `Previous testimonial` and `Next testimonial`.

Validation:
- Lint diagnostics checked for `components/landing/why-us.tsx` after update.