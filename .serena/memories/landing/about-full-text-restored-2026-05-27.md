Restored full About section text in static landing-data (2026-05-27).

Problem: landing-data.ts about en/uk had abbreviated CMS strings (e.g. "Понад 15 років досвіду.") that overrode full defaultAbout copy in about.tsx via pickText.

Fix: updated lib/landing-data.ts about block with full description, description2, and feature descriptions matching defaultAbout in components/landing/about.tsx.