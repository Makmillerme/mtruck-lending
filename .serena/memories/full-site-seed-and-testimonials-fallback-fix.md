Completed full site data seeding and testimonial source reliability fix.

1) Full content seeding
- Added script: scripts/seed-full-site.ts
- Script seeds EN/CS/UK landing content entries for:
  - header, hero, about, why-us, services-meta, catalog-meta, faq-meta, footer
- Script resets and seeds operational entities:
  - services
  - vehicles
  - faqs
  - testimonials
  - contact_info
  - stats
- Executed successfully via: `npx tsx scripts/seed-full-site.ts`

2) Testimonials loading reliability
- Updated lib/landing-content.ts
- If Prisma testimonial delegate is unavailable at runtime, fallback now queries `testimonials` table directly via `query(...)` and maps fields to landing DTO.
- This avoids silent empty testimonials and ensures landing pulls data from admin-managed testimonials.

3) Notes
- Insert into landing_content_entries required explicit updated_at; script uses `updated_at = NOW()` on insert and update.
- Lint check passed for modified files.