Fixed non-working testimonial carousel buttons in components/landing/why-us.tsx.

Replaced step-based `scrollBy` logic with card-targeted `scrollIntoView` navigation:
- determine current visible card index by `scrollLeft` and card `offsetLeft`
- move exactly to next/prev card index
- call `scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })`

This avoids cases where `scrollBy` produces no visible movement and ensures deterministic button navigation. Lint clean.