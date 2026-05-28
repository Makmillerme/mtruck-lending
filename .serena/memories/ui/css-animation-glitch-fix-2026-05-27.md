CSS animation glitch fix pass 2026-05-27.

Root causes fixed:
1. seamIridescent infinite animation on every section ::before/::after — disabled by default; static background-position. Optional restore via .landing-bg.landing-motion-enhanced only.
2. about-float-y idle animation conflicted with scroll-reveal transform on parent — removed float keyframes; callouts use transform/opacity reveal only.
3. FAQ accordion used height keyframes (animate-accordion-up/down) — replaced with grid 0fr/1fr transition in components/ui/accordion.tsx.
4. will-change: height on accordion content removed — caused layer thrashing.
5. catalog marquee — backface-visibility + translate3d; disabled entirely under prefers-reduced-motion.
6. Truck opacity — CSS fade via #about[data-about-active] .about-truck-stage > div; neon component no longer uses opacity transition classes.
7. Removed unused roadLines/animate-road keyframes.
8. landing-faq-item contain: layout paint.

Files: app/globals.css, components/ui/accordion.tsx, components/landing/neon-avto-assemble.tsx.

lint + build OK.