## About visual callouts — framed + business typography + centered truck (2026-05-08)

- **Frames:** `.about-float-callout-frame` in `globals.css` — glass panel (navy tint, backdrop blur, thin border oklch chrome/cyan-muted, inset highlight + soft shadow). `AboutFloatingCallout` wraps label in this frame.
- **Typography:** Removed heavy neon `text-shadow`; labels use `oklch(0.9 0.025 248)`, weight 600, slightly reduced letter-spacing. Float amplitude 5px, 5.5s cycle.
- **Truck:** Replaced offset `top-[52%]` wrapper with `flex items-center justify-center` on image layer; inner `relative` box `h-full w-full` + `scale-[1.14]` / `sm:scale-[1.12]` + `object-contain object-center` for optical centering and larger truck.
- **Callout widths:** Slightly increased max-width to fit padded frames.