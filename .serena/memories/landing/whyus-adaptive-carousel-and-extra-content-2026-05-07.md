Implemented adaptive testimonial carousel behavior in components/landing/why-us.tsx: added wrapperRef/trackRef measurement + resize listener to detect overflow, show nav buttons only when content exceeds container width, and auto-fit cards with flex-1 when all cards fit. Kept compact card sizing when scrolling is needed.

Added script scripts/append-extra-content.ts and executed it successfully (npx tsx scripts/append-extra-content.ts). Script appends +5 records each for services, vehicles, FAQ, testimonials, and appends +5 WhyUs reasons per locale (en/cs/uk) into landing_content_entries JSON reasons.

Validation: ReadLints reports no lint errors for components/landing/why-us.tsx and scripts/append-extra-content.ts.