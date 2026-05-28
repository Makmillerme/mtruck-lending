## FAQ accordion Chrome jank fix

**Why it glitched:** shadcn/Radix `AccordionContent` used `animate-accordion-down/up` keyframes animating `height` → layout thrashing every frame in external Chrome. Plus FAQ had `overflow-visible`, `transition-all` on trigger, border hacks.

**Fixes:**
1. `components/ui/accordion.tsx`: grid `0fr`/`1fr` + `transition-[grid-template-rows]` instead of height keyframes; trigger `transition-[color,opacity]` not `transition-all`.
2. `components/landing/faq.tsx`: `landing-faq-accordion`, `landing-faq-item`, stable `value=item-${id}`, `overflow-hidden`, simplified borders.
3. `globals.css`: `contain: layout paint` on FAQ items; reduced-motion disables grid transition.

Admin accordions benefit from same grid animation.