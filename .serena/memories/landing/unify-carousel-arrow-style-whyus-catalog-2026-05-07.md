Unified carousel arrow button visuals between testimonials (WhyUs) and catalog.

Updated components/landing/why-us.tsx to use the exact same button class stack as catalog arrows:
`landing-btn h-10 w-10 rounded-full border border-border/70 bg-background/70 text-foreground backdrop-blur supports-[backdrop-filter]:bg-background/55 transition-colors hover:bg-foreground hover:text-background hover:border-foreground/40 active:bg-foreground/90`

Applied to both prev/next testimonial buttons (all occurrences). Lint clean for why-us and catalog.