Updated About section layout alignment and sizing in components/landing/about.tsx per UI request.

Changes:
- Grid alignment changed from `items-center` to `items-stretch` for consistent column heights.
- Enforced explicit column order on desktop:
  - left content `lg:order-1`
  - right visual `lg:order-2`
- Centered the top heading block (`badge + title`) by changing its wrapper to `text-center`.
- Increased right visual block height to better match left content:
  - replaced `aspect-square` with `h-full min-h-[560px] lg:min-h-[640px]`.

Validation:
- Lint check for components/landing/about.tsx passed with no issues.