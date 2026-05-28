Investigated 'Testimonials failed to load' in admin.

Root cause:
- `app/api/admin/testimonials/route.ts` GET caught all exceptions and always returned 401 Unauthorized, masking real server errors.
- When Prisma runtime client is stale and `prisma.testimonial` is unavailable, the route failed with a misleading 401 response.

Fixes applied:
1) app/api/admin/testimonials/route.ts
- Added `getTestimonialDelegate()` guard for prisma testimonial delegate.
- Return 503 with explicit message when testimonial model is unavailable in runtime client.
- GET now distinguishes auth errors (401) from other errors (500).
- POST updated with same delegate guard and proper error handling.

2) app/api/admin/testimonials/[id]/route.ts
- Added same delegate guard for PUT/DELETE.
- Returns 503 with explicit message if testimonial model unavailable.
- Maintains proper 401 vs 500 handling.

3) components/admin/testimonials-manager.tsx
- Improved loadItems() error handling:
  - Reads API error payload and shows backend error text instead of generic message.

Validation:
- ReadLints reports no issues on touched files.