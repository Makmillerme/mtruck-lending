Updated catalog carousel arrow buttons to be adaptive to background and reversible in components/landing/catalog.tsx.

Both left/right controls now use contrast-aware styling:
- border + semi-transparent background + backdrop blur for readability on any section tone/image
- explicit foreground text color
- reversible interaction states: hover/active invert to foreground background with background text

Class updates applied to both arrows and lint check passes.