Restored per-section background tone variation with smooth transitions in app/globals.css.

Issue:
- .section-tint and .section-blend were fully transparent, making all landing sections look visually identical.

Fix:
- Replaced transparent section wrappers with a section tone system:
  - `.section-tint, .section-blend` now render a vertical gradient that is transparent at edges and tinted in the center.
  - Added per-section tone variables via selectors:
    - `section#home`
    - `section#about`
    - `section#services`
    - `section#catalog`
    - `section#why-us`
    - `section#faq`
    - `footer#contact`
- Keeps smooth blending between sections while restoring alternating dark/light navy shades.

Validation:
- ReadLints for app/globals.css returned no diagnostics.