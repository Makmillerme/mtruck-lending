## About: fixed visual shell height + bottom alignment

**Requirement:** Left `about-visual-shell` same height for all locales; right feature cards grid stays bottom-aligned with shell.

**Implementation:**
- CSS var `#about { --about-visual-shell-h: 43.625rem }` (698px)
- lg+: `.about-visual-shell` fixed height/min/max; `.about-visual-column` flex `justify-end` (shell pins to bottom of stretched row)
- `.about-visual-bridge-pills` fixed 4.125rem height (text wraps inside pills, shell does not grow)
- `.about-truck-stage` flex 1, aspect-ratio 1, max-height 100% inside shell
- `.about-content-column` min-height matches shell; `.about-features-grid { margin-top: auto }`
- Markup: `about-layout-grid`, `about-visual-column`, `about-content-column`, `about-features-grid`

Files: `app/globals.css`, `components/landing/about.tsx`