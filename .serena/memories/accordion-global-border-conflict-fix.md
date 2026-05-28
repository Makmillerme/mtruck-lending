Applied global accordion border conflict fix.

File: components/ui/accordion.tsx
- Removed default bottom border styles from AccordionItem:
  - before: `className={cn('border-b last:border-b-0', className)}`
  - after: `className={cn(className)}`

Reason:
- Default `border-b` conflicted with custom rounded/bordered card styles (notably FAQ), causing persistent lower-edge visual artifact.
- Border styling is now explicitly controlled by each consumer component.

Validation:
- Lint check passed for accordion and FAQ files.