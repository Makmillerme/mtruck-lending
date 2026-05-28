# NeonAvtoAssemble performance optimization (2026-05-12)

## Problem
Low FPS, jank, slow load — ~5600 particles, 1024px canvas, per-particle ctx.save/stroke/restore each frame.

## Optimizations in `components/landing/neon-avto-assemble.tsx`
1. **Particles**: MAX_PARTICLES 5600→2200, DETAIL_STEP 4→5
2. **Init**: edge scan at SAMPLE_SIZE 512 (coords scaled to 1024), deferred via requestIdleCallback
3. **Render**: canvas internal RENDER_PX 576 (was 1024), ctx.setTransform scale
4. **Draw**: `drawParticlesBatched` — 3 alpha buckets, single stroke per bucket, no save/restore per particle (use cos/sin line endpoints)
5. **FPS cap**: FRAME_MIN_MS = 30fps during animation
6. **Pause**: tab hidden + IntersectionObserver offscreen (syncPaused)
7. **a11y**: prefers-reduced-motion → skip to final SVG immediately
8. **DOM**: canvas `[contain:strict]`, img loading=lazy decoding=async
9. **Timing**: TOUR 250→200 frames, slightly faster assemble ease

Visual quality slightly reduced but same motion/SVG morph flow preserved.