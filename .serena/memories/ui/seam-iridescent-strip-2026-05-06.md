Updated section seam accent effect to be an iridescent strip shimmer instead of a moving streak.

File: app/globals.css

Changes:
- Replaced dual-layer moving streak implementation (`seamShine`) with a single gradient strip that shimmers via background-position + opacity modulation.
- New animation: `seamIridescent 6.2s ease-in-out infinite`.
- Gradient uses soft center highlight and symmetric falloff, preserving premium subtle style.
- Added mild glow via `filter: drop-shadow(...)` for expensive metallic feel without harsh motion.

Result:
- The strip itself appears to "overflow/shimmer".
- No separate traveling line/particle effect.

Validation:
- Lints clean for updated file.