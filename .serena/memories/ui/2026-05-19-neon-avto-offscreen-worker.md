# NeonAvtoAssemble — OffscreenCanvas + Web Worker (2026-05-19)

## Problem
Animation was janking on the main thread: 5600 particles × sin/cos/atan2 each frame competing with React, CSS, scroll events.

## Solution: OffscreenCanvas + Web Worker

### Architecture
- Main thread: thin React wrapper, zero physics/draw
- Worker thread: 100% canvas + physics via OffscreenCanvas
- Communication: 3 messages total per animation (ready, finalVisible, morphComplete)

### New file: `public/neon-avto-worker.js` (plain JS, static asset)
- `buildSeeds`: fetch PNG → createImageBitmap → edge detection at 512px
- `buildParticles`: seeds particle motion + pre-computes travelX/Y, tx/ty, nx/ny (no per-frame recalc)
- `bucketParticles`: sorts into 3 alpha arrays ONCE at init — no if-branch per particle per frame
- `drawBuckets`: single beginPath+stroke per alpha group
- `startAnimation`: rAF loop capped at 30fps; pauses on msg
- Handles: init, pause, resume, destroy messages
- Posts: ready, finalVisible, morphComplete, fallback

### Refactored: `components/landing/neon-avto-assemble.tsx`
- Feature-detects `transferControlToOffscreen`; fallback = show SVG immediately
- prefers-reduced-motion → skip to SVG immediately
- IntersectionObserver + visibilitychange on main thread → send pause/resume to worker
- SVG overlay + glow timers remain in React state

### Quality
- Particle count restored: MAX_PARTICLES = 5600, DETAIL_STEP = 4
- Canvas buffer: RENDER_PX = 576 (upscaled by CSS, unnoticeable)
- tsc --noEmit: exit 0