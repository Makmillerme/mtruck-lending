## Chrome external vs Cursor embedded browser

**Symptom:** Landing CSS "glitches" only in external Chrome; smooth in Cursor Simple Browser / preview.

**Likely causes (not mutually exclusive):**
1. Chrome extensions (Dark Reader, ad blockers) — test Incognito.
2. Windows GPU + Chrome compositor bugs with `filter`, `transform: scale`, `position: fixed` + broad transitions.
3. `content-visibility: auto` — removed 2026-05-19 (known Chrome scroll flicker; Electron may not show it).
4. Dev `npm run dev` + React Strict Mode heavier in normal Chrome tab.
5. Hardware acceleration / driver — chrome://gpu, toggle "Use hardware acceleration".

**Code mitigations applied:**
- Removed `content-visibility: auto` on `.landing-bg > div:nth-child(n+3)`.
- Header: `transition-all` → `transition-[background-color,box-shadow,border-color]`; `translateZ(0)` on `.landing-bg header`.
- Prior sitewide perf pass: no backdrop-blur stack, static seams, no card hover translateY.

**User diagnostics:** Incognito, chrome://gpu, compare production build (`npm run build` + `npm start`), disable extensions.