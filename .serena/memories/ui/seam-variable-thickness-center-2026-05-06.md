Updated seam accent geometry per user request: line should be thin at start/end and thicker in center.

File: app/globals.css

Changes:
- `.section-seam-accent::before`
  - Increased drawable area to 4px height and moved to `top: -1px`
  - Added lens-style `clip-path` polygon so thickness tapers at ends and expands at center.
- `.section-seam-accent::after`
  - Updated bloom layer to 6px with matching tapered lens clip-path for coherent glow.
  - Slightly reduced bloom alpha to keep premium subtlety.
- Kept iridescent animation `seamIridescent` and non-full-width constraint.

Result:
- Visually variable stroke thickness along horizontal axis: thin edges, thicker middle.
- No lint errors.