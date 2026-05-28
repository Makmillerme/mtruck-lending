Final fix attempt for FAQ bottom-border clipping in landing FAQ cards.

File: components/landing/faq.tsx
- Added explicit override on FAQ accordion items:
  - `border-b-0 last:border-b-0`
- Kept custom card border/rounded styles and open-state border accent.

Reason:
- Base accordion item adds `border-b` by default from shared UI component; this conflicted with custom rounded card border and caused lower edge visual artifacts.

Validation:
- Lint check passed for components/landing/faq.tsx.