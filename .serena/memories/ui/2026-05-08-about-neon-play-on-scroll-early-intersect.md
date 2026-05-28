About + neon timing fix (scroll-visible start):

- **Root cause**: `NeonAvtoAssemble` ran `init()` on mount while user still on hero, so assembly finished before scrolling to #about. IntersectionObserver used `rootMargin: 0px 0px -10% 0px` (requires block deeper in viewport) + 340ms delay — late trigger.

- **neon-avto-assemble.tsx**: optional `play` prop (default `true`). Effect starts canvas/init only when `play` is true; dependency `[play]` with early `if (!play) return`.

- **about.tsx**: single state `visualReady`. Observer `threshold: 0`, `rootMargin: 0px 0px 22% 0px` (earlier intersect while approaching), no setTimeout — `setVisualReady(true)` on first intersect, disconnect. Pass `play={visualReady}` to `NeonAvtoAssemble`, `inView={visualReady}` for callouts (stagger unchanged via CSS). Reduced motion: immediate `visualReady`.
