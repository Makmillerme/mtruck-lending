Frontend stability pass completed 2026-05-27.

Changes:
1. lib/locale-cookie.ts - cookie parsing, resolveInitialLocale (cookie > Accept-Language > uk default)
2. app/layout.tsx - async server layout reads cookies/headers, passes initialLocale to LocaleProvider, html lang synced
3. lib/locale-context.tsx - removed dead translations/t(); useState(initialLocale); persistLocale writes cookie+localStorage; one-time localStorage migration via rAF
4. components/landing/about.tsx - IntersectionObserver setState deferred; const fallbackTimer; reduced-motion via rAF
5. app/globals.css - seamless section backgrounds (unified oklch base edges), softer section-blend, reduced seam accent opacity, reduced-motion about tweaks
6. neon-avto-assemble.tsx - next/image with unoptimized
7. why-us.tsx - removed unused WhyUsReason type

Verification:
- npm run lint: 0 errors
- npm run build: OK (layout now dynamic due to cookies())
- next-devtools get_errors: no config errors; browser hydration warnings are Cursor data-cursor-ref injection artifact
- Browser QA: locale EN/UK switch, cookie persist on reload, catalog tabs (5 truck + 5 trailer brands), nav UK labels