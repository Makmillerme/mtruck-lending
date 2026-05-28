Explained and fixed why catalog carousel showed 2 cards when more than 3 items exist: third card layout was enabled only at xl breakpoint.

Updated card basis class in components/landing/catalog.tsx:
- from: md:2 cards, xl:3 cards
- to:   md:2 cards, lg:3 cards

Now desktop/laptop widths at lg and above display 3 cards in carousel. Lint clean.