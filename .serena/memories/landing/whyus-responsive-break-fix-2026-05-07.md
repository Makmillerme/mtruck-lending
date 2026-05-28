Fixed testimonials layout breakage in components/landing/why-us.tsx.

Issue: many testimonial cards could enter non-carousel autofit mode and compress into narrow columns on some screens.

Fix:
- In overflow/controls effect, force carousel mode for 4+ cards (`setShowControls(true)`), independent of width calc.
- Added `canAutoFit = carousel.length <= 3 && !showControls`.
- Card sizing now uses autofit only when `canAutoFit` is true; otherwise fixed card width carousel sizing is used.

Result: testimonials remain adaptive and readable across screen sizes, no squeezed columns for large sets.