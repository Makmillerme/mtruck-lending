Completed delete confirmation modal unification in admin managers.

Changes:
- components/admin/testimonials-manager.tsx:
  - Replaced native confirm() flow with shadcn AlertDialog pattern.
  - Added deleteId state-driven dialog visibility.
  - Added confirmDelete() async handler for DELETE /api/admin/testimonials/:id.
  - Updated delete button on cards to set deleteId instead of immediate deletion.
  - Added standardized AlertDialog markup matching other admin managers.

Validation:
- ReadLints check on testimonials/vehicles/services/faq managers and app/globals.css returned no diagnostics.

Current status:
- vehicles-manager, services-manager, faq-manager, testimonials-manager now all use consistent modal confirmation for deletion.