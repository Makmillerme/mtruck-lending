Applied hard fix for persistent right-side stripe on modal open.

File: app/globals.css

Changes:
- Extended modal lock stabilization selector to cover both Radix markers:
  - `body[data-scroll-locked]`
  - `body.react-remove-scroll-bar`
- Enforced for both selectors:
  - `margin-right: 0 !important;`
  - `padding-right: 0 !important;`
  - `overflow: hidden !important;`
- Added `width: 100%` to `body` to avoid width jitter under lock styles.

Reason:
- Some dialogs apply lock via class `react-remove-scroll-bar` instead of `data-scroll-locked`; previous fix only targeted one path.

Validation:
- Lint check for app/globals.css passed.