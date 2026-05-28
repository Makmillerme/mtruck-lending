Adjusted unified carousel arrow hover state to gray accent (not white) in both components/landing/why-us.tsx and components/landing/catalog.tsx.

Replaced hover/active style fragment:
- from: hover:bg-foreground hover:text-background hover:border-foreground/40 active:bg-foreground/90
- to:   hover:bg-accent hover:text-accent-foreground hover:border-border active:bg-accent/80

Result: hover color now matches previous gray-ish testimonials behavior while keeping both sections visually consistent. Lint clean.