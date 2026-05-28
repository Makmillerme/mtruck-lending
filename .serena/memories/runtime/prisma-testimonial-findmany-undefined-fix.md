Fixed runtime crash `Cannot read properties of undefined (reading findMany)` in `lib/landing-content.ts` when `prisma.testimonial` is missing due to stale Prisma Client in dev runtime.

What was done:
1) Added defensive runtime fallback in `_getLandingBundle`:
- Resolve testimonial model dynamically from prisma instance.
- Use `testimonialsPromise` that queries `testimonial.findMany(...)` when model exists.
- Fallback to `Promise.resolve([])` when model is unavailable, preventing landing page crash.

2) Regenerated Prisma Client:
- Ran `npx prisma generate` successfully.

Result:
- Landing bundle no longer throws if runtime client is temporarily stale.
- Fresh Prisma client artifacts are generated for next server lifecycle.